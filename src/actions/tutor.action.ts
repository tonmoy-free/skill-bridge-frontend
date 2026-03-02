"use server";

import { CreateAvailabilityData, tutorService } from "@/services/tutor.service";



export const createAvailability = async (updateData: Partial<CreateAvailabilityData>, revalidate?: number) => {
    return await tutorService.createAvailability(updateData, { revalidate });
};
