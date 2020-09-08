<template>
    <div id="app">
        <NavBar />
        <router-view />
    </div>
    <div id="teleport-target" />
</template>

<script lang="ts">
import { defineComponent, inject, provide } from 'vue';
import useTaskManager from './components/TaskManager';
import useAuth from './components/AuthState';
import { AuthStore } from '@/components/AuthState';
import AuthKey from './components/AuthStateKey';
import TaskManagerKey from './components/TaskManagerKey';
import NavBar from './views/NavBar.vue';

export default defineComponent({
    components: {
        NavBar,
    },
    setup: () => {
        provide(AuthKey, useAuth());
        provide(TaskManagerKey, useTaskManager());
        const { state } = inject(AuthKey) as AuthStore;
        return { state };
    },
});
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #2c3e50;
}
</style>
