
interface Day {
  abbreviation: string;
  label: string;
}

interface CustomProps {
  onChange: (selectedDays: string[]) => void;
  selectedDays: string[];
}

const Custom: React.FC<CustomProps> = ({ onChange, selectedDays }) => {
  const daysList: Day[] = [
    { abbreviation: "S", label: "Sun" },
    { abbreviation: "M", label: "Mon" },
    { abbreviation: "T", label: "Tue" },
    { abbreviation: "W", label: "Wed" },
    { abbreviation: "T", label: "Thu" },
    { abbreviation: "F", label: "Fri" },
    { abbreviation: "S", label: "Sat" },
  ];

  const toggleDay = (abbreviation: string) => {
    const updatedSelectedDays = selectedDays.includes(abbreviation)
      ? selectedDays.filter((selectedDay) => selectedDay !== abbreviation)
      : [...selectedDays, abbreviation];

    onChange(updatedSelectedDays);
  };

  return (
    <div className="flex dark flex-row space-x-2">
      {daysList.map((day) => (
        <div key={day.label}>
          <div
            className={
              selectedDays.includes(day.label)
                ? "select-none text-lg text-primary-foreground bg-primary w-8 text-center items-center text-black flex justify-center h-8 rounded-full"
                : "select-none text-lg w-8 text-center items-center text-muted flex justify-center h-8 rounded-full bg-muted-foreground"
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
