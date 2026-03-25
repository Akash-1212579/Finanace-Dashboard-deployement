export default function ImportBankStatementSection() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Import Your Bank Statement
        </h2>
        <p className="text-sm text-slate-500">
          Download your statement and convert it to CSV to get started.
        </p>
      </div>

      {/* CONTENT */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* STEP 1 */}
        <div className="rounded-lg border border-slate-200 p-5">
          <h3 className="mb-3 font-medium text-slate-800">
            Bank of Maharashtra – Get Statement
          </h3>

          <ul className="space-y-2 text-sm text-slate-600">
            <li>1. Login to Bank of Maharashtra Net Banking</li>
            <li>
              2. Go to{" "}
              <span className="font-medium">Accounts → Account Statement</span>
            </li>
            <li>3. Select required date range</li>
            <li>4. Download statement as PDF</li>
          </ul>

          <p className="mt-4 text-xs text-slate-500">
            Note: We never ask for your bank credentials.
          </p>
        </div>

        {/* STEP 2 */}
        <div className="rounded-lg border border-slate-200 p-5">
          <h3 className="mb-3 font-medium text-slate-800">
            Convert PDF to CSV
          </h3>

          <p className="mb-4 text-sm text-slate-600">
            Banks provide statements as PDF. Convert it to CSV for analysis.
          </p>

          <a
            href="https://bankconv.com/en/bank-of-maharashtra-bank-statement-converter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg
                       bg-emerald-600 px-4 py-2 text-sm font-medium text-white
                       hover:bg-emerald-700 transition"
          >
            Convert PDF to CSV
          </a>

          <p className="mt-3 text-xs text-slate-500">
            You’ll be redirected to an external trusted tool.
          </p>
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="mt-6 flex justify-end">
        <a
          href="https://wa.me/917066036640"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-emerald-600 px-5 py-2
                     text-sm font-medium text-emerald-600
                     hover:bg-emerald-50 transition"
        >
          Contact Bank of Maharashtra (WhatsApp)
        </a>
      </div>
    </section>
  );
}
