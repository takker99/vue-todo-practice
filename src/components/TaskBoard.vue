<template>
    <AddTaskArea />
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
                        <a :href="schedule.description" target="_blank">
                            {{ schedule.description }}
                        </a>
                        <a
                            class="delete is-small"
                            @click="deleteSchedule(schedule.id)"
                        />
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
import AddTaskArea from '@/components/AddTaskArea.vue';

export default defineComponent({
    name: 'TaskBoard',
    components: {
        AddTaskArea,
    },
    setup: () => {
        const { schedules, deleteSchedule } = inject(
            TaskManagerKey
        ) as TaskManageStore;
        const { state } = inject(AuthKey) as AuthStore;
        return { state, schedules, deleteSchedule };
    },
});
</script>
