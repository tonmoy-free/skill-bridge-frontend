// app/dashboard/tutor/reviews/page.tsx

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import ReviewCard from "./ReviewCardComponent";
import { getSingleTutorAllReviewById } from "@/actions/tutor.action";
import { userService } from "@/services/user.service";

interface StudentInfo {
  name: string;
  image?: string | null;
}

interface ReviewItem {
  id: string;
  rating: number;
  comment: string;
  createdAt: string | Date;
  student: StudentInfo;
}

export default async function RatingsAndReviewspageComponent() {
  const { data } = await userService.getSession();

  // আপনার সার্ভার অ্যাকশন থেকে ডাটা আনুন
  const tutorData = await getSingleTutorAllReviewById(data.user.id, 10);
  const tutorProfile = tutorData.data.data;

  // console.log(tutor.rating)
  // console.log("tutorData////////////",tutorData.data.data)
  // Dummy Data for Preview
  // const tutorProfile = {
  //   rating: 4.5,
  //   reviews: [
  //     {
  //       id: "1",
  //       rating: 5,
  //       comment: "Excellent teacher! Explained React hooks very clearly.",
  //       createdAt: new Date(),
  //       student: { name: "Rahat", image: "" }
  //     },
  //     {
  //       id: "2",
  //       rating: 4,
  //       comment: "Good session, but went a bit fast on Tailwind CSS.",
  //       createdAt: new Date(),
  //       student: { name: "Sumi", image: "" }
  //     }
  //   ]
  // };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Ratings & Reviews</h1>
        <p className="text-muted-foreground">See what your students are saying about your teaching.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Rating Summary Section */}
        <Card className="md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">
              {tutorProfile?.rating.toFixed(1)}
            </div>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={i < Math.floor(tutorProfile?.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Total {tutorProfile?.reviews.length} reviews
            </p>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="md:col-span-2">
          {tutorProfile?.reviews.length > 0 ? (
            tutorProfile?.reviews.map((rev : ReviewItem) => (
              <ReviewCard key={rev.id} review={rev} />
            ))
          ) : (
            <div className="text-center py-20 border rounded-lg border-dashed">
              No reviews yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}