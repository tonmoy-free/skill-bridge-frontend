"use client";

import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { updateTutorUserProfileById } from "@/actions/tutor.action";


export default function EditTutorUserProfilePage({ user }: { user: any }) {
  const router = useRouter();

  // TanStack Form Initialization
  const form = useForm({
    defaultValues: {
      name: user.name || "",
      phone: user.phone || "",
      image: user.image || "",
    },
    onSubmit: async ({ value }) => {
      // শুধুমাত্র পরিবর্তিত ডাটা ফিল্টার করা
      const updatedFields: any = {};
      if (value.name !== user.name) updatedFields.name = value.name;
      if (value.phone !== user.phone) updatedFields.phone = value.phone;
      if (value.image !== user.image) updatedFields.image = value.image;

      if (Object.keys(updatedFields).length === 0) {
        toast.info("No changes made.");
        return;
      }

      const toastId = toast.loading("Updating profile...");

      const res = await updateTutorUserProfileById(user.id, updatedFields, 10);
      console.log("updatedFields", updatedFields)

      if (res.error) {
        toast.error(res.error.message, { id: toastId });
      } else {
        toast.success("Profile updated successfully!", { id: toastId });

        setTimeout(() => {
          router.push("/tutor-dashboard/tutor-user-profile");
        }, 1000);
        router.refresh();
      }
    },
  });

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            {/* Name Field */}
            <form.Field
              name="name"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Full Name</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
              )}
            />

            {/* Phone Field */}
            <form.Field
              name="phone"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Phone Number</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. +88017..."
                  />
                </div>
              )}
            />

            {/* Image URL Field */}
            <form.Field
              name="image"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Profile Image URL</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="https://image-link.com"
                  />
                </div>
              )}
            />

            <div className="flex gap-4 pt-4">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isPristine]}
                children={([canSubmit, isPristine]) => (
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={!canSubmit || isPristine}
                  >
                    Save Changes
                  </Button>
                )}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}