import { db } from '@/plugins/firebase';
import { ref, inject } from 'vue';
import { Schedule, TimeSpan } from '@/types/Schedule';
import { AuthStore } from '@/components/AuthState';
import AuthKey from '@/components/AuthStateKey';
import { firestore } from 'firebase/app';

function makeSchedule(docQuery: firestore.QueryDocumentSnapshot): Schedule {
    const data = docQuery.data();
    return {
        id: docQuery.id,
        title: data.title,
        description: data.description,
        timeSpan: {
            start: data.timeSpan.start.toDate(),
            end: data.timeSpan.end.toDate(),
        },
        records: {
            timeSpans: data.records.timeSpans.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (timeSpan: { start: any; end: any }) =>
                    new Object({
                        start: timeSpan.start.toDate(),
                        end: timeSpan.end.toDate(),
                    }) as TimeSpan
            ),
            log: data.records.log,
        },
    };
}

export default function useTaskManager() {
    const schedules = ref<Schedule[]>([]);
    const unSubscribe = ref<() => void>();
    const { state } = inject(AuthKey) as AuthStore;

    // 予定の追加
    const addSchedule = (taskNames: string[]) => {
        const now = new Date();
        // 予定をFirestoreへ登録
        taskNames.forEach(taskName =>
            db
                .doc(`users/${state.userInfo.uid}`)
                .collection('schedules')
                .add({
                    title: taskName,
                    description: `https://scrapbox.io/takker-memex/${taskName}`,
                    timeSpan: { start: now, end: now },
                    records: {
                        timeSpans: [],
                        log: `https://scrapbox.io/takker-memex/${taskName}_logging`,
                    },
                })
        );
    };

    // 予定の編集
    // 一部だけを編集できる
    const updateSchedule = (id: string, value: Partial<Schedule>) => {
        db.doc(`users/${state.userInfo.uid}`)
            .collection('schedules')
            .doc(id)
            .update(value);
    };

    // 予定の削除
    const deleteSchedule = (id: string) => {
        db.doc(`users/${state.userInfo.uid}`)
            .collection('schedules')
            .doc(id)
            .delete();
    };

    // 更新監視開始
    const startListen = (userUid: string) => {
        unSubscribe.value = db
            .doc(`users/${userUid}`)
            .collection('schedules')
            .onSnapshot(querySnapShot => {
                const changedDocuments = querySnapShot.docChanges();
                changedDocuments
                    .filter(changedDocument => changedDocument.type == 'added')
                    .map(changedDocument => changedDocument.doc)
                    .forEach(docQuery => {
                        /* eslint-disable no-console */
                        console.log(
                            `New comment: ${JSON.stringify(docQuery.data())}`
                        );
                        schedules.value.push(makeSchedule(docQuery));
                    });
            });
    };

    // 更新監視終了
    const endListen = () => {
        if (unSubscribe.value) unSubscribe.value();
    };

    return {
        addSchedule,
        updateSchedule,
        deleteSchedule,
        schedules,
        startListen,
        endListen,
    };
}

export type TaskManageStore = ReturnType<typeof useTaskManager>;
