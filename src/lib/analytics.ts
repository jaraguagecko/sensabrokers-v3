"use client";
import posthog from "posthog-js";

let initialized = false;

export function initAnalytics() {
  if (typeof window === "undefined" || initialized) return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;
  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    person_profiles: "identified_only",
  });
  initialized = true;
}

export function track(event: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!initialized) return;
  posthog.capture(event, props);
}

export const FunnelEvent = {
  MatcherStarted: "matcher_started",
  MatcherCompleted: "matcher_completed",
  CalculadoraCompleted: "calculadora_completed",
  RequisitosViewed: "requisitos_viewed",
  RequisitosPdfDownloaded: "requisitos_pdf_downloaded",
  GuiaEmailSubmitted: "guia_email_submitted",
  AgendarSubmitted: "agendar_submitted",
  CalendlyClicked: "calendly_clicked",
} as const;
