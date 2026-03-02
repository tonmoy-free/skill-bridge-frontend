import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Home",
    items: [
      {
        title: "Home",
        url: "/",
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Analytics",
        url: "/analytics",
      },
      {
        title: "Manage Users",
        url: "/admin-dashboard/manageUser",
      },
      {
        title: "Manage Booking",
        url: "/admin-dashboard/booking",
      },
      {
        title: "All Categories",
        url: "/admin-dashboard/final-all-category",
      },
      {
        title: "Create Category",
        url: "/admin-dashboard/final-create-category",
      },
      
    ],
  },
];