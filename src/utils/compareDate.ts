export default function compareDate(date: string) {
  const currentTime = new Date();
  const dateToCompare = new Date(date);
  dateToCompare.setHours(dateToCompare.getHours() + 3);

  return dateToCompare > currentTime;
}
