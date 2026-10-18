import { useLayoutEffect, useRef, useState } from "react";
import "./TypeOfDatePicker.css";

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
    <div className="type-picker" role="tablist">
      <span
        className="type-picker__indicator"
        style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
        aria-hidden="true"
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
            className={`type-picker__type ${isActive ? "type-picker__type--active" : ""}`}
            onClick={() => onChange(optValue)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default TypeOfDatePicker;