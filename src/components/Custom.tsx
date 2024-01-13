import { useState } from "react";

interface Day {
  abbreviation: string;
  label: string;
}

const Custom: React.FC<{ onChange: (selectedDays: string[]) => void }> = ({
  onChange,
}) => {
  const daysList: Day[] = [
    { abbreviation: "S", label: "Sun" },
    { abbreviation: "M", label: "Mon" },
    { abbreviation: "T", label: "Tue" },
    { abbreviation: "W", label: "Wed" },
    { abbreviation: "T", label: "Thu" },
    { abbreviation: "F", label: "Fri" },
    { abbreviation: "S", label: "Sat" },
  ];

  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleDay = (abbreviation: string) => {
    if (selectedDays.includes(abbreviation)) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== abbreviation)
      );
    } else {
      setSelectedDays([...selectedDays, abbreviation]);
    }

    onChange(selectedDays);
  };

  return (
    <div className="flex flex-row space-x-2">
      {daysList.map((day) => (
        <div key={day.label}>
          <div
            className={
              selectedDays.includes(day.label)
                ? "select-none text-primary-foreground bg-primary w-8 text-center items-center text-black flex justify-center h-8 rounded-full"
                : "select-none w-8 text-center items-center text-black flex justify-center h-8 rounded-full bg-blue-100"
            }
            onClick={() => {
              toggleDay(day.label);
            }}
          >
            {day.abbreviation}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Custom;
