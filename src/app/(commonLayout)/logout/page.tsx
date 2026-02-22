"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutPage() {
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut();

        router.refresh(); // 🔥 আগে refresh

        toast.success("User logout successfully");

        router.push("/login");
    };

    return (
        <Button onClick={handleLogout}>
            Logout
        </Button>
    );
}