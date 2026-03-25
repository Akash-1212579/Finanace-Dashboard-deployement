export default function CsvContainer() {
  const files = [
    {
      name: "Bank of Maharashtra Sample Statement 1",
      desc: "Download a sample CSV matching the Bank of Maharashtra statement format to test uploads and dashboard insights.",
      url: "/finalCsv1.csv",
      download: "BOM_CSV_1.csv",
    },
    {
      name: "Bank of Maharashtra Sample Statement 2",
      desc: "Download a sample CSV matching the Bank of Maharashtra statement format to test uploads and dashboard insights.",
      url: "/finalCsv2.csv",
      download: "BOM_CSV_2.csv",
    },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Sample CSV Files
        </h2>
        <p className="text-sm text-gray-500">
          Download demo statements if you don't have your own Bank Of Maharashtra CSV.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {files.map((file) => (
          <div
            key={file.name}
            className="border rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="space-y-2">
              <h3 className="font-medium">{file.name}</h3>
              <p className="text-sm text-gray-500">{file.desc}</p>
            </div>

            <a
              href={file.url}
              download={file.download}
              className="mt-4 inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50 active:scale-[0.98] transition"
            >
              Download CSV
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}