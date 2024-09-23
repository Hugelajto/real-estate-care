import { createRouter, createWebHistory } from "vue-router";
import InspectationAssigned from "@/components/pages/InspectionAssigned.vue";
import InspectationCompleted from "@/components/pages/InspectionCompleted.vue";
import InspectationDocumentation from "@/components/pages/InspectionDocumentation.vue";
import Settings from "@/components/Settings.vue";
import InspectionForm from "@/components/pages/InspectionForm.vue";
import InspectationEdit from "@/components/pages/InspectionEdit.vue";
import InspectatioinView from "@/components/pages/InspectionView.vue";
import Login from "@/components/Login.vue";
import { useUserStore } from "@/stores/UserStore";

const routes = [
  { path: "/", name: "login", component: Login },
  {
    path: "/form",
    name: "form",
    component: InspectionForm,
    meta: { requiresAuth: true },
  },
  {
    path: "/assigned",
    name: "assigned",
    component: InspectationAssigned,
    meta: { requiresAuth: true },
  },
  {
    path: "/completed",
    name: "completed",
    component: InspectationCompleted,
    meta: { requiresAuth: true },
  },
  {
    path: "/documentation/",
    name: "documentation",
    component: InspectationDocumentation,
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
    meta: { requiresAuth: true },
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: InspectationEdit,
    meta: { requiresAuth: true },
  },
  {
    path: "/view/:id",
    name: "view",
    component: InspectatioinView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isAuthenticated = !!userStore.currentUser;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
