"use server";

import { ReviewData, reviewService } from "@/services/review.service";


export const createReview = async (updateData: Partial<ReviewData>, revalidate?: number) => {
    return await reviewService.createReview(updateData, { revalidate });
};




