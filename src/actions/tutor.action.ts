"use server";

import { UserData } from "@/services/manageUser.service";
import { CreateAvailabilityData, CreateTutorProfileData, ID, tutorService } from "@/services/tutor.service";



export const createAvailability = async (tutorId: ID, updateData: Partial<CreateAvailabilityData>, revalidate?: number) => {
    return await tutorService.createAvailability(tutorId, updateData, { revalidate });
};
export const createTutorProfile = async (updateData: Partial<CreateTutorProfileData>, revalidate?: number) => {
    return await tutorService.createTutorProfile(updateData, { revalidate });
};

export const updateTutorProfileById = async (updateData: Partial<CreateTutorProfileData>, revalidate?: number) => {
    return await tutorService.updateTutorProfileById(updateData, { revalidate });
};

export const getTutorProfileById = async (revalidate?: number) => {
    return await tutorService.getTutorProfileById({ revalidate });
};

export const getAllTutorProfile = async (revalidate?: number) => {
    return await tutorService.getAllTutorProfile({ revalidate });
};

export const getAvailabilityById = async (id: any, revalidate?: number) => {
    return await tutorService.getAvailabilityById(id, { revalidate });
};

export const getDeleteAvailabilitytById = async (params?: any, revalidate?: number) => {
    return await tutorService.getDeleteAvailabilitytById(params, { revalidate });
};

export const getTutorProfileByIdForCommonLayout = async (id: any, revalidate?: number) => {
    return await tutorService.getTutorProfileByIdForCommonLayout(id, { revalidate });
};

export const getSingleTutorUserById = async (id: any, revalidate?: number) => {
    return await tutorService.getSingleTutorUserById(id, { revalidate });
};

export const updateTutorUserProfileById = async (id: string, updateData: Partial<UserData>, revalidate?: number) => {
    return await tutorService.updateTutorUserProfileById(id, updateData, { revalidate });
};

export const getSingleBookingTutorUserById = async (id: string, revalidate?: number) => {
    return await tutorService.getSingleBookingTutorUserById(id, { revalidate });
};


export const getSingleTutorAllReviewById = async (id: string, revalidate?: number) => {
    return await tutorService.getSingleTutorAllReviewById(id, { revalidate });
};


