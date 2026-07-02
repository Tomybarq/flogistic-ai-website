"use server";

import { ContactSchema, ContactInput } from "./schema";

export type ActionState = {
  success: boolean;
  message?: string;
  errors?: {
    [key in keyof ContactInput]?: string[];
  };
};

export async function submitContactForm(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const rawName = formData.get("name");
  const rawEmail = formData.get("email");
  const rawPhone = formData.get("phone");
  const rawMessage = formData.get("message");

  const validatedFields = ContactSchema.safeParse({
    name: rawName,
    email: rawEmail,
    phone: rawPhone,
    message: rawMessage,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors in the form.",
    };
  }

  // Sanitized payload
  const { name, email, phone, message } = validatedFields.data;

  // Simulate logging database action
  console.log("=== Contact Form Inquiry Received ===");
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Phone: ${phone || "N/A"}`);
  console.log(`Message: ${message}`);
  console.log("=====================================");

  return {
    success: true,
    message: "Thank you! Your inquiry has been received safely.",
  };
}
