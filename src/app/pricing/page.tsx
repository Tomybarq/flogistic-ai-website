"use client";

import React, { useState } from "react";
import { Check, ArrowRight, Zap, Info, HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  
  // Metered calculator state
  const [monthlyRequests, setMonthlyRequests] = useState(100000); // default 100k

  const calculateCost = (requests: number) => {
    // Estimating average dynamic routing cost per request at $0.000015 (mixed Flash/Pro tokens)
    const cost = requests * 0.000015;
    return cost.toFixed(2);
  };

  const tiers = [
    {
      name: "Academy Starter",
      description: "Learn prompting and build intro-level cognitive agents.",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        "Access to basic LMS courses",
        "Interactive Prompt Sandbox practice",
        "Run up to 1,000 monthly prompts",
        "Community support channel"
      ],
      cta: "Enroll Free",
      popular: false
    },
    {
      name: "Professional Platform",
      description: "Deploy production-grade workflows and custom agent tools.",
      monthlyPrice: 49,
      yearlyPrice: 39,
      features: [
        "Access to all LMS courses & certificates",
        "Unlimited custom agents in Agent Factory",
        "Visual Automation graph editor",
        "Up to 250,000 monthly routed requests",
        "Stripe Connect marketplace onboarding",
        "Email support response <12h"
      ],
      cta: "Start 14-Day Trial",
      popular: true
    },
    {
      name: "Enterprise",
      description: "Scale operations with custom data pipelines and strict SLAs.",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      features: [
        "SAML SSO & advanced RBAC via Clerk",
        "Connect private vector databases (Pinecone)",
        "Audit traces logs & OpenTelemetry monitoring",
        "Infinite monthly API requests (metered)",
        "Custom python code sandbox execution",
        "Dedicated architect and 24/7 Slack support"
      ],
      cta: "Contact Solutions",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#040814] text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 space-y-16">
        
        {/* Title */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#00f5ff] font-semibold tracking-wider uppercase">
            <Zap className="w-4 h-4" />
            Pricing Plans
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Simple, Value-Focused Pricing
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Choose between standard learning enrollments, full workflow creation accounts, or enterprise-metered billing options.
          </p>

          {/* Billing toggle */}
          <div className="pt-6 flex justify-center">
            <div className="bg-[#0b1329] border border-[rgba(255,255,255,0.06)] rounded-xl p-1 flex items-center gap-1">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  billingPeriod === "monthly"
                    ? "bg-[#0066ff] text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  billingPeriod === "yearly"
                    ? "bg-[#0066ff] text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Annually (Save 20%)
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              variant={tier.popular ? "glowing" : "glass"}
              className={`flex flex-col justify-between relative ${
                tier.popular ? "border-[#00f5ff]/40 shadow-[0_0_30px_rgba(0,102,255,0.15)]" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute top-4 right-4">
                  <span className="bg-[#00f5ff]/10 border border-[#00f5ff]/20 text-[#00f5ff] text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                  <p className="text-slate-400 text-xs">{tier.description}</p>
                </div>
                
                {/* Price display */}
                <div className="flex items-baseline gap-1.5">
                  {typeof tier.monthlyPrice === "number" ? (
                    <>
                      <span className="text-3xl font-extrabold text-white">
                        ${billingPeriod === "monthly" ? tier.monthlyPrice : tier.yearlyPrice}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold uppercase">/ month</span>
                    </>
                  ) : (
                    <span className="text-2xl font-extrabold text-white">{tier.monthlyPrice}</span>
                  )}
                </div>
              </CardHeader>

              <CardBody className="flex-1 space-y-6">
                <ul className="space-y-3">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs text-slate-300 leading-normal">
                      <Check className="w-4 h-4 text-[#00f5ff] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>

              <div className="p-6 pt-0">
                <Button
                  variant={tier.popular ? "primary" : "outline"}
                  className="w-full text-xs py-2.5 font-bold"
                >
                  {tier.cta}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Dynamic Token Consumption Calculator */}
        <div className="glass-card bg-[rgba(11,19,41,0.3)] border border-[rgba(255,255,255,0.06)] p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
              Dynamic Metered Cost Calculator
            </h2>
            <p className="text-slate-400 text-xs max-w-2xl">
              Flogistic routes requests dynamically between cost and performance tiers. Drag the slider to estimate your monthly LLM cost based on average operational throughput.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pt-4">
            
            {/* Input Slider */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span>Monthly API Calls</span>
                <span className="text-white text-sm">{monthlyRequests.toLocaleString()} runs</span>
              </div>
              <input
                type="range"
                min="10000"
                max="5000000"
                step="10000"
                value={monthlyRequests}
                onChange={(e) => setMonthlyRequests(Number(e.target.value))}
                className="w-full accent-[#00f5ff]"
              />
              <div className="flex justify-between text-[9px] text-slate-500 font-semibold tracking-wider uppercase font-mono">
                <span>10K calls</span>
                <span>1M calls</span>
                <span>5M calls</span>
              </div>
            </div>

            {/* Output Calculation Display */}
            <div className="p-6 rounded-xl bg-[#040814]/60 border border-[rgba(255,255,255,0.04)] text-center space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Estimated LLM cost</span>
              <div className="text-3xl font-extrabold text-[#00f5ff] tracking-tight">
                ${calculateCost(monthlyRequests)}
              </div>
              <p className="text-[10px] text-slate-500 leading-normal">
                Includes router fallbacks, model SLA checks, and prompt tokens caching optimization.
              </p>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
