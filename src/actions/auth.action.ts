"use server";

import { authClient } from "@/lib/auth-client";
import { userService } from "@/services/user.service";
import { revalidatePath } from "next/cache";

export async function logoutUser() {
  try {
    await authClient.signOut();
    
    // সব pages invalidate করো যাতে সেশন রিফ্রেশ হয়
    revalidatePath("/", "layout");
    
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error: "Logout failed" };
  }
}

