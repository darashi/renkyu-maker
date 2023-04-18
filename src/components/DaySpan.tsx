import Day from "./Day";

export interface Props {
  from: Date;
  to: Date;
}

export default function DaySpan({ from, to }: Props) {
  if (from === to) {
    return <Day date={from} />;
  } else {
    return (
      <>
        <Day date={from} /> 〜<Day date={to} />
      </>
    );
  }
}
