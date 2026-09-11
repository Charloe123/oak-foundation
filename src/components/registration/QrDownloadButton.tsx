"use client";

import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download } from "lucide-react";

export default function QrDownloadButton({ registrationId, qrToken }: { registrationId: string; qrToken: string }) {
  const downloadRef = useRef<HTMLCanvasElement>(null);

  function downloadQr() {
    const canvas = downloadRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `oak-registration-${registrationId}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <>
      <div className="hidden">
        <QRCodeCanvas
          ref={downloadRef}
          value={qrToken}
          size={600}
          bgColor="#ffffff"
          fgColor="#122b52"
          level="M"
          includeMargin
        />
      </div>
      <button
        type="button"
        onClick={downloadQr}
        className="w-full bg-[#1e3a6d] hover:bg-[#162d56] active:scale-[0.99] text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-900/10 transition-all flex items-center justify-center gap-2.5 text-sm"
      >
        <Download className="w-4 h-4 stroke-[2.5]" />
        <span>Download QR Code</span>
      </button>
    </>
  );
}
