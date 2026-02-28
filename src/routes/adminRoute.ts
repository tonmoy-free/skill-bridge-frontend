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
        title: "Create Classs",
        url: "/admin-dashboard/create-class",
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
        title: "All Classes",
        url: "/admin-dashboard/all-class",
      },
      {
        title: "All Subjects",
        url: "/admin-dashboard/all-subject",
      },
      {
        title: "Create Subject",
        url: "/admin-dashboard/create-subject",
      },
    ],
  },
];