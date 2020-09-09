<template>
    <div class="column">
        <AddTaskArea />
        <div
            class="column"
            v-for="(schedule, index) in schedules"
            :key="schedule.id"
        >
            <article class="box media">
                <div class="media-content">
                    <div class="content">
                        <input
                            class="input"
                            type="text"
                            readonly
                            v-bind:id="`schedule-item-no-${index}`"
                            @keydown.prevent.tab.exact="moveNext(index)"
                            @keydown.prevent.shift.tab="movePrev(index)"
                            @keydown.prevent.j="moveNext(index)"
                            @keydown.prevent.k="movePrev(index)"
                            :value="schedule.title"
                        />
                        <p>
                            <a :href="schedule.description" target="_blank">
                                Show description
                            </a>
                            <abbr
                                :title="datetimestamp(schedule.timeSpan.start)"
                                class="has-tooltip-bottom"
                                >{{ timestamp(schedule.timeSpan.start) }}</abbr
                            >
                            <abbr
                                :title="datetimestamp(schedule.timeSpan.end)"
                                class="has-tooltip-bottom"
                                >{{ timestamp(schedule.timeSpan.end) }}</abbr
                            >
                            <a
                                class="delete"
                                @click="deleteSchedule(schedule.id)"
                            />
                        </p>
                    </div>
                </div>
            </article>
        </div>
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

        const moveNext = (index: number) => {
            if (schedules.value.length - 1 == index) return;
            const nextItem = document.getElementById(
                `schedule-item-no-${index + 1}`
            );
            if (!nextItem) return;
            nextItem.focus();
        };

        const movePrev = (index: number) => {
            if (index == 0) return;
            const prevItem = document.getElementById(
                `schedule-item-no-${index - 1}`
            );
            if (!prevItem) return;
            prevItem.focus();
        };
        const zero = (n: number) => String(n).padStart(2, '0');
        const timestamp = (d: Date) =>
            `${zero(d.getHours())}:${zero(d.getMinutes())}`;
        const datetimestamp = (d: Date) =>
            `${d.getFullYear()}-${zero(d.getMonth() + 1)}-${zero(
                d.getDate()
            )} ${zero(d.getHours())}:${zero(d.getMinutes())}:${zero(
                d.getSeconds()
            )}`;

        return {
            state,
            schedules,
            deleteSchedule,
            moveNext,
            movePrev,
            timestamp,
            datetimestamp,
        };
    },
});
</script>
