<template>
    <div class="column" v-for="schedule in schedules" :key="schedule.id">
        <article class="box media">
            <figure class="media-left">
                <p class="image is-48x48">
                    <img :src="state.userInfo.photoURL" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <p>
                        {{ schedule.title }}<br />
                        {{ `"${schedule.description}"` }}
                        <a class="delete is-small" />
                    </p>
                </div>
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { AuthStore } from '@/components/AuthState';
import AuthKey from '@/components/AuthStateKey';
import { TaskManageStore } from '@/components/TaskManager';
import TaskManagerKey from '@/components/TaskManagerKey';
import { defineComponent, inject } from 'vue';

export default defineComponent({
    name: 'TaskBoard',
    setup: () => {
        const { schedules } = inject(TaskManagerKey) as TaskManageStore;
        const { state } = inject(AuthKey) as AuthStore;
        return { state, schedules };
    },
});
</script>
