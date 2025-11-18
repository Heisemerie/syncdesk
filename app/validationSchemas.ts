import { z } from "zod";

// title, description -> edit issue page
// assignedToUserId -> issue detail page
// status?

export const IssueSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(255),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(65535),
});
export type IssueData = z.infer<typeof IssueSchema>;

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(255)
    .optional(),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, { message: "Assigned user is required" })
    .max(255)
    .optional()
    .nullable(),
});
export type patchIssueData = z.infer<typeof patchIssueSchema>;
