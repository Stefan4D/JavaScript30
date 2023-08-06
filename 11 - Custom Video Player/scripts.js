// Get elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress-filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const sliders = player.querySelectorAll(".player-slider");
const fullscreen = document.querySelector("#fullscreen");

// Build out functions
function togglePlay() {
  // This is another method of executing the if / else block
  //   const method = video.paused ? "play" : "pause";
  //   video[method]();
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function skip(e) {
  // Wes method uses this.dataset.skip
  video.currentTime += parseFloat(e.target.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  //   console.log(this.value);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = percent + "%";
}

function scrub(e) {
  // Wes answer
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;

  // My answer
  //   const scrubTime = (e.offsetX / progress.offsetWidth) * 100;
  //   progressBar.style.flexBasis = scrubTime + "%";
  //   video.currentTime = video.duration * (scrubTime / 100);
}

// Hook up event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach((skipButton) => skipButton.addEventListener("click", skip));

sliders.forEach((range) => range.addEventListener("change", handleRangeUpdate));

let mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    scrub(e);
  }
});
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));

document.addEventListener("keyup", (e) =>
  e.code === "Space" ? togglePlay() : null
);

fullscreen.addEventListener("click", () => {
  document.fullscreenElement
    ? document.exitFullscreen()
    : player.requestFullscreen();
});
