import type { Renkyu } from "../../lib/renkyu";

const char = "♥";

type Props = {
  renkyu: Renkyu;
};

export default function Chart({ renkyu }: Props) {
  return (
    <div className="text-center text-xl">
      <span className="text-primary">
        {char.repeat(renkyu.prevHolidays.length)}
      </span>
      <span className="text-primary-focus">
        {char.repeat(renkyu.daysOffToBeTaken.length)}
      </span>
      <span className="text-primary">
        {char.repeat(renkyu.nextHolidays.length)}
      </span>
    </div>
  );
}
