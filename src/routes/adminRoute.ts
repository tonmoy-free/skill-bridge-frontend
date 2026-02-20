import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Analytics",
        url: "/analytics",
      },
      {
        title: "Create Classs",
        url: "/admin-dashboard/create-class",
      }
    ],
  },
];