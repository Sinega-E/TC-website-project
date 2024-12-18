const hamLinks = document.getElementsByClassName("ham-menu-link");
const menu = document.getElementById("menu");
const menuButtonIconOpen = document.querySelector(".menu-burger-open");
const menuButtonIconClose = document.querySelector(".menu-burger-close");



const childSliders = document.querySelectorAll(".child-slide");
const dotContainer = document.querySelector(".dots");
// ------------------------------------Toggle the side menu------------------------------------
document.getElementById("menu-open-btn").addEventListener("click", function () {
  menu.classList.add("open");
  if(menu.classList.contains("open")){
    menuButtonIconOpen.style.display="block"
  }
});

document.getElementById("menu-close-btn").addEventListener("click",function(){
  menu.classList.remove("open");
  menuButtonIconOpen.style.display = "block"; 
});

// Iterate through all "ham-menu-link" elements and add the event listener
Array.from(hamLinks).forEach(link => {
  link.addEventListener("click", function () {
    menu.classList.remove("open"); 
    menuButtonIconOpen.style.display = "block"; 
    menuButtonIconClose.style.display = "block";
  });
});


// ---------------------------------------Sliders------------------------------------------------------
const slider = function () {
  let curSlide = 0;
  const maxSlide = childSliders.length;

  // Initialize slides
  childSliders.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * i}%)`)
  );

  // Create dots dynamically
  const createDots = function () {
    childSliders.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // Activate the current dot
  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  // Move to the selected slide
  const goToSlide = function (slide) {
    childSliders.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Move to the next slide
  const nextSlide = function () {
    curSlide = curSlide === maxSlide - 1 ? 0 : curSlide + 1;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Move to the previous slide
  const prevSlide = function () {
    curSlide = curSlide === 0 ? maxSlide - 1 : curSlide - 1;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Initialize slider
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  setInterval(() => nextSlide(), 8000);
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(Number(slide));
      activateDot(Number(slide));
    }
  });
};
slider();

//  -----------------------course category retaining css styles after clicking ---------------------------------------

document.querySelectorAll(".category").forEach((item) => {
  item.addEventListener("click", function () {
    document
      .querySelectorAll(".category")
      .forEach((sub) => sub.classList.remove("active"));
    this.classList.add("active");
  });
});

// course category scroll

document.getElementById("scroll-left").addEventListener("click", function () {
  document.querySelector(".course-categories").scrollBy({
    left: -200,
    behavior: "smooth",
  });
});

document.getElementById("scroll-right").addEventListener("click", function () {
  document.querySelector(".course-categories").scrollBy({
    left: 200,
    behavior: "smooth",
  });
});

// course sub category retaining css styles after clicking

document.querySelectorAll(".sub-category").forEach((item) => {
  item.addEventListener("click", function () {
    document
      .querySelectorAll(".sub-category")
      .forEach((sub) => sub.classList.remove("active"));
    this.classList.add("active");
  });
});
// registration dropdown checkbox

function filterCourses() {
  const searchInput = document.getElementById('courseSearch').value.toLowerCase();
  const courseLabels = document.querySelectorAll('.dropdown-content label');
  
  courseLabels.forEach(function(label) {
    const courseName = label.textContent || label.innerText;
    if (courseName.toLowerCase().indexOf(searchInput) > -1) {
      label.style.display = '';
    } else {
      label.style.display = 'none';
    }
  });
}

document.querySelector('.dropdown-button').addEventListener('click', function () {
  const dropdownContent = document.querySelector('.dropdown-content');
  dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});

// Close the dropdown if the user clicks outside
window.addEventListener('click', function (event) {
  if (!event.target.matches('.dropdown-button')) {
    const dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(function (dropdown) {
      dropdown.style.display = 'none';
    });
  }
});
