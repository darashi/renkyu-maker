import type { Renkyu } from "../../lib/renkyu";
import { FaHeart } from "react-icons/fa/index.js";

const char = "♥";

type Props = {
  renkyu: Renkyu;
};

function Hearts({ num }: { num: number }) {
  const hearts = [];
  for (let i = 0; i < num; i++) {
    hearts.push(<FaHeart className="inline mx-0.5" size={16} />);
  }
  return <>{hearts}</>;
}

export default function Chart({ renkyu }: Props) {
  return (
    <div className="text-center text-xl">
      <span className="text-heart">
        <Hearts num={renkyu.prevHolidays.length} />
      </span>
      <span className="text-heart-dark">
        <Hearts num={renkyu.daysOffToBeTaken.length} />
      </span>
      <span className="text-heart">
        <Hearts num={renkyu.nextHolidays.length} />
      </span>
    </div>
  );
}
