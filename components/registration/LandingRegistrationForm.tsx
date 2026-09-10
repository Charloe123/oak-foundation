"use client";

import { useState } from "react";
import { PARTICIPANT_ROLES } from "@/lib/site";

const inputClass =
  "w-full rounded-xl bg-oak-input px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-oak-navy/40";
const labelClass =
  "mb-1.5 block text-[11px] font-bold tracking-[0.08em] text-oak-label";

function Err({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return <p id={id} role="alert" className="mt-1 text-xs font-medium text-red-600">{msg}</p>;
}

export default function LandingRegistrationForm() {
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("firstName") || "").trim()) next.firstName = "First name is required";
    if (!String(data.get("lastName") || "").trim()) next.lastName = "Last name is required";
    if (!String(data.get("organization") || "").trim()) next.organization = "Organisation is required";
    if (!String(data.get("role") || "")) next.role = "Please select your role";
    const email = String(data.get("email") || "").trim();
    if (!email) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address";
    if (!data.get("consent")) next.consent = "Please accept the privacy policy and consent to continue";
    setErrors(next);
    if (Object.keys(next).length === 0) setDone(true);
  }

  if (done) {
    return (
      <div role="status" className="rounded-2xl bg-oak-background p-5 text-center">
        <p className="font-extrabold text-oak-navy">Registration received</p>
        <p className="mt-1 text-sm text-oak-label">QR confirmation appears here once saving is connected.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="firstName" className={labelClass}>FIRST NAME <span className="text-red-500">*</span></label>
          <input id="firstName" name="firstName" placeholder="Maria" className={inputClass} />
          <Err id="fn-e" msg={errors.firstName} />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>LAST NAME <span className="text-red-500">*</span></label>
          <input id="lastName" name="lastName" placeholder="Schmidt" className={inputClass} />
          <Err id="ln-e" msg={errors.lastName} />
        </div>
      </div>
      <div>
        <label htmlFor="organization" className={labelClass}>ORGANISATION <span className="text-red-500">*</span></label>
        <input id="organization" name="organization" placeholder="Your organisation name" className={inputClass} />
        <Err id="org-e" msg={errors.organization} />
      </div>
      <div>
        <label htmlFor="subPartnerProgramArea" className={labelClass}>SUB-PARTNER / PROGRAMME AREA</label>
        <input id="subPartnerProgramArea" name="subPartnerProgramArea" placeholder="Optional" className={inputClass} />
      </div>
      <div>
        <label htmlFor="role" className={labelClass}>ROLE / CAPACITY <span className="text-red-500">*</span></label>
        <select id="role" name="role" defaultValue="" className={inputClass}>
          <option value="" disabled>Select your role</option>
          {PARTICIPANT_ROLES.map((r) => (<option key={r} value={r}>{r}</option>))}
        </select>
        <Err id="role-e" msg={errors.role} />
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>EMAIL ADDRESS <span className="text-red-500">*</span></label>
        <input id="email" name="email" type="email" placeholder="you@organisation.org" className={inputClass} />
        <Err id="em-e" msg={errors.email} />
      </div>
      <div>
        <label htmlFor="phone" className={labelClass}>PHONE NUMBER</label>
        <input id="phone" name="phone" type="tel" placeholder="+41 xx xxx xx xx" className={inputClass} />
      </div>
      <fieldset className="rounded-2xl bg-oak-input/60 p-4">
        <legend className="mb-3 px-1 text-[11px] font-bold tracking-[0.08em] text-oak-label">REQUIREMENTS</legend>
        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="dietaryRequirements" className={labelClass}>DIETARY REQUIREMENTS</label>
            <input id="dietaryRequirements" name="dietaryRequirements" placeholder="e.g. Vegetarian, Halal, Gluten-free" className="w-full rounded-xl bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-oak-navy/40" />
          </div>
          <div>
            <label htmlFor="accessibilityRequirements" className={labelClass}>ACCESSIBILITY REQUIREMENTS</label>
            <input id="accessibilityRequirements" name="accessibilityRequirements" placeholder="e.g. Wheelchair access, hearing loop" className="w-full rounded-xl bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-oak-navy/40" />
          </div>
          <div>
            <label htmlFor="travelAccommodation" className={labelClass}>TRAVEL & ACCOMMODATION</label>
            <input id="travelAccommodation" name="travelAccommodation" placeholder="e.g. Flight from London, hotel needed" className="w-full rounded-xl bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-oak-navy/40" />
          </div>
        </div>
      </fieldset>
      <div className="rounded-2xl border border-oak-label/25 p-4">
        <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-sm">
          <input id="consent" name="consent" type="checkbox" value="yes" className="mt-1 h-4 w-4 shrink-0 accent-oak-navy" />
          <span className="leading-relaxed">I agree to OAK Foundation&apos;s <span className="underline">privacy policy</span> and consent to my registration data being used for event coordination.</span>
        </label>
        <Err id="consent-e" msg={errors.consent} />
      </div>
      <button type="submit" className="w-full rounded-2xl bg-oak-navy py-4 font-bold text-white hover:bg-oak-navy-deep">
        Register
      </button>
    </form>
  );
}
