import holiday_jp from "@holiday-jp/holiday_jp";
import startOfDay from "date-fns/startOfDay/index.js";
import add from "date-fns/add/index.js";

function isNonBusinessDay(d: Date): boolean {
  return holiday_jp.isHoliday(d) || d.getDay() === 0 || d.getDay() === 6;
}

export class Renkyu {
  prevHolidays: Date[];
  nextHolidays: Date[];
  daysOffToBeTaken: Date[];

  static forYear(year: number) {
    const dateStart = startOfDay(new Date(year, 1 - 1, 1));
    const dateEnd = startOfDay(new Date(year + 1, 1 - 1, 1));

    let d = add(dateStart, { days: -31 }); // Calculate one month in advance to show consecutive holidays that span the year.
    let prev: boolean = isNonBusinessDay(d);
    let chunk: Date[] = [];
    const chunks: Date[][] = [];
    while (d < add(dateEnd, { days: 31 })) {
      // Calculate up to a month later to show holidays that span the year.
      const cur = isNonBusinessDay(d);

      if (prev !== cur) {
        chunks.push(chunk);
        chunk = [];
      }
      chunk.push(d);
      prev = cur;
      d = add(d, { days: 1 });
    }

    const renkyus: Renkyu[] = [];
    for (let i = 0; i < chunks.length; i++) {
      const cur = chunks[i];
      if (cur[0] < dateStart || dateEnd <= cur[0]) continue;
      if (isNonBusinessDay(cur[0])) continue;

      const prev = i > 1 ? chunks[i - 1] : [];
      const next = i < chunks.length - 1 ? chunks[i + 1] : [];
      if (cur.length >= 5) {
        // It's not interesting because it's normal to take five weekdays off and get a series of holidays.
        continue;
      }
      renkyus.push(new Renkyu(prev, cur, next));
    }
    return renkyus;
  }

  constructor(previous: Date[], current: Date[], next: Date[]) {
    this.prevHolidays = previous;
    this.nextHolidays = next;
    this.daysOffToBeTaken = current;
  }

  get completedConsecutiveHolidays(): Date[] {
    return [
      ...this.prevHolidays,
      ...this.daysOffToBeTaken,
      ...this.nextHolidays,
    ];
  }

  get from(): Date {
    return this.completedConsecutiveHolidays[0];
  }

  get to(): Date {
    return this.completedConsecutiveHolidays[
      this.completedConsecutiveHolidays.length - 1
    ];
  }

  get offFrom(): Date {
    return this.daysOffToBeTaken[0];
  }

  get offTo(): Date {
    return this.daysOffToBeTaken[this.daysOffToBeTaken.length - 1];
  }

  get numOffDaysToBeTaken(): number {
    return this.daysOffToBeTaken.length;
  }
}
