<script setup>
import Card from '@/components/Card.vue'
</script>

<template>
    <section class="grid md:grid-cols-2 gap-4 p-4">
        <Card>
            <h2 class="font-semibold">For Developers</h2>
            <p class="mb-4">
                Browse our Vue jobs
            </p>
            <a href="/jobs" class="py-2 px-4 bg-black rounded text-white hover:">Browse Jobs</a>
        </Card>
        <Card bg="bg-green-100">
            <h2 class="font-semibold">For Employers</h2>
            <p class="mb-4">
                List your jobs and find the perfect developer role
            </p>
            <a href="/add" class="p-2 bg-green-600 rounded text-white hover:">Add Jobs</a>
        </Card>
    </section>
</template>