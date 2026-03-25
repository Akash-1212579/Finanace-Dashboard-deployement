export function UploadInfoSteps() {
  const items = [
    {
      title: "Validation",
      description:
        "Each row is validated for correct format and required fields.",
    },
    {
      title: "Error Handling",
      description:
        "Invalid or duplicate rows are skipped without breaking the upload.",
    },
    {
      title: "Dashboard Update",
      description:
        "Valid transactions instantly appear in your finance dashboard.",
    },
  ];

  return (
    <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-5">
      {items.map((item) => (
        <div
          key={item.title}
          className="
            group rounded-xl border bg-white p-5 text-center
            transition-all duration-300 ease-out
            hover:scale-[1.02] hover:border-emerald-500
          "
        >
          <h3
            className="
              text-sm font-semibold text-gray-700
              transition-colors duration-300
              group-hover:text-emerald-800
            "
          >
            {item.title}
          </h3>

          <p
            className="
              mt-2 text-sm text-gray-500
              transition-colors duration-300
              group-hover:text-emerald-800
            "
          >
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
