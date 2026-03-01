"use server";

import { CategoryData, categoryService } from "@/services/category.service";
import { subjectService } from "@/services/subject.service";



export const createCategory = async (updateData: Partial<CategoryData>, revalidate?: number) => {
    return await categoryService.createCategory(updateData, { revalidate });
};

export const getAllCategory = async (params?: any, revalidate?: number) => {
    return await categoryService.getAllCategory(params, { revalidate });
};

export const deleteCategoryById = async (id: string, revalidate?: number) => {
    return await categoryService.getDeleteCategoryById(id, { revalidate });
};

export const updateCategoryById = async (id: string, updateData: Partial<CategoryData>, revalidate?: number) => {
    return await categoryService.updateCategoryById(id, updateData, { revalidate });
};

export const getSingleCategoryById = async (id: string, revalidate?: number) => {
    return await categoryService.getSingleCategoryById(id, { revalidate });
};