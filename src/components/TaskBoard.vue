<template>
    <div class="column" v-for="schedule in schedules" :key="schedule.id">
        <article class="box media">
            <figure class="media-left">
                <p class="image is-48x48">
                    <img :src="userInfo.photoURL" />
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
