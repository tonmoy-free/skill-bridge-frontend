"use server";

import { CreateAvailabilityData, CreateTutorProfileData, tutorService } from "@/services/tutor.service";



export const createAvailability = async (updateData: Partial<CreateAvailabilityData>, revalidate?: number) => {
    return await tutorService.createAvailability(updateData, { revalidate });
};
export const createTutorProfile = async (updateData: Partial<CreateTutorProfileData>, revalidate?: number) => {
    return await tutorService.createTutorProfile(updateData, { revalidate });
};
