import { EVENT } from "@/lib/site";
import LandingRegistrationForm from "../../../components/registration/LandingRegistrationForm";

export default function RegisterPage() {
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

        <section aria-labelledby="registration-heading" className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 id="registration-heading" className="text-lg font-extrabold text-oak-text">Registration Form</h2>
          <div className="mt-4">
            <LandingRegistrationForm />
          </div>
        </section>
      </main>
    </div>
  );
}
