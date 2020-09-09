<template>
    <a @click="toggleTextArea">
        <span class="icon has-text-success is-large">
            <i class="fas fa-3x fa-plus-circle" />
        </span>
    </a>
    <!-- 以下要素がid="teleport-target"内に描画される -->
    <div class="card" v-if="isVisible">
        <div class="card-content">
            <textarea
                class="textarea"
                placeholder="Write new schedules..."
                v-model="scheduleNames"
                @keyup.alt.enter="addSchedules"
            />
        </div>
        <footer class="card-footer">
            <p class="card-footer-item">
                <button class="button is-success" @click="addSchedules">
                    Add schedules
                </button>
            </p>
        </footer>
    </div>
</template>
<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import { TaskManageStore } from '@/components/TaskManager';
import TaskManagerKey from '@/components/TaskManagerKey';

export default defineComponent({
    setup: () => {
        const isVisible = ref(false);
        const scheduleNames = ref('');
        const { addSchedule } = inject(TaskManagerKey) as TaskManageStore;

        const toggleTextArea = () => (isVisible.value = !isVisible.value);
        const addSchedules = () => {
            if (scheduleNames.value.trim() == '') return;
            addSchedule(
                scheduleNames.value
                    .split('\n')
                    .map(scheduleName => scheduleName.trim())
                    .filter(scheduleName => scheduleName != '')
            );
            scheduleNames.value = '';
            toggleTextArea();
        };

        return { isVisible, toggleTextArea, addSchedules, scheduleNames };
    },
});
</script>
