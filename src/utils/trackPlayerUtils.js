// Build timestamp
export const timeFormat = time => {
  const date = new Date(time * 1000);
  let hh = date.getUTCHours();
  let mm = date.getUTCMinutes();
  let ss = date.getSeconds();

  // Ensure there are two-digits
  if (hh < 10) hh = `0${hh}`;
  if (mm < 10) mm = `0${mm}`;
  if (ss < 10) ss = `0${ss}`;

  let timeStamp = '';
  if (hh !== 0) {
    // Format HH:MM:SS
    timeStamp = `${hh}:${mm}:${ss}`;
  }
  // Format MM:SS
  timeStamp = `${mm}:${ss}`;

  return timeStamp;
};

let lastTap = 0;
let timerId = 0;
export const handleDoubleTap = (doubleTapCallback, signleTapCallback) => {
  const now = Date.now();
  const DOUBLE_PRESS_DELAY = 300;
  if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
    clearTimeout(timerId);
    doubleTapCallback();
  } else {
    lastTap = now;
    timerId = setTimeout(() => {
      signleTapCallback();
    }, DOUBLE_PRESS_DELAY);
  }
  return null;
};
