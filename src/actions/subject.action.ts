"use server";

import { SubjectData, subjectService } from "@/services/subject.service";


export const createSubject = async (updateData: Partial<SubjectData>, revalidate?: number) => {
    return await subjectService.createSubject(updateData, { revalidate });
};

export const getAllSubject = async (params?: any, revalidate?: number) => {
    return await subjectService.getAllSubject(params, { revalidate });
};

export const deleteSubjectById = async (params?: any, revalidate?: number) => {
    return await subjectService.getDeleteSubjectById(params, { revalidate });
};

export const updateSubjectById = async (id: string, updateData: Partial<SubjectData>, revalidate?: number) => {
    return await subjectService.updateSubjectById(id, updateData, { revalidate });
};

export const getSingleSubjectsById = async (id: string, revalidate?: number) => {
    return await subjectService.getSingleSubjectById(id, { revalidate });
};


