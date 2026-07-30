import { z } from "zod";

export const createAttendanceSchema = z.object({
  client_report_id: z
    .string()
    .uuid("client_report_id harus berupa UUID"),

  attendance_type: z.enum([
    "check_in",
    "check_out",
  ]),

  timestamp: z
    .string()
    .refine(
      (value) => !isNaN(Date.parse(value)),
      {
        message: "Format timestamp tidak valid",
      }
    ),

  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
    accuracy: z.number().optional(),
  }),

  photo: z.object({
    file_name: z.string().min(1),
    mime_type: z.enum([
      "image/jpeg",
      "image/png",
    ]),
    base64: z.string().min(1),
  }),
});