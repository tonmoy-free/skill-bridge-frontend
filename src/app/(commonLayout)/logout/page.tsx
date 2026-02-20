"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutPage() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await authClient.signOut();

            toast.success("User logout successfully");

            router.push("/login"); // redirect
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    return (
        <div>
            <Button type="button" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
}