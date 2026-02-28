"use server";

import { SubjectData, subjectService } from "@/services/subject.service";


export const createSubject = async (updateData: Partial<SubjectData>, revalidate?: number) => {
    return await subjectService.createSubject(updateData, { revalidate });
};
