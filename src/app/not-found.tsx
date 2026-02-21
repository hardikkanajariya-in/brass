import Link from "next/link";
import { useTranslations } from "next-intl";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("errors");

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-brand-primary mb-4">404</div>
        <h1 className="text-2xl font-bold text-brand-secondary mb-3">
          {t("notFound.title")}
        </h1>
        <p className="text-neutral-600 mb-8">
          {t("notFound.description")}
        </p>
        <Button href="/" variant="primary" size="lg">
          <Home className="w-4 h-4 mr-2" />
          {t("notFound.action")}
        </Button>
      </div>
    </div>
  );
}
