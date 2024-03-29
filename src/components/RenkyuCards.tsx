import { useEffect, useState } from "react";
import { Renkyu } from "../../lib/renkyu";
import RenkyCard from "./RenkyuCard";
import startOfDay from "date-fns/startOfDay/index.js";

type Props = {
  year: number;
};

export default function RenkyuCards({ year }: Props) {
  const renkyus = Renkyu.forYear(year);
  renkyus.sort((a, b) => a.numOffDaysToBeTaken - b.numOffDaysToBeTaken);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  useEffect(() => {
    const timer = setInterval(
      () => setCurrentDate(startOfDay(new Date())),
      60 * 60 * 1000
    );
    setCurrentDate(new Date());
    return () => clearInterval(timer);
  });

  return (
    <div>
      <div className="divider text-2xl mt-10">{year}年</div>

      {renkyus.map((renkyu) => (
        <RenkyCard
          key={renkyu.from.toISOString()}
          renkyu={renkyu}
          currentDate={currentDate}
        />
      ))}
    </div>
  );
}
