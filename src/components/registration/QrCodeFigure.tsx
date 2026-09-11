"use client";

import { QRCodeCanvas } from "qrcode.react";

export function QrCodeFigure({ qrToken }: { qrToken: string }) {
  return (
    <div className="bg-slate-100/70 p-6 rounded-[28px] inline-block border border-slate-200/50">
      <QRCodeCanvas
        value={qrToken}
        size={192}
        bgColor="#f1f5f9"
        fgColor="#122b52"
        level="M"
      />
    </div>
  );
}
