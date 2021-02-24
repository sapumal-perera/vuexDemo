import { createWebHistory, createRouter } from "vue-router";
import PriceValues from "../components/PriceValues";
import CurrentPriceBTC from "../components/OrderBook";
import Feedback from "../components/Feedback";

const routes = [
    {
        path: "/priceValues",
        name: "priceValues",
        component: PriceValues,
    },
    {
        path: "/orderBook",
        name: "CurrentPriceBTC",
        component: CurrentPriceBTC,
    },
    {
        path: "/feedback",
        name: "Feedback",
        component: Feedback,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;