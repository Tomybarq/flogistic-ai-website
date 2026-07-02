"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, ContactInput } from "@/app/actions/schema";
import { submitContactForm, ActionState } from "@/app/actions/contact";
import { CheckCircle2, AlertTriangle, Send } from "lucide-react";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ActionState | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: clientErrors },
  } = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactInput) => {
    setState(null);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone || "");
    formData.append("message", data.message);

    startTransition(async () => {
      try {
        const result = await submitContactForm(null, formData);
        setState(result);
        if (result.success) {
          reset();
        }
      } catch (err) {
        setState({
          success: false,
          message: "An unexpected error occurred. Please try again later.",
        });
      }
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Alert Notices */}
      {state && (
        <div
          className={`mb-6 p-4 rounded-xl border animate-fade-in ${
            state.success
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-rose-500/10 border-rose-500/20 text-rose-400"
          }`}
        >
          <div className="flex items-center gap-3">
            {state.success ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
            <p className="text-sm font-medium">{state.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-dark-100 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              disabled={isPending}
              {...register("name")}
              placeholder="John Doe"
              className="w-full bg-dark-800/40 border border-dark-300/30 rounded-xl px-4 py-3 text-sm text-dark-50 placeholder-dark-300 focus:outline-none focus:border-flogistic-500/50 focus:ring-1 focus:ring-flogistic-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {(clientErrors.name?.message || state?.errors?.name?.[0]) && (
              <p className="mt-1.5 text-xs text-rose-500 font-medium">
                {clientErrors.name?.message || state?.errors?.name?.[0]}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-dark-100 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              disabled={isPending}
              {...register("email")}
              placeholder="john@example.com"
              className="w-full bg-dark-800/40 border border-dark-300/30 rounded-xl px-4 py-3 text-sm text-dark-50 placeholder-dark-300 focus:outline-none focus:border-flogistic-500/50 focus:ring-1 focus:ring-flogistic-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {(clientErrors.email?.message || state?.errors?.email?.[0]) && (
              <p className="mt-1.5 text-xs text-rose-500 font-medium">
                {clientErrors.email?.message || state?.errors?.email?.[0]}
              </p>
            )}
          </div>
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold text-dark-100 uppercase tracking-wider mb-2">
            Phone Number <span className="text-dark-300 font-normal">(Optional)</span>
          </label>
          <input
            id="phone"
            type="text"
            disabled={isPending}
            {...register("phone")}
            placeholder="+1 (555) 000-0000"
            className="w-full bg-dark-800/40 border border-dark-300/30 rounded-xl px-4 py-3 text-sm text-dark-50 placeholder-dark-300 focus:outline-none focus:border-flogistic-500/50 focus:ring-1 focus:ring-flogistic-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {(clientErrors.phone?.message || state?.errors?.phone?.[0]) && (
            <p className="mt-1.5 text-xs text-rose-500 font-medium">
              {clientErrors.phone?.message || state?.errors?.phone?.[0]}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-dark-100 uppercase tracking-wider mb-2">
            Message / Project details
          </label>
          <textarea
            id="message"
            rows={5}
            disabled={isPending}
            {...register("message")}
            placeholder="Tell us about your project, goals, and technical requirements..."
            className="w-full bg-dark-800/40 border border-dark-300/30 rounded-xl px-4 py-3 text-sm text-dark-50 placeholder-dark-300 focus:outline-none focus:border-flogistic-500/50 focus:ring-1 focus:ring-flogistic-500/30 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {(clientErrors.message?.message || state?.errors?.message?.[0]) && (
            <p className="mt-1.5 text-xs text-rose-500 font-medium">
              {clientErrors.message?.message || state?.errors?.message?.[0]}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-flogistic-600 hover:bg-flogistic-500 text-white py-3.5 px-6 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-flogistic-600/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </>
          ) : (
            <>
              Send Inquiry
              <Send size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
