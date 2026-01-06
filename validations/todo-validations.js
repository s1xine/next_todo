import z from "zod";

export const createTodoSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title cannot exceed 100 characters" }),

  description: z
    .string()
    .max(500, { message: "Description cannot exceed 500 characters" })
    .optional(),

  priority: z.enum(["low", "medium", "high"]).default("medium"),
});
