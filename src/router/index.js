import Index from "@/pages/Index";
import Templates from "@/pages/Templates";
import SendMail from "@/pages/SendMail";

export default [
  {
    path: "/",
    component: Index,
  },
  {
    path: "/templates",
    component: Templates,
  },
  {
    path: "/send-email",
    component: SendMail,
  },
];
