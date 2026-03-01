"use server";

import { CategoryData, categoryService } from "@/services/category.service";



export const createCategory = async (updateData: Partial<CategoryData>, revalidate?: number) => {
    return await categoryService.createCategory(updateData, { revalidate });
};