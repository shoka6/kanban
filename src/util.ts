export const todayValue = () => {
  const today = new Date();
  today.setDate(today.getDate());
  const yyyy = today.getFullYear();
  const mm = `0${today.getMonth() + 1}`.slice(-2);
  const dd = `0${today.getDate()}`.slice(-2);
  return `${yyyy}-${mm}-${dd}`;
};

export const calculateRemainingDate = (deadline: string | undefined) => {
  if (deadline === undefined) return "?";
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const milliseconds = deadlineDate.getTime() - today.getTime();
  if (milliseconds < 0) return 0;
  const hours = Math.floor(milliseconds / 1000 / 60 / 60);
  return Math.floor(hours / 24);
};
