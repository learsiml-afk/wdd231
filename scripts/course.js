const courses = [
  { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 3, completed: true },
  { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 1, completed: true },
  { subject: "CSE", number: 111, title: "Programming with Functions", credits: 3, completed: true },
  { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 1, completed: true },
  { subject: "CSE", number: 210, title: "Programming with Classes", credits: 3, completed: false },
  { subject: "WDD", number: 231, title: "Web Frontend Development I", credits: 2, completed: false },
];

const courseList = document.getElementById("courseList");
const totalCreditsSpan = document.getElementById("totalCredits");
const filterButtons = document.querySelectorAll(".filter-btn");

function displayCourses(filter) {
  let coursesToShow = [];
  for (let i = 0; i < courses.length; i++) {
    if (filter === "All" || courses[i].subject === filter) {
      coursesToShow.push(courses[i]);
    }
  }

  let html = "";
  for (let i = 0; i < coursesToShow.length; i++) {
    const course = coursesToShow[i];
    const completedClass = course.completed ? "completed" : "";

    html += `
      <div class="course-card ${completedClass}">
        <span class="course-id">${course.subject} ${course.number}</span>
        <span class="course-title">${course.title}</span>
        <span class="course-credits">${course.credits} cr</span>
      </div>
    `;
  }
  courseList.innerHTML = html;

  const totalCredits = coursesToShow.reduce(function (sum, course) {
    return sum + course.credits;
  }, 0);

  totalCreditsSpan.textContent = totalCredits;
}

for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    for (let j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove("active");
    }
    this.classList.add("active");
    displayCourses(this.dataset.filter);
  });
}

displayCourses("All");