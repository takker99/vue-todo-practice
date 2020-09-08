<template>
    <div class="container">
        <nav
            id="nav"
            class="navbar is-light"
            role="navigation"
            aria-label="main navigation"
        >
            <div class="navbar-brand">
                <div class="navbar-item">
                    <!-- ログイン時にはprofile imageを表示 -->
                    <img
                        v-if="state.userInfo.uid"
                        :src="state.userInfo.photoURL"
                    />
                    <!-- 未ログイン時にはVue.jsのlogoを表示 -->
                    <img v-else src="../assets/logo.png" />
                </div>
                <a
                    role="button"
                    class="navbar-burger burger"
                    aria-label="menu"
                    aria-expanded="false"
                    v-on:click="changeBurgerVisibillity"
                    v-bind:class="{ 'is-active': burgerVisibillity }"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div
                class="navbar-menu"
                v-bind:class="{ 'is-active': burgerVisibillity }"
            >
                <div class="navbar-start">
                    <a class="navbar-item">
                        POST
                    </a>
                    <router-link to="/about" class="navbar-item">
                        About
                    </router-link>
                    <router-link to="/task_chute" class="navbar-item">
                        Task Chute
                    </router-link>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <Login />
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script lang="ts">
import { AuthStore } from '@/components/AuthState';
import AuthKey from '@/components/AuthStateKey';
import { defineComponent, inject, ref } from 'vue';
import 'firebase/auth';
import Login from '@/components/Login.vue';

export default defineComponent({
    name: 'NavBar',
    components: {
        Login,
    },
    setup: () => {
        const burgerVisibillity = ref(false);
        const changeBurgerVisibillity = () =>
            (burgerVisibillity.value = !burgerVisibillity.value);
        const { state } = inject(AuthKey) as AuthStore;
        return { state, burgerVisibillity, changeBurgerVisibillity };
    },
});
</script>
<style scoped>
#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
