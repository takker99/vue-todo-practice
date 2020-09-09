import { db } from '@/plugins/firebase';
import { ref, inject } from 'vue';
import { Schedule } from '@/types/Schedule';
import { AuthStore } from '@/components/AuthState';
import AuthKey from '@/components/AuthStateKey';
import { firestore } from 'firebase/app';
import { Duration, compareAsc } from 'date-fns';

function makeSchedule(docQuery: firestore.QueryDocumentSnapshot): Schedule {
    const data = docQuery.data();

    // 必須項目を入れる
    const schedule: Schedule = {
        id: docQuery.id,
        title: data.title,
        description: data.description,
        duration: { seconds: data.duration },
    };

    // option項目を入れる
    if (data.start) schedule.start = data.start.toDate();
    if (data.record)
        schedule.record = {
            start: data.record.start.toDate(),
            duration: { seconds: data.records.duration } as Duration,
            log: data.record.log,
        };

    return schedule;
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
                    start: now,
                    description: `https://scrapbox.io/takker-memex/${taskName}`,
                    duration: 25 * 60,
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
                            `New schedule: ${JSON.stringify(docQuery.data())}`
                        );
                        schedules.value.push(makeSchedule(docQuery));
                    });
                // 変更されたscheduleは書き換える
                changedDocuments
                    .filter(
                        changedDocument => changedDocument.type == 'modified'
                    )
                    .map(changedDocument => changedDocument.doc)
                    .forEach(docQuery => {
                        /* eslint-disable no-console */
                        console.log(
                            `Modified schedule: ${JSON.stringify(
                                docQuery.data()
                            )}`
                        );
                        const temp = schedules.value.filter(
                            schedule => schedule.id !== docQuery.id
                        );
                        schedules.value = [...temp, makeSchedule(docQuery)];
                    });
                // 削除されたscheduleは取り除く
                changedDocuments
                    .filter(
                        changedDocument => changedDocument.type == 'removed'
                    )
                    .map(changedDocument => changedDocument.doc)
                    .forEach(docQuery => {
                        /* eslint-disable no-console */
                        console.log(
                            `Removed schedule: ${JSON.stringify(
                                docQuery.data()
                            )}`
                        );
                        schedules.value = schedules.value.filter(
                            schedule => schedule.id !== docQuery.id
                        );
                    });

                //最後に予定開始時刻順に並び替える
                schedules.value.sort((a, b) => {
                    if (!a.start && !b.start) return 0;
                    if (!a.start) return -1;
                    if (!b.start) return 1;
                    return compareAsc(a.start, b.start);
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
