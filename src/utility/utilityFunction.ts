export const calculateTimeFromSeconds = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  let secondsStr: string;

  if (seconds < 10) {
    secondsStr = `0${seconds}`;
  } else secondsStr = `${seconds}`;

  return `${minutes}:${secondsStr}`;
};

export const calculateTimeStringOrder = (time: number): string => {
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60 - hours * 60);
  const seconds = time - hours * 60 * 60 - minutes * 60;

  let secondsStr: string;
  let minutesStr: string;

  if (seconds < 10) {
    secondsStr = `0${seconds}`;
  } else secondsStr = `${seconds}`;

  minutesStr = `${minutes}`;

  if (hours > 0) {
    if (minutes < 10) {
      minutesStr = `0${minutes}`;
    }
  }

  switch (true) {
    case hours > 0:
      return `${hours}hr${minutesStr}min${secondsStr}sec`;

    case minutes > 0:
      return `${minutesStr}min${secondsStr}sec`;

    case seconds > 0:
      return `${secondsStr}sec`;

    default:
      return `${time}sec`;
  }
};
