"use server";

import { manageUserService, UserData } from "@/services/manageUser.service";

export const updateUserRoleStatus = async (id: string, updateData: Partial<UserData>, revalidate?: number) => {
    return await manageUserService.updateStatusRoleById(id, updateData, { revalidate });
};
export const userdeleteById = async (id: string, revalidate?: number) => {
    return await manageUserService.userDeleteById(id, { revalidate });
};