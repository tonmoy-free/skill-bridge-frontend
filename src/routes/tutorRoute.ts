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
      },
      {
        title: "User Profile",
        url: "/tutor-dashboard/tutor-user-profile",
      },
      {
        title: "Teaching Sessions",
        url: "/tutor-dashboard/teaching-sessions",
      },
      {
        title: "Ratings and Reviews",
        url: "/tutor-dashboard/ratings-and-reviews",
      }
    ],
  },
  
];