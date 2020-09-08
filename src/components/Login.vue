<template>
    <div class="buttons">
        <!-- ログイン時にはフォームとログアウトボタンを表示 -->
        <button
            v-if="state.userInfo.uid"
            class="button is-primary"
            @click="doLogout"
        >
            <strong>Log out</strong>
        </button>
        <!-- 未ログイン時にはログインボタンを表示 -->
        <button v-else class="button is-primary" @click="doLogin">
            Log in
        </button>
    </div>
</template>

<script lang="ts">
import { AuthStore } from '@/components/AuthState';
import AuthKey from '@/components/AuthStateKey';
import { TaskManageStore } from '@/components/TaskManager';
import TaskManagerKey from '@/components/TaskManagerKey';
import { defineComponent, inject } from 'vue';

export default defineComponent({
    setup: () => {
        const { state, signIn, signOut } = inject(AuthKey) as AuthStore;
        const { schedules, startListen, endListen } = inject(
            TaskManagerKey
        ) as TaskManageStore;

        const doLogin = () =>
            signIn().then(result => {
                if (!result.user) return;
                startListen(result.user.uid);
            });
        const doLogout = () => {
            signOut().then(() => endListen());
            // 表示用dataを消す
            schedules.value = [];
        };
        return { state, doLogin, doLogout };
    },
});
</script>
