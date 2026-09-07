import { z } from "zod";

export const documentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Document name is required")
    .max(100, "Document name must not exceed 100 characters"),
});
