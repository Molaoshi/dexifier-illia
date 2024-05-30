import type { FlagPropTypes, Language } from "@rango-dev/ui";

import { English } from "@/embedded/ui";

export type LanguageItem = {
  title: string;
  label: string;
  local: Language;
  SVGFlag: React.ComponentType<FlagPropTypes>;
};

export const LANGUAGES: LanguageItem[] = [
  { title: "English", label: "English", local: "en", SVGFlag: English },
];

export const DEFAULT_LANGUAGE = "en";
