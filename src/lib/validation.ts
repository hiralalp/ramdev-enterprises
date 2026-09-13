import { z } from "zod";

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(100, "Use 100 characters or fewer."),
  company: z.string().trim().max(160, "Use 160 characters or fewer."),
  email: z.email("Enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .max(30, "Use 30 characters or fewer.")
    .refine(
      (value) => !value || /^[+\d()\s.-]{6,30}$/.test(value),
      "Enter a valid contact number or leave this blank.",
    ),
  requirement: z
    .string()
    .trim()
    .min(2, "Select or describe your requirement.")
    .max(200),
  quantity: z.string().trim().max(100),
  specification: z.string().trim().max(500),
  location: z.string().trim().max(250),
  details: z
    .string()
    .trim()
    .min(20, "Please include at least 20 characters about your requirement.")
    .max(5000, "Use 5,000 characters or fewer."),
  website: z.string().max(0, "Unable to submit this enquiry."),
});
export type Enquiry = z.infer<typeof enquirySchema>;
