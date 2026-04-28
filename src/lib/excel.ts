import ExcelJS from "exceljs";
import { formFields } from "@/config/form.config";
import type { StoredSubmission } from "@/lib/kv";

const fieldIds = formFields.map((f) => f.id);

function fieldLabelById(id: string) {
  return formFields.find((f) => f.id === id)?.label ?? id;
}

function cellDisplayValue(fieldId: string, raw: string | undefined) {
  if (raw == null || raw === "") return "";
  const f = formFields.find((x) => x.id === fieldId);
  if (f?.type === "select" && f.options) {
    return f.options.find((o) => o.value === raw)?.label ?? raw;
  }
  return String(raw);
}

export async function buildSubmissionsWorkbook(
  rows: StoredSubmission[]
): Promise<Buffer> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "vercel-form-excel";
  wb.created = new Date();
  const sheet = wb.addWorksheet("Submissions", {
    properties: { defaultColWidth: 24 },
  });

  const headers = [
    "Submitted (UTC)",
    "Record ID",
    ...fieldIds.map((id) => fieldLabelById(id)),
  ];
  sheet.addRow(headers);
  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.alignment = { vertical: "middle" };
  for (const r of rows) {
    const data = r.data;
    const cells: (string | number | Date)[] = [
      new Date(r.createdAt),
      r.id,
      ...fieldIds.map((id) => cellDisplayValue(id, data[id])),
    ];
    sheet.addRow(cells);
  }
  if (rows.length > 0) {
    sheet.getColumn(1).numFmt = "yyyy-mm-dd hh:mm";
  }

  const buffer = (await wb.xlsx.writeBuffer()) as Buffer;
  return buffer;
}
