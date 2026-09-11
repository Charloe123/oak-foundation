"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Html5Qrcode } from "html5-qrcode";
import { CheckCircle2, Scan, XCircle } from "lucide-react";
import { EVENT } from "@/lib/site";
import { checkInParticipant, type CheckInResult } from "@/app/actions";

type ScanState =
  | { status: "idle" }
  | { status: "checking"; code: string }
  | { status: "success"; result: CheckInResult; code: string }
  | { status: "failed"; code: string };

export default function EventCheckIn() {
  const [manualCode, setManualCode] = useState("");
  const [day, setDay] = useState<string>(EVENT.dates[0]);
  const [scan, setScan] = useState<ScanState>({ status: "idle" });
  const [cameraError, setCameraError] = useState("");
  const [isPending, startTransition] = useTransition();
  const scannerDivId = "oak-qr-reader";
  const router = useRouter();
  const checkingRef = useRef(false);

  function handleCheckIn(code: string) {
    const trimmed = code.trim();
    if (!trimmed || checkingRef.current) return;
    checkingRef.current = true;
    setScan({ status: "checking", code: trimmed });
    startTransition(async () => {
      try {
        const result = await checkInParticipant(trimmed, day);
        if (result.ok) setScan({ status: "success", result, code: trimmed });
        else if (result.error === "QR_NOT_RECOGNISED") router.push("/check-in/failed");
        else setScan({ status: "failed", code: trimmed });
      } finally {
        checkingRef.current = false;
      }
    });
  }

  useEffect(() => {
    let cancelled = false;
    const scanner = new Html5Qrcode(scannerDivId);
    Html5Qrcode.getCameras()
      .then((cameras) => {
        if (cancelled || cameras.length === 0) return;
        return scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 220, height: 220 } },
          (decoded) => handleCheckIn(decoded),
          undefined
        );
      })
      .catch(() => {
        if (!cancelled) setCameraError("Camera unavailable — use manual code entry below.");
      });
    return () => {
      cancelled = true;
      scanner.stop().catch(() => undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day]);

  const successParticipant =
    scan.status === "success" ? scan.result.participant : undefined;
  const alreadyCheckedIn =
    scan.status === "success" ? scan.result.alreadyCheckedIn : false;

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4 flex justify-center font-sans">
      <div className="w-full max-w-[480px] space-y-6">
        <header className="space-y-1">
          <h1 className="text-[28px] font-extrabold text-[#0f172a] tracking-tight">
            Event Check-In
          </h1>
          <p className="text-sm font-medium text-[#64748b]">
            Scan an attendee QR code to check them in
          </p>
        </header>
        <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm space-y-3">
          <h2 className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Event Day
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {EVENT.dates.map((d, i) => (
              <button
                key={d}
                type="button"
                onClick={() => setDay(d)}
                className={`rounded-2xl px-3 py-3 text-xs font-bold transition-all ${
                  day === d
                    ? "bg-[#233862] text-white shadow-md"
                    : "bg-[#f1f5f9] text-slate-600 hover:bg-slate-200"
                }`}
              >
                Day {i + 1}
                <span className="block text-[10px] font-semibold opacity-70">
                  {EVENT.dateLabels[i]}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="bg-[#0b1329] rounded-[28px] overflow-hidden shadow-xl text-white relative">
          <div className="relative flex flex-col items-center justify-between p-6">
            <div id={scannerDivId} className="w-full max-w-[300px] overflow-hidden rounded-2xl" />
            <p className="mt-3 text-xs text-slate-400 font-medium">
              {cameraError || "Hold camera steady · Auto-scans in 1–2 seconds"}
            </p>
          </div>
          <div className="bg-[#0f1938] px-5 py-4 border-t border-white/5 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/5 text-slate-300">
              <Scan className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              QR contains the registration token only — no personal data.
            </p>
          </div>
        </div>
        {scan.status === "checking" && (
          <p role="status" className="text-center text-sm font-semibold text-slate-500">
            Checking in…
          </p>
        )}
        {scan.status === "success" && successParticipant && (
          <div
            role="status"
            className={`rounded-[28px] border p-6 shadow-sm space-y-2 ${
              alreadyCheckedIn
                ? "bg-amber-50 border-amber-200"
                : "bg-emerald-50 border-emerald-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2
                className={`w-5 h-5 ${alreadyCheckedIn ? "text-amber-600" : "text-emerald-600"}`}
              />
              <h2 className="font-extrabold text-[#0f172a] text-sm">
                {alreadyCheckedIn ? "Already checked in today" : "Checked in"}
              </h2>
            </div>
            <p className="text-sm font-bold text-[#0f172a]">
              {successParticipant.firstName} {successParticipant.lastName}
            </p>
            <p className="text-xs text-slate-500 font-medium">
              {successParticipant.organization} · {successParticipant.role} ·{" "}
              {successParticipant.registrationId}
            </p>
            <button
              type="button"
              onClick={() => setScan({ status: "idle" })}
              className="mt-2 text-xs font-bold text-[#233862] hover:underline"
            >
              Scan next attendee
            </button>
          </div>
        )}
        {scan.status === "failed" && (
          <div
            role="alert"
            className="rounded-[28px] bg-red-50 border border-red-200 p-6 shadow-sm space-y-2"
          >
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <h2 className="font-extrabold text-[#0f172a] text-sm">Check-in failed</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Could not complete check-in. Please try again.
            </p>
          </div>
        )}
        <div className="bg-white border border-slate-100 rounded-[28px] p-6 shadow-sm space-y-4">
          <h2 className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Manual Code Entry
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Paste QR token (uuid)"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="flex-1 bg-[#f1f5f9] border border-transparent rounded-2xl px-4 py-3.5 text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-300 transition-all"
            />
            <button
              type="button"
              disabled={isPending || !manualCode.trim()}
              onClick={() => handleCheckIn(manualCode)}
              className="bg-[#233862] hover:bg-[#1b2b4d] active:scale-[0.98] text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center disabled:opacity-50"
            >
              Check
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

