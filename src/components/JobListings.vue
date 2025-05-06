<script setup>
// import jobData from "@/jobs.json"
import JobListing from "@/components/JobListing.vue"
import axios from "axios"
import { ref, onMounted } from "vue"

const jobs = ref([])

onMounted(async () => {
    try {
        const response = await axios.get("http://localhost:3000/jobs")
        jobs.value = response.data
    } catch (error) {
        console.log("Error fetching jobs::", error)
    }
})

</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="contatainer-xl lg:container m-auto">
            <h2 class="text- font-semibold text-green-500 mb-6 text-center">
                Browse Jobs
            </h2>
        </div>
    </section>
    <div class="grid md:grid-cols-3 gap-6 p-6">
        <JobListing v-for="job in jobs" :key="job.id" :job="job" />
    </div>
</template>