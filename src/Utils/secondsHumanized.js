const secondsHumanized = (time) => {
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};

export default secondsHumanized;
