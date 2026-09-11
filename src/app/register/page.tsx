import LandingRegistrationForm from "../../../components/registration/LandingRegistrationForm";

export default function RegisterPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-5 px-4 pb-10 pt-8">
      <div>
        <p className="text-[11px] font-bold tracking-[0.16em] text-oak-label">OAK FOUNDATION</p>
        <h1 className="mt-2 text-3xl font-extrabold text-oak-navy">Event Registration</h1>
        <p className="mt-2 text-sm leading-relaxed text-oak-label">
          Register for the OAK Foundation Partner Gathering, 9–11 November 2026.
        </p>
      </div>
      <div className="rounded-3xl bg-white p-5 shadow-sm">
        <LandingRegistrationForm />
      </div>
    </main>
  );
}
