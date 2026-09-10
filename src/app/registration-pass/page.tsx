import type { Metadata } from "next";
import RegistrationPassScreen from "@/components/registration/RegistrationPassScreen";

export const metadata: Metadata = {
  title: "Registration Pass | OAK Foundation Partner Gathering",
  description: "Entry pass and registration details for the OAK Foundation Partner Gathering.",
};

export default function RegistrationPassPage() {
  return <RegistrationPassScreen />;
}
