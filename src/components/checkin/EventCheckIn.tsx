'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Scan, CheckCircle2, User, Camera, AlertCircle } from 'lucide-react';

interface Attendee {
  id: string;
  name: string;
  initials: string;
  code: string;
  role: string;
  roleColor: {
    bg: string;
    text: string;
    dot: string;
  };
}

const attendeesData: Attendee[] = [
  {
    id: '1',
    name: 'Collin Manyande',
    initials: 'MS',
    code: 'OAK-2026-7842-XKPH',
    role: 'Partner',
    roleColor: {
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      dot: 'bg-slate-600',
    },
  },
  {
    id: '2',
    name: 'James Odhiambo',
    initials: 'JO',
    code: 'OAK-2026-1193-JWQA',
    role: 'OAK Staff',
    roleColor: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      dot: 'bg-emerald-500',
    },
  },
  {
    id: '3',
    name: 'Awa Diallo',
    initials: 'AD',
    code: 'OAK-2026-3310-ADGE',
    role: 'Coordination Team',
    roleColor: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      dot: 'bg-amber-500',
    },
  },
  {
    id: '4',
    name: 'Kayden Mamu',
    initials: 'KM',
    code: 'OAK-2026-5592-FWBN',
    role: 'Partner',
    roleColor: {
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      dot: 'bg-slate-600',
    },
  },
];

