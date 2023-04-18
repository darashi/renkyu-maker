import format from "date-fns/format/index.js";
import ja from "date-fns/locale/ja/index.js";

type Props = {
  date: Date;
};

export default function Day({ date }: Props) {
  return <span>{format(date, "M/d(E)", { locale: ja })}</span>;
}
