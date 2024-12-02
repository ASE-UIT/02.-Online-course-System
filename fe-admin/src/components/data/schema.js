import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  avatar: z.string(),
  title: z.string(),
  course: z.number(),
  createdBy: z.string()
});
