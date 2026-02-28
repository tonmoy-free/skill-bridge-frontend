"use server";

import { classService, ClassData } from "@/services/class.service";

export const getAllClass = async () => {
    return await classService.getAllClass();
};

export const deleteClassById = async (id: string, revalidate?: number) => {
    return await classService.getDeleteClassById(id, { revalidate });
};

export const getSingleClassById = async (id: string, revalidate?: number) => {
    return await classService.getSingleClassById(id, { revalidate });
};

export const updateSingleClassById = async (id: string, updateData: Partial<ClassData>, revalidate?: number) => {
    return await classService.updateClassById(id, updateData, { revalidate });
};