import Link from "next/link";
import { EVENT } from "@/lib/site";
import LandingRegistrationForm from "../../components/registration/LandingRegistrationForm";

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-white px-4 py-4 shadow-sm">
      <p className="text-xl font-extrabold leading-none text-oak-text">{value}</p>
      <p className="text-xs text-oak-label">{label}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-full bg-oak-background">
      <header className="bg-oak-navy text-white lg:hidden">
        <div className="mx-auto flex w-full max-w-md items-center gap-3 px-5 py-3">
          <p className="text-sm font-extrabold tracking-wide">OAK</p>
          <span className="h-6 w-px bg-white/30" aria-hidden="true" />
          <p className="text-[11px] font-semibold tracking-[0.14em]">PARTNER CONVENING 2026</p>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-md flex-col gap-4 px-4 pb-10 pt-4">
        <section className="rounded-3xl bg-oak-navy p-6 text-white">
          <h1 className="text-3xl font-extrabold leading-tight">Partner<br />Convening 2026</h1>
          <p className="mt-2 text-sm text-white/70">{EVENT.venue.split(",")[0]} - 9-11 November 2026</p>
        </section>
        <section aria-label="Event statistics" className="grid grid-cols-3 gap-3">
          <StatCard value="110+" label="Attendees" />
          <StatCard value="24" label="Sessions" />
          <StatCard value="38" label="Partners" />
        </section>
        <section aria-labelledby="registration-heading" className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 id="registration-heading" className="text-lg font-extrabold text-oak-text">Registration Form</h2>
          <div className="mt-4"><LandingRegistrationForm /></div>
        </section>
        <p className="px-2 text-center text-[11px] leading-relaxed text-oak-label">
          Your data is secured and handled by OAK Foundation.{" "}
          <Link href="/program" className="underline">View programme</Link>
        </p>
      </main>
    </div>
  );
}


