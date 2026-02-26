"use server";

import { classService } from "@/services/class.service";



export const getAllClass = async () => {
    return await classService.getAllClass();
};

export const deleteClassById = async (id: string, revalidate?: number) => {
    return await classService.getDeleteClassById(id, { revalidate });
};