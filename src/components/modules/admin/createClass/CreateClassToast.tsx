"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function CreateClassToast() {
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get("success")) {
            toast.success("Class Created Successfully.");
        } else if(searchParams.get("error")) {
            toast.error("Class Filed Cant empty.");
        }
    }, [searchParams]);

    return null;
}