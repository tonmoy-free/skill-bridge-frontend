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
        url: "/tutor-dashboard/statistics",
      },
      {
        title: "Availability",
        url: "/tutor-dashboard/availability",
      },
      {
        title: "Student Profile",
        url: "/dashboard/student-profile",
      }
    ],
  },

];