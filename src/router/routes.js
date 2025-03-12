import { createRouter, createWebHistory } from "vue-router";
import LoginViewView from "@/views/LoginView.vue";
import AdminLayout from "@/layout/adminlayout/AdminLayout.vue";
import DashboardView from "@/views/admin/DashboardView.vue";
import PassengersView from "@/views/admin/PassengersView.vue";
import DriversView from "@/views/admin/DriversView.vue";
import ReportsComplaintsView from "@/views/admin/ReportsComplaintsView.vue";
import UsersView from "@/views/admin/UsersView.vue";
import PromotionsView from "@/views/admin/PromotionsView.vue";
import CampaignsView from "@/views/admin/CampaignsView.vue";
import PanicEventsView from "@/views/admin/PanicEventsView.vue";
import TrafficFlowView from "@/views/admin/TrafficFlowView.vue";
import ProfileView from "@/views/admin/ProfileView.vue";
import UserLayout from "@/layout/userlayout/UserLayout.vue";
import DashboardUserView from "@/views/municipalidad/DashboardUserView.vue";
import DriversUserView from "@/views/municipalidad/DriversUserView.vue";
import UnitsUserView from "@/views/municipalidad/UnitsUserView.vue";
import PanicEventUserView from "@/views/municipalidad/PanicEventUserView.vue";
import AlertsUserView from "@/views/municipalidad/AlertsUserView.vue";
import TrafficFlowUserView from "@/views/municipalidad/TrafficFlowUserView.vue";
import ProfileUserView from "@/views/municipalidad/ProfileUserView.vue";
import MapsView from "@/views/MapsView.vue";

const routes = [
    { path: "/", component: LoginViewView },

    { path: "/emergency", name: "Emergency", component: MapsView },

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