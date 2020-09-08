<template>
    <a @click="toggleTextArea">
        <span class="icon has-text-success is-large">
            <i class="fas fa-3x fa-plus-circle" />
        </span>
    </a>
    <!-- 以下要素がid="teleport-target"内に描画される -->
    <textarea
        v-if="isVisible"
        class="textarea"
        placeholder="Write new schedules..."
        v-model="scheduleNames"
        @keyup.alt.enter="addSchedules"
    />
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

        const addSchedules = () => {
            if (scheduleNames.value.trim() == '') return;
            addSchedule(scheduleNames.value.trim().split('\n'));
            scheduleNames.value = '';
        };
        const toggleTextArea = () => (isVisible.value = !isVisible.value);

        return { isVisible, toggleTextArea, addSchedules, scheduleNames };
    },
});
</script>
