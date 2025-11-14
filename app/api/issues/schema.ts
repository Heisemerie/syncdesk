import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(255),
  description: z.string().min(1, { message: "Description is required" }),
});
export type IssueData = z.infer<typeof schema>;

export default schema;
