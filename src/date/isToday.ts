export default (date: Date): boolean => {
  const today = new Date(Date.now());
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};
