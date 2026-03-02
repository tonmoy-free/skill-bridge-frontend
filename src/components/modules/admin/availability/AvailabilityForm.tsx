"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

/* ---------------- ZOD SCHEMA ---------------- */

const availabilitySchema = z
  .object({
    dayOfWeek: z.number().min(0).max(6),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: "End time must be later than start time",
    path: ["endTime"],
  });

type AvailabilityFormValues = z.infer<typeof availabilitySchema>;

/* ---------------- DAYS ---------------- */

const days = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];

/* ---------------- PAGE ---------------- */

export default function AvailabilityForm() {
  const [slots, setSlots] = useState<AvailabilityFormValues[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      dayOfWeek: 0,
      startTime: "",
      endTime: "",
    } as AvailabilityFormValues,

    onSubmit: async ({ value }) => {
      setErrorMessage(null);

      // 🔥 ZOD VALIDATION MANUALLY
      const result = availabilitySchema.safeParse(value);

      if (!result.success) {
        setErrorMessage(result.error.issues[0].message);
        return;
      }

      // 🔥 Overlap Check
      const overlap = slots.some(
        (slot) =>
          slot.dayOfWeek === value.dayOfWeek &&
          value.startTime < slot.endTime &&
          value.endTime > slot.startTime
      );

      if (overlap) {
        setErrorMessage("Time slot overlaps with existing availability!");
        return;
      }

      setSlots((prev) => [...prev, value]);
      form.reset();
    },
  });

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="card w-full max-w-xl bg-base-100 shadow-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">
          Manage Availability
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* Day */}
          <form.Field name="dayOfWeek">
            {(field) => (
              <div>
                <label className="label font-semibold">Day</label>
                <select
                  className="select select-bordered w-full"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(Number(e.target.value))
                  }
                >
                  {days.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </form.Field>

          {/* Start Time */}
          <form.Field name="startTime">
            {(field) => (
              <div>
                <label className="label font-semibold">
                  Start Time
                </label>
                <input
                  type="time"
                  className="input input-bordered w-full"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(e.target.value)
                  }
                />
              </div>
            )}
          </form.Field>

          {/* End Time */}
          <form.Field name="endTime">
            {(field) => (
              <div>
                <label className="label font-semibold">
                  End Time
                </label>
                <input
                  type="time"
                  className="input input-bordered w-full"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(e.target.value)
                  }
                />
              </div>
            )}
          </form.Field>

          {/* Error Message */}
          {errorMessage && (
            <div className="alert alert-error">
              <span>{errorMessage}</span>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full">
            Add Slot
          </button>
        </form>

        <div className="divider">Your Weekly Availability</div>

        {slots.length === 0 ? (
          <p className="text-center text-gray-500">
            No availability added yet.
          </p>
        ) : (
          <div className="space-y-2">
            {slots.map((slot, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-base-200 p-3 rounded-lg"
              >
                <span>
                  {
                    days.find(
                      (d) => d.value === slot.dayOfWeek
                    )?.label
                  }{" "}
                  — {slot.startTime} to {slot.endTime}
                </span>

                <button
                  className="btn btn-sm btn-error"
                  onClick={() =>
                    setSlots((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}