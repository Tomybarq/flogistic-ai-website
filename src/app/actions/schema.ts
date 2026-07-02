import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => {
        if (!val) return true;
        // Simple phone validation regex
        return /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im.test(val);
      },
      { message: "Please enter a valid phone number." }
    ),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactInput = z.infer<typeof ContactSchema>;
