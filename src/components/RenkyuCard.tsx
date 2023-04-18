import type { Renkyu } from "../../lib/renkyu";
import Chart from "./Chart";
import DaySpan from "./DaySpan";

type Props = {
  renkyu: Renkyu;
  currentDate: Date;
};

export default function RenkyuCard({ renkyu, currentDate }: Props) {
  const past = currentDate > renkyu.to;
  return (
    <div
      className={
        "mx-3 my-5 card shadow-xl p-3 bg-base-100" + (past ? " opacity-50" : "")
      }
    >
      <div>
        <DaySpan from={renkyu.offFrom} to={renkyu.offTo} /> の
        <strong>{renkyu.numOffDaysToBeTaken}日間</strong> を休むと
      </div>
      <div className="text-right">
        <DaySpan from={renkyu.from} to={renkyu.to} /> の
        <strong>{renkyu.completedConsecutiveHolidays.length}連休</strong>
      </div>
      <Chart renkyu={renkyu} />
    </div>
  );
}
