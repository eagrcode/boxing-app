import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default function formatGraphLabels(label: string) {
  const date = parseISO(label);
  const formattedMonth: string = format(date, "MMM");

  return formattedMonth;
}
