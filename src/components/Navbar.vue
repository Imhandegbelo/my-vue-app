<script setup>
import logo from "@/assets/vue.svg";
import { RouterLink, useRoute } from 'vue-router'

const links = [
    { title: "Home", path: "/" },
    { title: "Jobs", path: "/jobs" },
    { title: "Add Job", path: "/jobs/add" },
];

const isActiveLink = (routeLink) => {
    const route = useRoute()
    return route.path === routeLink
}

</script>

<template>
    <nav class="flex items-center justify-between p-4 bg-green-600 shadow-xl w-full border-b border-white">
        <RouterLink to="/" class="flex items-center rounded-full p-2 bg-white">
            <img :src="logo" alt="logo" width="30" />
        </RouterLink>

        <ul class="flex text-white items-center gap-10">
            <li v-for="link in links" :key="link.title">
                <RouterLink :to="link.path" :class="[isActiveLink(link.path)?'border-b-2 border-white':'border-b-2 border-transparent', 'text-white', 'hover:border-white']">
                    {{ link.title }}
                </RouterLink>
            </li>
            <!-- <li><a href="/job">Jobs</a></li>
            <li><a href="/add">Add Job</a></li> -->
        </ul>
    </nav>
</template>
