import { Route } from "@/types";

export const tutorRoutes: Route[] = [
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
    title: "Tutor Management",
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
        title: "Tutor Profile",
        url: "/tutor-dashboard/tutor-profile",
      }
    ],
  },
  
];