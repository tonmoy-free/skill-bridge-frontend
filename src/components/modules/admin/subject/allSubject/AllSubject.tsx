"use client";

import { deleteClassById, getAllClass } from '@/actions/class.action';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export type Class = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt?: string;
};


const AllSubjectTable = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [classesData, setClassesData] = useState<Class[]>([]);

    const [totalClass, setTotalClass] = useState(0);


    useEffect(() => {
        const loadClass = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getAllClass();

                // ১. এরর হ্যান্ডেলিং
                if (response.error) {
                    setError(response.error.message);
                    setClassesData([]);
                    setTotalClass(0);
                    return;
                }

                // ২. ডেটা বের করে আনা (Response structure অনুযায়ী)
                // আপনার কনসোল অনুযায়ী যদি response.data সরাসরি অ্যারে হয়:
                const fetchedData = response.data || [];

                if (Array.isArray(fetchedData)) {
                    setClassesData(fetchedData);
                    setTotalClass(fetchedData.length); // এখানে সঠিক লেন্থ সেট হচ্ছে
                } else {
                    console.warn("Received data is not an array:", fetchedData);
                    setClassesData([]);
                    setTotalClass(0);
                }

            } catch (err) {
                console.error("Error loading classes:", err);
                setError(err instanceof Error ? err.message : "Failed to load classes");
                setTotalClass(0);
            } finally {
                setLoading(false);
            }
        };
        loadClass();
    }, []);

    const handleDelete = (id: any) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to remove this class!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33', // ডিলিট বাটনের রঙ লাল করা ভালো
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel'
        }).then(async (result) => { // এখানে async যোগ করা হয়েছে
            if (result.isConfirmed) {
                try {
                    // API কল করা হচ্ছে
                    const response = await deleteClassById(id, 10);

                    console.log(response);

                    if (response.error) {
                        Swal.fire('Error!', response.error.message, 'error');
                    } else {
                        Swal.fire(
                            'Deleted!',
                            'The class has been removed.',
                            'success'
                        ).then(() => {
                            // window.location.reload(); // অথবা নিচের লাইন ব্যবহার করে শুধু স্টেট আপডেট করতে পারেন
                            // Remove the deleted class from the UI state
                            setClassesData(prev => prev.filter(cls => cls.id !== id));
                            setTotalClass(prev => prev - 1);
                        });
                    }
                } catch (err) {
                    Swal.fire('Error!', 'Something went wrong', 'error');
                }
            }
        });
    };

    console.log("Class Data State:", classesData);
    console.log("totalClass Data State:", totalClass);

    return (
        <div className="overflow-x-auto p-5">
            <table className="table table-zebra w-full border border-base-300 shadow-md">
                {/* Table Head */}
                <thead className="bg-base-200 text-base-content">
                    <tr>
                        <th>#</th>
                        <th>Class Name</th>
                        <th>ID</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {classesData.map((cls, index) => (
                        <tr key={cls.id} className="hover">
                            <th>{index + 1}</th>
                            <td className="font-bold text-primary">{cls.name}</td>
                            <td className="text-xs font-mono opacity-60">{cls.id}</td>
                            <td>{new Date(cls.createdAt).toLocaleDateString()}</td>
                            <td>
                                <div className="flex gap-2">
                                    <button
                                        className="btn btn-sm btn-outline btn-info rounded-md"
                                    // onClick={() => handleEdit(cls.id)}
                                    >
                                        <Link href={`/admin-dashboard/all-class/${cls.id}`}>
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

export default AllSubjectTable;