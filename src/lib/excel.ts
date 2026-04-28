import ExcelJS from "exceljs";
import { formFields } from "@/config/form.config";
import { displayValueForField } from "@/lib/fieldDisplay";
import type { StoredSubmission } from "@/lib/submission";

const fieldIds = formFields.map((f) => f.id);

function fieldLabelById(id: string) {
  return formFields.find((f) => f.id === id)?.label ?? id;
}

export async function buildSubmissionsWorkbook(
  rows: StoredSubmission[]
): Promise<Uint8Array> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "logikal-form";
  wb.created = new Date();
  const sheet = wb.addWorksheet("Submissions", {
    properties: { defaultColWidth: 22 },
  });

  const headers = [
    "Submitted (UTC)",
    "Record ID",
    ...fieldIds.map((id) => fieldLabelById(id)),
  ];
  sheet.addRow(headers);
  sheet.getRow(1).font = { bold: true };

  for (const r of rows) {
    const data = r.data;
    sheet.addRow([
      new Date(r.createdAt),
      r.id,
      ...fieldIds.map((id) => displayValueForField(id, data[id])),
    ]);
  }
  if (rows.length > 0) {
    sheet.getColumn(1).numFmt = "yyyy-mm-dd hh:mm";
  }

  const raw = await wb.xlsx.writeBuffer();
  if (raw instanceof Uint8Array) return new Uint8Array(raw);
  if (raw instanceof ArrayBuffer) return new Uint8Array(raw);
  return Uint8Array.from(raw as ArrayLike<number>);
}
