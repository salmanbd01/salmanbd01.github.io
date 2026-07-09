const text = [
  "Student",
  "Learner",
  "Dreamer",
  "Future Doctor"
];

let i = 0;
let j = 0;
let current = "";
let isDeleting = false;

function type() {
  const element = document.getElementById("typing");

  if (!element) return;

  if (!isDeleting) {
    current = text[i].substring(0, j++);
  } else {
    current = text[i].substring(0, j--);
  }

  element.textContent = current;

  if (!isDeleting && j === text[i].length + 1) {
    isDeleting = true;
    setTimeout(type, 1200);
    return;
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % text.length;
  }

  setTimeout(type, isDeleting ? 60 : 120);
}

type();
