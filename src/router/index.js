import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Jobs from "@/pages/Jobs.vue";
import JobDetail from "@/pages/JobDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/jobs", name: "jobs", component: Jobs },
    { path: "/jobs/:id", name: "job-detail", component: JobDetail },
    { path: "/add", name: "add-jobs", component: Jobs },
  ],
});

export default router;