export default function EventCheckIn() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState<string>('');
  const [checkedInAttendee, setCheckedInAttendee] = useState<Attendee | null>(null);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);
  const [permissionState, setPermissionState] = useState<'prompt' | 'granted' | 'denied' | 'unknown'>('unknown');

  // Track the OS/browser-level camera permission so we can show the right guidance.
  // Note: when state is 'denied', the browser will NEVER show a prompt again —
  // no code can override that; the user must re-allow via the address-bar icon.
  useEffect(() => {
    let cancelled = false;
    const perms = (navigator as Navigator & {
      permissions?: { query: (opts: { name: string }) => Promise<{ state: string }> };
    }).permissions;
    if (!perms?.query) return;
    perms
      .query({ name: 'camera' as PermissionName })
      .then((status) => {
        if (!cancelled && (status.state === 'prompt' || status.state === 'granted' || status.state === 'denied')) {
          setPermissionState(status.state);
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      try { videoRef.current.pause(); } catch { /* not playing */ }
      videoRef.current.srcObject = null;
    }
  };

  const startCamera = async () => {
    try {
      setCameraError(null);
      setPermissionDenied(false);
      stopStream();
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError('Camera access is not supported in this browser.');
        setCameraActive(false);
        return;
      }
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
      } catch (firstErr) {
        // Only fall back for "no such camera" errors. A NotAllowedError means
        // the user blocked permission — retrying would just burn the gesture
        // and log a second identical console error, so rethrow it directly.
        if (firstErr instanceof DOMException && firstErr.name === 'NotAllowedError') {
          throw firstErr;
        }
        // Desktops/laptops often have no rear camera — fall back to any camera.
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
      }
      streamRef.current = stream;
      // The <video> below is always mounted, so videoRef is never null here.
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => undefined);
      }
      setCameraActive(true);
    } catch (err) {
      // Log once as a warning (not console.error) so it doesn't surface as a
      // red "Console NotAllowedError" overlay in dev — denial is an expected
      // user-driven state, not an app crash.
      console.warn('Camera access error:', err instanceof DOMException ? `${err.name}: ${err.message}` : err);
      const denied = err instanceof DOMException && err.name === 'NotAllowedError';
      setPermissionDenied(denied);
      if (denied) setPermissionState('denied');
      const msg = denied
        ? 'Camera permission is blocked.'
        : 'Camera access denied or unavailable.';
      setCameraError(msg);
      setCameraActive(false);
      stopStream();
    }
  };

  // Initialize Camera on mount ONLY if permission was already granted.
  // Auto-requesting on page load burns the one quiet chance browsers give and,
  // once denied, they never re-prompt — so start only on explicit user taps,
  // or when we know permission is already granted.
  useEffect(() => {
    if (permissionState === 'granted') {
      void startCamera();
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissionState]);

  const stopCamera = () => {
    stopStream();
    setCameraActive(false);
  };

  const handleSimulatedScan = (attendee: Attendee) => {
    setCheckedInAttendee(attendee);
    setTimeout(() => {
      alert(`Successfully checked in: ${attendee.name}`);
    }, 100);
  };

  const handleManualCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;

    const matched = attendeesData.find(
      (a) => a.code.toLowerCase() === manualCode.trim().toLowerCase()
    );

    if (matched) {
      handleSimulatedScan(matched);
      setManualCode('');
    } else {
      alert('Attendee code not found.');
    }
  };
  return (
    <main className="min-h-screen bg-slate-50 flex justify-center p-4 sm:p-6 md:p-8 font-sans">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <header className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Event Check-In
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Scan an attendee QR code to check them in
          </p>
        </header>

        {/* Camera Viewfinder Card */}
        <div className="relative bg-[#0d1527] rounded-3xl overflow-hidden shadow-xl flex flex-col min-h-[380px]">
          {/* Video / Camera Feed */}
          <div className="relative flex-1 flex items-center justify-center bg-slate-950 min-h-[320px] p-6">
            {/* QR scanner frame — the camera lives INSIDE this box only. */}
            <div className="relative w-56 h-56 overflow-hidden rounded-2xl bg-black shrink-0">
            {/* Always mounted so videoRef is never null when the stream arrives. */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`absolute inset-0 w-full h-full object-cover ${cameraActive ? 'opacity-100' : 'opacity-0'}`}
            />
            {!cameraActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-950 text-slate-400 text-center p-4">
                <Camera className="w-8 h-8 mx-auto text-slate-600 animate-pulse" />
                <p className="text-[11px] leading-snug">
                  {permissionState === 'denied' || permissionDenied
                    ? 'Camera is blocked for this site.'
                    : cameraError || 'Camera is off. Tap below to start it.'}
                </p>
                <button
                  type="button"
                  onClick={() => void startCamera()}
                  className="rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-900 hover:bg-slate-200"
                >
                  {permissionState === 'denied' || permissionDenied ? 'Try again' : 'Start camera'}
                </button>
                {(permissionDenied || permissionState === 'denied') && (
                  <p className="text-[10px] leading-snug text-slate-500 max-w-[180px]">
                    No prompt appeared because the browser remembers Block. Click the
                    camera icon in the address bar, set Camera to Allow, then tap Try again.
                  </p>
                )}
              </div>
            )}
            </div>

            {/* Scanning Reticle / Framing UI */}
            <div className="pointer-events-none absolute z-10 w-56 h-56 flex flex-col justify-between p-2">
              <div className="flex justify-between">
                <div className="w-8 h-8 border-t-2 border-l-2 border-slate-200 rounded-tl-xl" />
                <div className="w-8 h-8 border-t-2 border-r-2 border-slate-200 rounded-tr-xl" />
              </div>

              {/* Bottom Corners */}
              <div className="flex justify-between">
                <div className="w-8 h-8 border-b-2 border-l-2 border-slate-200 rounded-bl-xl" />
                <div className="w-8 h-8 border-b-2 border-r-2 border-slate-200 rounded-br-xl" />
              </div>
            </div>
          </div>

          {/* Footer banner in Camera Card */}
          <div className="bg-[#121c33] px-4 py-3.5 flex items-center gap-3 border-t border-slate-800/80">
            <div className="w-9 h-9 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-300">
              <Scan className="w-4 h-4" />
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Hold camera steady · Auto-scans in 1–2 seconds
            </p>
          </div>
        </div>

        {/* Simulate QR Scan Section */}
        <section className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Simulate QR Scan
          </h2>

          <div className="space-y-3">
            {attendeesData.map((attendee) => (
              <div
                key={attendee.id}
                onClick={() => handleSimulatedScan(attendee)}
                className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer bg-white group"
              >
                <div className="flex items-center space-x-3">
                  {/* Initials Circle */}
                  <div className="w-10 h-10 rounded-xl bg-[#233863] text-white font-bold text-sm flex items-center justify-center tracking-wider">
                    {attendee.initials}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-slate-900">
                      {attendee.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono tracking-tight">
                      {attendee.code}
                    </p>
                  </div>
                </div>

                {/* Role Badge */}
                <div
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border border-slate-200/60 text-xs font-semibold ${attendee.roleColor.bg} ${attendee.roleColor.text}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${attendee.roleColor.dot}`}
                  />
                  <span>{attendee.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Manual Code Entry Section */}
        <section className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Manual Code Entry
          </h2>

          <form onSubmit={handleManualCheck} className="flex gap-2">
            <input
              type="text"
              placeholder="OAK-2026-XXXX-XXXX"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="flex-1 bg-slate-100 border border-transparent rounded-2xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-slate-300 focus:outline-none transition-all font-mono"
            />
            <button
              type="submit"
              className="bg-[#233863] hover:bg-[#1a2a4b] text-white font-bold text-sm px-6 py-3 rounded-2xl transition-colors shadow-md active:scale-95"
            >
              Check
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
