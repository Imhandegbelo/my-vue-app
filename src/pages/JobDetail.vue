<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const route = useRoute()
const jobId = route.params.id

const state = reactive({
    job: {}
})

onMounted(async () => {
    try {
        const response = await axios.get(`http://localhost:3000/jobs/${jobId}`)
        console.log("response::", response.data)
        state.job = response.data
    } catch (error) {
        console.log("Error fetching jobs::", error)
    }
})

async function downloadStyledPDF(jobId, jobTitle) {
//   const element = document.getElementById(`job-detail-${jobId}`)
  const element = document.getElementById("job-detail")
  const canvas = await html2canvas(element, { scale: 2 })
  const imgData = canvas.toDataURL('image/png')

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4'
  })

  const imgProps = pdf.getImageProperties(imgData)
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  pdf.save(`${jobTitle.replace(/\s+/g, '_')}.pdf`)
}

function downloadPDF(job) {
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text(job.title, 10, 10)

  doc.setFontSize(12)
  doc.text(`Type: ${job.type}`, 10, 20)
  doc.text(`Location: ${job.location}`, 10, 30)
  doc.text(`Salary: ${job.salary}`, 10, 40)
  doc.text("Description:", 10, 50)
  doc.text(doc.splitTextToSize(job.description, 180), 10, 60)

  doc.text("Company Info:", 10, 90)
  doc.text(`Name: ${job.company.name}`, 10, 100)
  doc.text(doc.splitTextToSize(job.company.description, 180), 10, 110)
  doc.text(`Email: ${job.company.contactEmail}`, 10, 140)
  doc.text(`Phone: ${job.company.contactPhone}`, 10, 150)

  doc.save(`${job.title.replace(/\s+/g, '_')}.pdf`)
}
</script>

<template>
    <section class="bg-green-50">
        <div class="container m-auto py-10 px-6">
            <div id="job-detail" v-if="state.job.id" class="flex w-full gap-6">
                <main>
                    <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                        <div class="text-gray-500 mb-4">{{ state.job.type }}</div>
                        <h1 class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
                        <div class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                            <i class="fa-solid fa-location-dot text-lg text-orange-700 mr-2"></i>
                            <p class="text-orange-700">{{ state.job.location }}</p>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-green-800 text-lg font-bold mb-6">
                            Job Description
                        </h3>

                        <p class="mb-4">
                            {{ state.job.description }}
                        </p>

                        <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

                        <p class="mb-4">{{ state.job.salary }} / Year</p>
                    </div>
                </main>

                <!-- Sidebar -->
                <aside class="w-full max-w-3/10">
                    <!-- Company Info -->
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-bold mb-6">Company Info</h3>
                        <h2 class="text-2xl">{{ state.job.company.name }}</h2>

                        <p class="my-2">
                            {{ state.job.company.description }}
                        </p>

                        <hr class="my-4" />

                        <h3 class="text-xl">Contact Email:</h3>
                        <p class="my-2 bg-green-100 p-2 font-bold">
                            {{ state.job.company.contactEmail }}
                        </p>

                        <h3 class="text-xl">Contact Phone:</h3>
                        <p class="my-2 bg-green-100 p-2 font-bold">{{ state.job.company.contactPhone }}</p>
                    </div>

                    <!-- Manage -->
                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-xl font-bold mb-6">Manage Job</h3>
                        <a href="add-job.html"
                            class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Edit Job
                        </a>
                        <button @click="downloadPDF(state.job)"
                            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Download Detail
                        </button>
                        <button @click="downloadStyledPDF(state.job.id, state.job.title)"
                            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Download Job Detail
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    </section>
</template>