import { z } from "zod";

export type FormFieldType = "text" | "email" | "tel" | "textarea" | "select";

export type FormField = {
  id: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
};

/** LogiKal brochure demo form — field ids match Excel column keys. */
export const formFields: FormField[] = [
  { id: "firstName", label: "First name", type: "text", placeholder: "Aarav", required: true },
  { id: "lastName", label: "Last name", type: "text", placeholder: "Sharma", required: true },
  {
    id: "email",
    label: "Work email",
    type: "email",
    placeholder: "aarav@company.com",
    required: true,
  },
  {
    id: "company",
    label: "Company",
    type: "text",
    placeholder: "Acme Chemicals",
    required: true,
  },
  {
    id: "jobTitle",
    label: "Job title",
    type: "text",
    placeholder: "Head of Supply Chain",
  },
  { id: "phone", label: "Phone number", type: "tel", placeholder: "+91 98765 43210" },
  {
    id: "interest",
    label: "I'm interested in",
    type: "select",
    options: [
      { value: "product-demo", label: "Product demo" },
      { value: "pricing-plans", label: "Pricing & plans" },
      { value: "technical-integration", label: "Technical integration" },
      { value: "partnership", label: "Partnership" },
      { value: "general-enquiry", label: "General enquiry" },
    ],
  },
  {
    id: "message",
    label: "Tell us about your challenge",
    type: "textarea",
    placeholder: "Briefly describe your supply chain pain points…",
  },
];

function buildFormSchema() {
  const shape: Record<string, z.ZodTypeAny> = {
    _honeypot: z
      .string()
      .optional()
      .refine((v) => v == null || v.length === 0, { message: "Invalid submission" }),
  };

  for (const f of formFields) {
    if (f.type === "select" && f.options?.length) {
      const en = f.options.map((o) => o.value) as [string, ...string[]];
      shape[f.id] = f.required
        ? z.enum(en, { errorMap: () => ({ message: "Please choose an option" }) })
        : z.union([z.literal(""), z.enum(en)]);
      continue;
    }
    if (f.type === "email") {
      shape[f.id] = f.required
        ? z.string().min(1, "Required").email("Invalid email")
        : z.union([z.literal(""), z.string().email("Invalid email")]);
      continue;
    }
    if (f.type === "textarea") {
      shape[f.id] = f.required
        ? z.string().min(1, "Required").max(8000, "Too long")
        : z.string().max(8000, "Too long");
      continue;
    }
    if (f.type === "tel") {
      shape[f.id] = f.required
        ? z.string().min(1, "Required").regex(/^[\d\s+().-]+$/, "Invalid phone")
        : z.string().regex(/^[\d\s+().-]*$/, "Invalid phone");
      continue;
    }
    shape[f.id] = f.required
      ? z.string().min(1, "Required").max(2000)
      : z.string().max(2000);
  }
  return z.object(shape);
}

export const formValuesSchema = buildFormSchema();

export type FormValues = z.infer<typeof formValuesSchema>;
