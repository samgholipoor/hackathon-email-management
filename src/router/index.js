import Index from "@/pages/Index";
import Templates from "@/pages/Templates";
import TemplateCategory from "@/pages/TemplateCategory";
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
    path: "/template-category",
    component: TemplateCategory,
  },
  {
    path: "/send-email",
    component: SendMail,
  },
];
