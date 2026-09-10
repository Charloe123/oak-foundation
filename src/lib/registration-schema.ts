import { z } from "zod";
import { PARTICIPANT_ROLES } from "@/lib/site";

export const registrationSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  organization: z.string().trim().min(1, "Organisation is required").max(200),
  subPartner: z.string().trim().max(200).optional(),
  role: z.enum(PARTICIPANT_ROLES, { message: "Please select your role" }),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address").max(254),
  phone: z.string().trim().max(50).optional(),
  dietary: z.string().trim().max(500).optional(),
  accessibility: z.string().trim().max(500).optional(),
  travel: z.string().trim().max(500).optional(),
  consent: z.literal(true, { message: "Please accept the privacy policy and consent to continue" }),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
