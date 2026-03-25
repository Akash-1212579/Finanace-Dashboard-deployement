import { cn } from "@/lib/utils";

export function StepProgress({ currentStep }) {
  const steps = ["Select File", "Upload File", "Complete"];
  const progress = currentStep>=3 ? "100" :((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center justify-between">
        {/* Base track */}
        <div className="absolute left-0 right-0 top-1/3 h-1.5 -translate-y-1/2 rounded-full bg-gray-200" />

        {/* Active progress */}
        <div
          className="absolute left-0 top-1/3 h-1.5 -translate-y-1/2 rounded-full 
                     bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]
                     transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />

        {steps.map((label, index) => {
          const step = index + 1;
          const isCompleted = step < currentStep;
          const isActive = step === currentStep;

          return (
            <div
              key={label}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className={cn(
                  "flex items-center justify-center rounded-full border-2 font-semibold",                "w-9 h-9 sm:w-11 sm:h-11 transition-all duration-300",
                  isCompleted &&
                    "bg-emerald-500 border-emerald-500 text-white scale-105",
                  isActive &&
                    "bg-white border-emerald-500 text-emerald-600                      ring-4 ring-emerald-100",
                  !isCompleted &&
                    !isActive &&
                    "bg-white border-gray-300 text-gray-500"
                )}
              >
                {isCompleted ? "✓" : step}
              </div>

              <span
                className={cn(
                  "mt-2 text-xs sm:text-sm text-center transition-colors",
                  isActive
                    ? "text-emerald-600 font-medium"
                    : "text-gray-500"
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
