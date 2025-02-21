import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/modules/Login.vue";
import AdminLayout from "@/layout/adminlayout/AdminLayout.vue"; // Layout principal del Admin
import DashboardView from "@/modules/admin/views/DashboardView.vue";
import PassengersView from "@/modules/admin/views/PassengersView.vue";
import DriversView from "@/modules/admin/views/DriversView.vue";
import ReportsComplaintsView from "@/modules/admin/views/ReportsComplaintsView.vue";
import UsersView from "@/modules/admin/views/UsersView.vue";
import PromotionsView from "@/modules/admin/views/PromotionsView.vue";
import CampaignsView from "@/modules/admin/views/CampaignsView.vue";
import PanicEventsView from "@/modules/admin/views/PanicEventsView.vue";
import TrafficFlowView from "@/modules/admin/views/TrafficFlowView.vue";
import ProfileView from "@/modules/admin/views/ProfileView.vue";
import UserLayout from "@/layout/userlayout/UserLayout.vue";
import DashboardUserView from "@/modules/municipalidad/views/DashboardUserView.vue";
import DriversUserView from "@/modules/municipalidad/views/DriversUserView.vue";
import UnitsUserView from "@/modules/municipalidad/views/UnitsUserView.vue";
import PanicEventUserView from "@/modules/municipalidad/views/PanicEventUserView.vue";
import AlertsUserView from "@/modules/municipalidad/views/AlertsUserView.vue";
import TrafficFlowUserView from "@/modules/municipalidad/views/TrafficFlowUserView.vue";
import ProfileUserView from "@/modules/municipalidad/views/ProfileUserView.vue";

const routes = [
    { path: "/", component: LoginView },

    {
        path: "/admin",
        component: AdminLayout,
        children: [
            { path: "", name: "AdminDashboard", component: DashboardView },
            { path: "passengers", name: "AdminPassengers", component: PassengersView },
            { path: "drivers", name: "AdminDrivers", component: DriversView },
            { path: "reports-complaints", name: "AdminReportsComplaints", component: ReportsComplaintsView },
            { path: "users", name: "AdminUsers", component: UsersView },
            { path: "promotions", name: "AdminPromotions", component: PromotionsView },
            { path: "campaigns", name: "AdminCampaigns", component: CampaignsView },
            { path: "panic-events", name: "AdminPanicEvents", component: PanicEventsView },
            { path: "traffic-flow", name: "AdminTrafficFlow", component: TrafficFlowView },
            { path: "profile", name: "AdminProfile", component: ProfileView },
        ],
    },
    {
        path: "/user",
        component: UserLayout,
        children: [
            { path: "", name: "UserDashboard", component: DashboardUserView },
            { path: "drivers", name: "UserDrivers", component: DriversUserView },
            { path: "units", name: "UserUnits", component: UnitsUserView },
            { path: "panic-event", name: "UserPanicEvent", component: PanicEventUserView },
            { path: "alerts", name: "UserAlerts", component: AlertsUserView },
            { path: "traffic-flow", name: "UserTrafficFlow", component: TrafficFlowUserView },
            { path: "profile", name: "UserProfile", component: ProfileUserView },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
