import { ICONS_ENUM } from "@/lib/consts";

export const routes = [
  {
    name: "Hoy",
    path: "/",
    icon: ICONS_ENUM.calendar,
  },
  {
    name: "Clientes",
    path: "/clientes",
    icon: ICONS_ENUM.users,
  },
  {
    name: "Control",
    path: "/control",
    icon: ICONS_ENUM.report,
  },
  {
    name: "Ajustes",
    path: "/ajustes",
    icon: ICONS_ENUM.settings,
  }
];