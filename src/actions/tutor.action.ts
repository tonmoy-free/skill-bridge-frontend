"use server";

import { CreateAvailabilityData, CreateTutorProfileData, ID, tutorService } from "@/services/tutor.service";



export const createAvailability = async (tutorId: ID,updateData: Partial<CreateAvailabilityData>, revalidate?: number) => {
    return await tutorService.createAvailability(tutorId,updateData, { revalidate });
};
export const createTutorProfile = async (updateData: Partial<CreateTutorProfileData>, revalidate?: number) => {
    return await tutorService.createTutorProfile(updateData, { revalidate });
};

export const getTutorProfileById = async ( revalidate?: number) => {
    return await tutorService.getTutorProfileById({ revalidate });
};
export const getAvailabilityById = async (id: any, revalidate?: number) => {
    return await tutorService.getAvailabilityById(id,{ revalidate });
};

export const getDeleteAvailabilitytById = async (params?: any, revalidate?: number) => {
    return await tutorService.getDeleteAvailabilitytById(params, { revalidate });
};
