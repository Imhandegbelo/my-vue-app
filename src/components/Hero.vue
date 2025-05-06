<script setup>
import { defineProps } from 'vue'
defineProps({
    title: { type: String, default: "Become a Vue Developer" },
    subtitle: { type: String, default: "Find a job that is fitting for you" }
})
</script>

<template>
    <section class="text-white text-center bg-green-600 py-20">
        <h1 class="text-lg sm:text-xl md:text-4xl font-semibold">{{ title }}</h1>
        <p>{{ subtitle }}</p>
    </section>
</template>