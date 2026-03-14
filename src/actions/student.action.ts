"use server";

import { studentService, UserData } from "@/services/student.service";


export const getSingleStudentById = async (id: string, revalidate?: number) => {
    return await studentService.getSingleStudentById(id, { revalidate });
};



export const updateStudentProfileById = async (id: string, updateData: Partial<UserData>, revalidate?: number) => {
    return await studentService.updateStudentProfileById(id, updateData, { revalidate });
};