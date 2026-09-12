'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Scan } from 'lucide-react';

interface Attendee {
  id: string;
  name: string;
  initials: string;
  code: string;
  role: string;
  roleType: 'partner' | 'staff' | 'coordination';
}

const INITIAL_ATTENDEES: Attendee[] = [
  {
    id: '1',
    name: 'Collin Manyande',
    initials: 'MS',
    code: 'OAK-2026-7842-XKPH',
    role: 'Partner',
    roleType: 'partner',
  },
  {
    id: '2',
    name: 'James Odhiambo',
    initials: 'JO',
    code: 'OAK-2026-1193-JWQA',
    role: 'OAK Staff',
    roleType: 'staff',
  },
  {
    id: '3',
    name: 'Awa Diallo',
    initials: 'AD',
    code: 'OAK-2026-3310-ADGE',
    role: 'Coordination Team',
    roleType: 'coordination',
  },
  {
    id: '4',
    name: 'Kayden Mamu',
    initials: 'KM',
    code: 'OAK-2026-5592-FWBN',
    role: 'Partner',
    roleType: 'partner',
  },
];

export default function CheckInScreen() {
  const [manualCode, setManualCode] = useState('');
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err) {
      console.warn('Camera permission denied or unavailable:', err);
      setCameraError('Camera access denied or unavailable.');
      setCameraActive(false);
    }
  };

  useEffect(() => {
    void startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleSimulateScan = (code: string) => {
    setScannedCode(code);
    alert(`Scanned attendee code: ${code}`);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    setScannedCode(manualCode);
    alert(`Checking in code: ${manualCode}`);
    setManualCode('');
  };

  const getRoleBadgeStyle = (roleType: Attendee['roleType']) => {
    switch (roleType) {
      case 'partner':
        return {
          badge: 'bg-[#EEF2F6] text-[#475569] border-[#E2E8F0]',
          dot: 'bg-[#475569]',
        };
      case 'staff':
        return {
          badge: 'bg-[#E6F9F0] text-[#059669] border-[#A7F3D0]',
          dot: 'bg-[#059669]',
        };
      case 'coordination':
        return {
          badge: 'bg-[#FFF7ED] text-[#EA580C] border-[#FFEDD5]',
          dot: 'bg-[#EA580C]',
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-start p-3 md:p-4 font-sans antialiased text-slate-800">
      <div className="w-full max-w-[360px] space-y-4">
        <header className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">
            Event Check-In
          </h1>
          <p className="text-sm font-medium text-slate-400">
            Scan an attendee QR code to check them in
          </p>
        </header>

        <div className="bg-[#0B132B] rounded-3xl overflow-hidden shadow-xl flex flex-col relative border border-slate-800/50">
          <div className="relative aspect-[4/4.5] w-full flex items-center justify-center bg-[#070D1E] overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />

            {!cameraActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#070D1E] z-20">
                <p className="text-sm text-slate-400 text-center px-6">
                  {cameraError || 'Camera is off. Tap below to start it.'}
                </p>
                <button
                  type="button"
                  onClick={startCamera}
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-slate-900 hover:bg-slate-200 transition-colors"
                >
                  Start Camera
                </button>
              </div>
            )}

            <div className="relative z-10 w-[180px] h-[180px] flex flex-col justify-between p-1">
              <div className="flex justify-between">
                <div className="w-9 h-9 border-t-[3px] border-l-[3px] border-slate-200 rounded-tl-2xl shadow-sm" />
                <div className="w-9 h-9 border-t-[3px] border-r-[3px] border-slate-200 rounded-tr-2xl shadow-sm" />
              </div>
              <div className="flex justify-between">
                <div className="w-9 h-9 border-b-[3px] border-l-[3px] border-slate-200 rounded-bl-2xl shadow-sm" />
                <div className="w-9 h-9 border-b-[3px] border-r-[3px] border-slate-200 rounded-br-2xl shadow-sm" />
              </div>
            </div>

            <div className="absolute bottom-6 z-10 text-center w-full px-4">
              <p className="text-xs font-medium text-slate-400 tracking-wide">
                Position QR code within the frame
              </p>
            </div>
          </div>

          <div className="bg-[#0D1835] px-4 py-3.5 flex items-center gap-3 border-t border-slate-800/60">
            <div className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700/50 flex items-center justify-center shrink-0">
              <Scan className="w-4 h-4 text-slate-300" />
            </div>
            <p className="text-[11px] font-medium text-slate-400 leading-tight">
              Hold camera steady · Auto-scans in 1–2 seconds
            </p>
          </div>
        </div>

        <section className="bg-white rounded-[28px] p-4 shadow-sm border border-slate-200/60 space-y-3">
          <h2 className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Simulate QR Scan
          </h2>

          <div className="space-y-2.5">
            {INITIAL_ATTENDEES.map((attendee) => {
              const styles = getRoleBadgeStyle(attendee.roleType);
              const isSelected = scannedCode === attendee.code;

              return (
                <div
                  key={attendee.id}
                  onClick={() => handleSimulateScan(attendee.code)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#233863] bg-slate-50'
                      : 'border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-[#233863] text-white font-bold text-xs flex items-center justify-center tracking-wider shrink-0">
                      {attendee.initials}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 leading-snug">
                        {attendee.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-mono tracking-tight mt-0.5">
                        {attendee.code}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border text-[11px] font-semibold ${styles.badge}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                    <span>{attendee.role}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white rounded-[28px] p-5 shadow-sm border border-slate-200/60 space-y-3">
          <h2 className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Manual Code Entry
          </h2>

          <form onSubmit={handleManualSubmit} className="flex gap-2.5">
            <input
              type="text"
              placeholder="OAK-2026-XXXX-XXXX"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="flex-1 bg-[#F1F5F9] border border-transparent rounded-2xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-slate-300 focus:outline-none transition-all font-mono tracking-tight"
            />
            <button
              type="submit"
              className="bg-[#233863] hover:bg-[#1a2b4e] active:scale-95 text-white font-bold text-xs px-6 py-3 rounded-2xl transition-all shadow-md shrink-0"
            >
              Check
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
