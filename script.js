// script.js
document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector(".video");
  const welcome = document.querySelector(".welcome");

  welcome.addEventListener("click", function () {
    welcome.classList.remove("visible");
    video.play();
  });

  const appliedTimes = {};

  video.addEventListener("timeupdate", function () {
    const changesAtCurrentTime = classChanges.filter(
      change => video.currentTime >= change.time && !appliedTimes[change.time]
    );

    changesAtCurrentTime.forEach(change => {
      const elements = document.querySelectorAll(change.target);

      if (change.remove) {
        const removeClasses = Array.isArray(change.remove) ? change.remove : [change.remove];
        elements.forEach(el => removeClasses.forEach(cls => el.classList.remove(cls)));
      }

      if (change.add) {
        const addClasses = Array.isArray(change.add) ? change.add : [change.add];
        elements.forEach(el => addClasses.forEach(cls => el.classList.add(cls)));
      }

      appliedTimes[change.time] = true;
    });
  });
});

let lastScrollTop = window.scrollY;
let lastTime = performance.now();

window.addEventListener("scroll", () => {
    let now = performance.now();
    let currentScrollTop = window.scrollY;

    let deltaY = Math.abs(currentScrollTop - lastScrollTop);
    let deltaTime = now - lastTime;

    let speed = deltaY / (deltaTime / 1000); // pixels per second

    if (speed > 1000) { // adjust threshold
        document.getElementById("feedback").style.display = "block";
    } else {
        document.getElementById("feedback").style.display = "none";
    }

    lastScrollTop = currentScrollTop;
    lastTime = now;
});

const text = document.getElementById('myText');

window.addEventListener("scroll", () => {
  text.classList.add('blur');

  setTimeout(() => {
    text.classList.remove('blur');
  }, 	3000); // blur stays for 500ms
});

function resetTimer() {
    clearTimeout(timer);
    document.getElementById("attention").style.display = "none";
    timer = setTimeout(() => {
        document.getElementById("attention").style.display = "block";
    }, 5000); // 5 seconds inactivity
}

window.addEventListener("mousemove", resetTimer);
window.addEventListener("scroll", resetTimer);
window.addEventListener("keydown", resetTimer);

// Start the timer when page loads
resetTimer();