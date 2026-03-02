"use server";

import { assignTutorService } from "@/services/assignTutor.service";



export const getAllTutor = async (params?: any, revalidate?: number) => {
    return await assignTutorService.getAllTutor(params, { revalidate });
};