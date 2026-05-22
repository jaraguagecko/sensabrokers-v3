"use client";
import { useEffect } from "react";
import { track, FunnelEvent } from "@/lib/analytics";

export default function RequisitosTracked() {
  useEffect(() => {
    track(FunnelEvent.RequisitosViewed);
  }, []);
  return null;
}
