<template>
    <div class="column">
        <AddTaskArea />
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Schedule</th>
                        <th>予定開始時刻</th>
                        <th>見積もり</th>
                        <th>実績</th>
                        <th>start</th>
                        <th>end</th>
                        <th>詳細</th>
                        <th>Log</th>
                        <th>
                            <span class="icon">
                                <i class="fas fa-trash-alt" />
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody
                    v-for="(schedule, index) in schedules"
                    :key="schedule.id"
                >
                    <tr>
                        <td>
                            <input
                                class="input"
                                type="checkbox"
                                v-bind:id="`schedule-item-r${index}c0`"
                                @keydown.prevent.h="
                                    jump({ now: [index, 0], step: [0, -1] })
                                "
                                @keydown.prevent.j="
                                    jump({ now: [index, 0], step: [1, 0] })
                                "
                                @keydown.prevent.k="
                                    jump({ now: [index, 0], step: [-1, 0] })
                                "
                                @keydown.prevent.l="
                                    jump({ now: [index, 0], step: [0, 1] })
                                "
                            />
                        </td>
                        <td>
                            <input
                                class="input"
                                type="text"
                                readonly
                                v-bind:id="`schedule-item-r${index}c1`"
                                @keydown.prevent.h="
                                    jump({ now: [index, 1], step: [0, -1] })
                                "
                                @keydown.prevent.j="
                                    jump({ now: [index, 1], step: [1, 0] })
                                "
                                @keydown.prevent.k="
                                    jump({ now: [index, 1], step: [-1, 0] })
                                "
                                @keydown.prevent.l="
                                    jump({ now: [index, 1], step: [0, 1] })
                                "
                                :value="schedule.title"
                                style="min-width: 240px;"
                            />
                        </td>
                        <td>
                            <input
                                class="input"
                                type="text"
                                readonly
                                v-bind:id="`schedule-item-r${index}c2`"
                                @keydown.prevent.h="
                                    jump({ now: [index, 2], step: [0, -1] })
                                "
                                @keydown.prevent.j="
                                    jump({ now: [index, 2], step: [1, 0] })
                                "
                                @keydown.prevent.k="
                                    jump({ now: [index, 2], step: [-1, 0] })
                                "
                                @keydown.prevent.l="
                                    jump({ now: [index, 2], step: [0, 1] })
                                "
                                :value="
                                    `${
                                        schedule.start
                                            ? timestamp(schedule.start)
                                            : 'none'
                                    }`
                                "
                            />
                        </td>
                        <td>
                            <input
                                class="input"
                                type="text"
                                readonly
                                v-bind:id="`schedule-item-r${index}c3`"
                                @keydown.prevent.h="
                                    jump({ now: [index, 3], step: [0, -1] })
                                "
                                @keydown.prevent.j="
                                    jump({ now: [index, 3], step: [1, 0] })
                                "
                                @keydown.prevent.k="
                                    jump({ now: [index, 3], step: [-1, 0] })
                                "
                                @keydown.prevent.l="
                                    jump({ now: [index, 3], step: [0, 1] })
                                "
                                :value="dTimestamp(schedule.duration)"
                            />
                        </td>
                        <td>
                            <input
                                class="input"
                                type="text"
                                readonly
                                v-bind:id="`schedule-item-r${index}c4`"
                                @keydown.prevent.h="
                                    jump({ now: [index, 4], step: [0, -1] })
                                "
                                @keydown.prevent.j="
                                    jump({ now: [index, 4], step: [1, 0] })
                                "
                                @keydown.prevent.k="
                                    jump({ now: [index, 4], step: [-1, 0] })
                                "
                                @keydown.prevent.l="
                                    jump({ now: [index, 4], step: [0, 1] })
                                "
                                :value="
                                    `${
                                        schedule.record
                                            ? timestamp(schedule.record.start)
                                            : 'none'
                                    }`
                                "
                            />
                        </td>
                        <td>
                            <input
                                class="input"
                                type="text"
                                readonly
                                v-bind:id="`schedule-item-r${index}c5`"
                                @keydown.prevent.h="
                                    jump({ now: [index, 5], step: [0, -1] })
                                "
                                @keydown.prevent.j="
                                    jump({ now: [index, 5], step: [1, 0] })
                                "
                                @keydown.prevent.k="
                                    jump({ now: [index, 5], step: [-1, 0] })
                                "
                                @keydown.prevent.l="
                                    jump({ now: [index, 5], step: [0, 1] })
                                "
                                :value="
                                    `${
                                        schedule.record
                                            ? timestamp(
                                                  getEndDate(
                                                      schedule.record.start,
                                                      schedule.record.duration
                                                  )
                                              )
                                            : 'none'
                                    }`
                                "
                            />
                        </td>
                        <td>
                            <a
                                v-bind:id="`schedule-item-r${index}c6`"
                                :href="schedule.description"
                                target="_blank"
                                @keydown.prevent.h="
                                    jump({ now: [index, 6], step: [0, -1] })
                                "
                                @keydown.prevent.j="
                                    jump({ now: [index, 6], step: [1, 0] })
                                "
                                @keydown.prevent.k="
                                    jump({ now: [index, 6], step: [-1, 0] })
                                "
                                @keydown.prevent.l="
                                    jump({ now: [index, 6], step: [0, 1] })
                                "
                            >
                                Show description
                            </a>
                        </td>
                        <td>
                            <a
                                v-bind:id="`schedule-item-r${index}c7`"
                                v-if="schedule.record !== undefined"
                                :href="schedule.record.log"
                                target="_blank"
                                @keydown.prevent.h="
                                    jump({ now: [index, 7], step: [0, -1] })
                                "
                                @keydown.prevent.j="
                                    jump({ now: [index, 7], step: [1, 0] })
                                "
                                @keydown.prevent.k="
                                    jump({ now: [index, 7], step: [-1, 0] })
                                "
                                @keydown.prevent.l="
                                    jump({ now: [index, 7], step: [0, 1] })
                                "
                            >
                                Show log
                            </a>
                            <span
                                tabindex="-1"
                                v-else
                                v-bind:id="`schedule-item-r${index}c7`"
                                @keydown.prevent.h="
                                    jump({ now: [index, 7], step: [0, -1] })
                                "
                                @keydown.prevent.j="
                                    jump({ now: [index, 7], step: [1, 0] })
                                "
                                @keydown.prevent.k="
                                    jump({ now: [index, 7], step: [-1, 0] })
                                "
                                @keydown.prevent.l="
                                    jump({ now: [index, 7], step: [0, 1] })
                                "
                            >
                                No log available</span
                            >
                        </td>
                        <td>
                            <a
                                v-bind:id="`schedule-item-r${index}c8`"
                                class="delete"
                                @keydown.prevent.h="
                                    jump({ now: [index, 8], step: [0, -1] })
                                "
                                @keydown.prevent.j="
                                    jump({ now: [index, 8], step: [1, 0] })
                                "
                                @keydown.prevent.k="
                                    jump({ now: [index, 8], step: [-1, 0] })
                                "
                                @keydown.prevent.l="
                                    jump({ now: [index, 8], step: [0, 1] })
                                "
                                @click="deleteSchedule(schedule.id)"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
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
import { add } from 'date-fns';

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

        const jump = ({ now, step }: { now: number[]; step: number[] }) => {
            // 次に飛ぶcellの座標
            const row = now[0] + step[0];
            const col = now[1] + step[1];
            const MAX_COLUMN_NUM = 8;
            if (schedules.value.length <= row) return;
            if (MAX_COLUMN_NUM <= col) return;
            const nextItem = document.getElementById(
                `schedule-item-r${row}c${col}`
            );
            if (!nextItem) return;
            nextItem.focus();
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
        const dTimestamp = (duration: Duration) => {
            let hours = duration.hours ? duration.hours : 0;
            let minutes = 0;
            if (duration.minutes) {
                hours += Math.floor(duration.minutes / 60);
                minutes += duration.minutes % 60;
            }
            let seconds = 0;
            if (duration.seconds) {
                hours += Math.floor(duration.seconds / 3600);
                minutes += Math.floor((duration.seconds % 3600) / 60);
                seconds += duration.seconds % 60;
            }

            return `${zero(hours)}:${zero(minutes)}:${zero(seconds)}`;
        };
        const getEndDate = (date: Date, duration: Duration) =>
            add(date, duration);

        return {
            state,
            schedules,
            deleteSchedule,
            jump,
            timestamp,
            datetimestamp,
            getEndDate,
            dTimestamp,
        };
    },
});
</script>
