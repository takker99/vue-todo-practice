import { InjectionKey } from 'vue';
import { TaskManageStore } from '@/components/TaskManager';

const TaskManageKey: InjectionKey<TaskManageStore> = Symbol('TaskManageStore');
export default TaskManageKey;
