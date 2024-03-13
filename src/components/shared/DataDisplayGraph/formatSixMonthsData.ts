const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type TimeSeriesData = {
  date: string;
  entry_count: number;
};

export default function formatSixMonthsData(data: TimeSeriesData[]) {
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();

  const { formattedLabels, formattedData } = Array.from({ length: 6 }, (_, index) => {
    const targetMonthIndex = (currentMonthIndex - index + 12) % 12;

    const entry = data.find((data) => {
      const entryDate = new Date(data.date);
      const entryMonth = entryDate.getMonth();
      return entryMonth === targetMonthIndex;
    });

    return {
      label: monthNames[targetMonthIndex],
      data: entry?.entry_count || 0,
    };
  })
    .reverse()
    .reduce<{ formattedLabels: string[]; formattedData: number[] }>(
      (acc, { label, data }) => {
        acc.formattedLabels.push(label);
        acc.formattedData.push(data);
        return acc;
      },
      { formattedLabels: [], formattedData: [] }
    );

  return { formattedLabels, formattedData };
}
