import { useLayoutEffect, useRef, useState } from "react";

export type PickerType = "week" | "month" | "year";

const OPTIONS: { value: PickerType; label: string }[] = [
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

interface TypeOfDatePickerProps {
  value: PickerType;
  onChange: (type: PickerType) => void;
}

function TypeOfDatePicker({ value, onChange }: TypeOfDatePickerProps) {
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const itemRefs = useRef<Partial<Record<PickerType, HTMLButtonElement | null>>>({});

  useLayoutEffect(() => {
    const update = () => {
      const el = itemRefs.current[value];
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [value]);

  return (
    <div
      role="tablist"
      className="relative isolate flex items-center justify-center gap-8 px-4 py-2 text-[2rem]"
    >
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-0 -z-10 transition-[transform,width] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
        style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
      />

      {OPTIONS.map(({ value: optValue, label }) => {
        const isActive = value === optValue;
        return (
          <button
            key={optValue}
            ref={(el) => {
              itemRefs.current[optValue] = el;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(optValue)}
            className={`relative cursor-pointer border-none bg-transparent px-5 py-4 transition-[color,opacity] duration-[250ms] ease-in hover:text-second-accent-hover hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-second-accent motion-reduce:transition-none ${
              isActive ? "text-second-accent opacity-100" : ""
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default TypeOfDatePicker;