const prisma = require("../config/db.config");
const { parse } = require("csv-parse/sync");

// ------------------------------------------------------------
// Helper: Convert "1,234.56" → 1234.56
// ------------------------------------------------------------
function cleanNumber(value) {
  if (!value || value=="-") return null;
  return parseFloat(String(value).replace(/,/g, ""));
}

// ------------------------------------------------------------
// Helper: Infer payment mode from "channel" column
// ------------------------------------------------------------
function inferPaymentMode(text = "") {
  const p = text.toUpperCase();
  if (p.startsWith("UPI")) return "UPI";
  if (p.includes("NEFT")) return "NEFT";
  if (p.includes("IMPS")) return "IMPS";
  if (p.includes("ATM")) return "ATM";
  if (p.includes("CHEQUE")) return "CHEQUE";
  return "UNKNOWN";
}


function convertIntoISODate(d) {
  if (!d || typeof d !== "string") return null;

  // Expect DD/MM/YYYY
  const parts = d.split("/");
  if (parts.length !== 3) return null;

  const [day, month, year] = parts.map(Number);

  if (
    !Number.isInteger(day) ||
    !Number.isInteger(month) ||
    !Number.isInteger(year)
  ) return null;

  const date = new Date(year, month - 1, day);

  if (
    date.getDate() !== day ||
    date.getMonth() !== month - 1 ||
    date.getFullYear() !== year
  ) return null;

  const dateString = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const localDate = new Date(`${dateString}T00:00:00.000Z`);
  return localDate.toISOString();
}

// ------------------------------------------------------------
// Normalize a SINGLE CSV row → matches Prisma Transaction model
// ------------------------------------------------------------
function normalizeRow(row) {
  const debit = cleanNumber(row.Debit);
  const credit = cleanNumber(row.Credit);

  return {
    amount: debit ?? credit,
    type: debit ? "DEBIT" : "CREDIT",
    description: row.Particulars || null,
    date: convertIntoISODate(row.Date),
    balanceAfterTxn: cleanNumber(row.Balance),
    paymentMode: inferPaymentMode(row.Channel),
    rawData: row
  };
}

// ------------------------------------------------------------
// Parse CSV buffer → Returns array of rows
// ------------------------------------------------------------
function parseCsv(buffer) {
  const csvText = buffer.toString("utf-8");

  return parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    cast: value => value.replace(/"/g, "")
  });
}

// ------------------------------------------------------------
// MAIN FUNCTION — Process CSV Upload
// ------------------------------------------------------------
async function processCSVUpload({ userId,  fileBuffer }) {
 // console.log("csv upload required data is ",userId,accountId);
  if (!fileBuffer) {
    throw new Error("CSV file buffer missing. Check multer setup.");
  }

  // 1) Parse CSV
  const rows = parseCsv(fileBuffer);

  if (!rows.length) {
    throw new Error("CSV file is empty or invalid.");
  }

  const account = await prisma.account.findFirst({
  where: { userId },
  select : {id : true}
});
  console.log(account);
if (!account) {
  throw new Error("Account does not exist for this user");
}
const accountId = account.id;
  // 2) Normalize and prepare for DB insert
  const transactions = rows.map((row) => {
    const parsed = normalizeRow(row);

    return {
      userId,
      accountId,
      categoryId: null,
      ...parsed
    };
  });

  // 3) Insert into DB
  const result = await prisma.transaction.createMany({
    data: transactions
  });

  return {
    success: true,
    totalRows: rows.length,
    inserted: result.count
  };
}

module.exports = {
  processCSVUpload
};
