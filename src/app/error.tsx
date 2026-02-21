"use client";

import { useTranslations } from "next-intl";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  const t = useTranslations("errors");

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-red-500 mb-4">!</div>
        <h1 className="text-2xl font-bold text-brand-secondary mb-3">
          {t("generic.title")}
        </h1>
        <p className="text-neutral-600 mb-8">
          {t("generic.description")}
        </p>
        <Button variant="primary" size="lg" onClick={reset}>
          <RefreshCw className="w-4 h-4 mr-2" />
          {t("generic.action")}
        </Button>
      </div>
    </div>
  );
}
