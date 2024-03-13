type TimeSeriesData = {
  date: string;
  entry_count: number;
};

export default function formatSevenDaysData(data: TimeSeriesData[]) {
  const formattedLabels: string[] = [];
  const formattedData: number[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const day = date.getDate();
    const month = date.getMonth() + 1;

    const formattedDate = `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}`;

    const entry = data.find((data) => {
      const entryDate = new Date(data.date);
      return entryDate.getDate() === day && entryDate.getMonth() === date.getMonth();
    });

    formattedLabels.unshift(formattedDate);
    formattedData.unshift(entry?.entry_count || 0);
  }

  return { formattedLabels, formattedData };
}
