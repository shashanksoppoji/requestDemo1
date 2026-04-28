import { formFields } from "@/config/form.config";

export function displayValueForField(fieldId: string, raw: string | undefined) {
  if (raw == null || raw === "") return "";
  const f = formFields.find((x) => x.id === fieldId);
  if (f?.type === "select" && f.options) {
    return f.options.find((o) => o.value === raw)?.label ?? raw;
  }
  return String(raw);
}
