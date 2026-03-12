import { Route } from "@/types";

export const studentRoutes: Route[] = [
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
    title: "Blog Management",
    items: [
      {
        title: "Statistics",
        url: "/dashboard/statistics",
      },
      {
        title: "Bookings",
        url: "/dashboard/bookings",
      },
      {
        title: "Student Profile",
        url: "/dashboard/student-profile",
      }
    ],
  },

];