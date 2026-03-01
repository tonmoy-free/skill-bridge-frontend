"use client";

import { deleteCategoryById, getAllCategory } from '@/actions/category.action';
import { deleteClassById } from '@/actions/class.action';
import { deleteSubjectById, getAllSubject } from '@/actions/subject.action';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export type Class = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export type Subject = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

// এই টাইপটি JSON অবজেক্টের জন্য
export type ClassSubjectRelation = {
    id: string;
    classId: string;
    subjectId: string;
    createdAt: string;
    updatedAt: string;
    class: Class;      // নেস্টেড অবজেক্ট
    subject: Subject;  // নেস্টেড অবজেক্ট
};


const AllCategoryComponent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [categoryData, setCategoryData] = useState<ClassSubjectRelation[]>([]);

    const [totalCategory, setTotalCategory] = useState(0);


    useEffect(() => {
        const loadCategory = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getAllCategory();

                // ১. এরর হ্যান্ডেলিং
                if (response.error) {
                    setError(response.error.message);
                    setCategoryData([]);
                    setTotalCategory(0);
                    return;
                }

                // ২. ডেটা বের করে আনা (Response structure অনুযায়ী)
                // আপনার কনসোল অনুযায়ী যদি response.data সরাসরি অ্যারে হয়:
                const fetchedData = response.data || [];

                if (Array.isArray(fetchedData)) {
                    setCategoryData(fetchedData);
                    setTotalCategory(fetchedData.length); // এখানে সঠিক লেন্থ সেট হচ্ছে
                } else {
                    console.warn("Received data is not an array:", fetchedData);
                    setCategoryData([]);
                    setTotalCategory(0);
                }

            } catch (err) {
                console.error("Error loading categories:", err);
                setError(err instanceof Error ? err.message : "Failed to load categories");
                setTotalCategory(0);
            } finally {
                setLoading(false);
            }
        };
        loadCategory();
    }, []);

    const handleDelete = (id: any) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to remove this category!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33', // ডিলিট বাটনের রঙ লাল করা ভালো
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel',
            showLoaderOnConfirm: true, // কনফার্ম বাটনে ক্লিক করলে লোডার দেখাবে
            preConfirm: async () => {
                // এই অংশটি 'Yes, delete' ক্লিক করার পর এবং পপআপ বন্ধ হওয়ার আগে রান হবে
                try {
                    const response = await deleteCategoryById(id, 10);
                    if (response.error) {
                        throw new Error(response.error.message); // এরর থাকলে ক্যাচ ব্লকে পাঠিয়ে দেবে
                    }
                    return response; // সাকসেস হলে রেসপন্স রিটার্ন করবে
                } catch (error: any) {
                    Swal.showValidationMessage(`Request failed: ${error.message}`);
                }
            },
            allowOutsideClick: () => !Swal.isLoading() // লোডিং অবস্থায় বাইরে ক্লিক করলে যেন বন্ধ না হয়
        }).then(async (result) => { // এখানে async যোগ করা হয়েছে
            if (result.isConfirmed) {
                if (result.isConfirmed) {
                    // সাকসেস মেসেজ দেখানো
                    Swal.fire(
                        'Deleted!',
                        'The category has been removed.',
                        'success'
                    ).then(() => {
                        // UI স্টেট আপডেট (অটোমেটিক রিলোড ছাড়া ইউজার লিস্ট থেকে সরিয়ে দেওয়া)
                        setCategoryData(prev => prev.filter(cls => cls.id !== id));
                        setTotalCategory(prev => prev - 1);
                    });
                }
            }
        });
    };

    console.log("Category Data State:", categoryData);
    console.log("totalCategory Data State:", totalCategory);

    return (
        <div className="overflow-x-auto p-5">
            <table className="table table-zebra w-full border border-base-300 shadow-md">
                {/* Table Head */}
                <thead className="bg-base-200 text-base-content">
                    <tr>
                        <th>#</th>
                        <th>CategoryID</th>
                        <th>Class Name</th>
                        <th>Subject Name</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {categoryData.map((cls, index) => (
                        <tr key={cls.id} className="hover">
                            <th>{index + 1}</th>
                            <td className="text-xs font-mono opacity-60">{cls.id}</td>
                            <td className="font-bold text-primary">{cls.class.name}</td>
                            <td className="font-bold text-primary">{cls.subject.name}</td>
                            <td>{new Date(cls.createdAt).toLocaleDateString()}</td>
                            <td>
                                <div className="flex gap-2">
                                    <button
                                        className="btn btn-sm btn-outline btn-info rounded-md"
                                    // onClick={() => handleEdit(cls.id)}
                                    >
                                        <Link href={`/admin-dashboard/all-category/${cls.id}`}>
                                            Edit
                                        </Link>
                                    </button>
                                    {/* <button className="btn btn-sm btn-outline btn-error" onClick={async () => {
                                        const response = await deleteClassById(cls.id, 10);
                                        if (response.error) {
                                            alert(response.error.message);
                                        } else {
                                            alert("Class deleted successfully");
                                            window.location.reload(); // Reload the page to reflect changes
                                        }
                                    }}> */}
                                    <button
                                        className="btn btn-sm btn-outline btn-error rounded-md  cursor-pointer"
                                        onClick={() => handleDelete(cls.id)}>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllCategoryComponent;