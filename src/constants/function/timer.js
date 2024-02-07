const funcTimer = (show, hidden) => {
  const dateNow = new Date();
  const dateEnd = new Date(
    `${dateNow.getFullYear()}-${
      dateNow.getMonth() + 1
    }-${dateNow.getDate()} 23:59:59`
  );

  let differenceInSec = (dateEnd - dateNow) / 1000;

  const tick = () => {
    differenceInSec -= 1;
    const hours = String(Math.trunc(differenceInSec / 3600)).padStart(2, 0);
    const minutes = String(
      Math.trunc((differenceInSec - hours * 3600) / 60)
    ).padStart(2, 0);
    const seconds = (differenceInSec % 60).toFixed().padStart(2, 0);

    show.current.textContent = `НАСТУПНЕ СЛОВО: ${hours}:${minutes}:${seconds}`;
    if (Math.trunc(differenceInSec) === 0) hidden.current.style.display = "none";
  };

  const timer = setInterval(tick, 1000);

  return timer;
};

const showTimer = (container, timer) => {
  let parameters = container.current.getBoundingClientRect();
  let width = parameters.width;
  let height = parameters.height;
  timer.current.style.width = `${(width * 2) / 3}px`;
  timer.current.style.height = `${(height * 2) / 3}px`;
};

export { funcTimer, showTimer };
