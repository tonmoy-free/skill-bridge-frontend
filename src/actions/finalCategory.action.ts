"use server";

import { FinalCategoryData, finalCategoryService } from "@/services/finalCategory.service";


export const finalCreateCategory = async (updateData: Partial<FinalCategoryData>, revalidate?: number) => {
    return await finalCategoryService.createCategory(updateData, { revalidate });
};

export const finalGetAllCategory = async (params?: any, revalidate?: number) => {
    return await finalCategoryService.getAllCategory(params, { revalidate });
};

export const finalDeleteCategoryById = async (id: string, revalidate?: number) => {
    return await finalCategoryService.getDeleteCategoryById(id, { revalidate });
};

export const finalGetSingleCategoryById = async (id: string, revalidate?: number) => {
    return await finalCategoryService.getSingleCategoryById(id, { revalidate });
};

export const finalUpdateCategoryById = async (id: string, updateData: Partial<FinalCategoryData>, revalidate?: number) => {
    return await finalCategoryService.updateCategoryById(id, updateData, { revalidate });
};
