
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');  // Show/Hide menu
});


const sections = document.querySelectorAll("section");
const navLinksItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120; 
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinksItems.forEach(link => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active-link");
    }
  });
});


// Open Modal
function openModal(modalId) {
  document.getElementById(modalId).style.display = "flex";
}

// Close Modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Switch between Login/Register
function switchModal(closeId, openId) {
  closeModal(closeId);
  openModal(openId);
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};



  
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};


const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();



  document.querySelector("#registerModal .auth-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target[1].value;
  const password = e.target[2].value;

  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    alert("Registration successful! 🎉");
    closeModal("registerModal");
  } catch (error) {
    alert(error.message);
  }
});

document.querySelector("#loginModal .auth-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;

  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    alert(`Welcome back, ${userCredential.user.email}!`);
    closeModal("loginModal");
  } catch (error) {
    alert(error.message);
  }
});


firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log("Logged in as:", user.email);
    document.querySelector(".btn-secondary").innerText = "Logout";
    document.querySelector(".btn-secondary").onclick = () => firebase.auth().signOut();
  } else {
    console.log("Not logged in");
    document.querySelector(".btn-secondary").innerText = "Login / Register";
    document.querySelector(".btn-secondary").onclick = () => openModal("loginModal");
  }
});




// search bar

// function handleSearch() {
//   const query = document.getElementById("searchInput").value.toLowerCase();

//   if (!query) return alert("Please type something to search!");

  
//   const sections = ["home", "courses", "leaderboard", "certificates", "contact"];
//   const match = sections.find(section => section.includes(query));

//   if (match) {
    
//     document.getElementById(match.charAt(0).toUpperCase() + match.slice(1)).scrollIntoView({ behavior: "smooth" });
//   } else {
   
//     window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
//   }
// }

// document.getElementById("searchInput").addEventListener("keypress", function (e) {
//   if (e.key === "Enter") {
//     handleSearch();
//   }
// });

function handleSearch() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();

  if (!query) return alert("Please type something to search!");

  // Map search keywords to course IDs
  const courseMap = {
    python: 1,
    javascript: 2,
    "html": 3,
    "css": 3,
    "html & css": 3
  };

  let matchedCourse = null;

  for (let key in courseMap) {
    if (query.includes(key)) {
      matchedCourse = courseMap[key];
      break;
    }
  }

  if (matchedCourse) {
    showCourse(matchedCourse); // Show the matched course
    // Scroll to the courses section
    document.getElementById("Courses").scrollIntoView({ behavior: "smooth" });
  } else {
    alert("No course found matching your search!");
  }
}

document.getElementById("searchInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    handleSearch();
  }
});


const totalModules = { course1: 2, course2: 1, course3: 1 };
const currentModule = { course1: 1, course2: 1, course3: 1 };


function showModule(courseId) {
  const total = totalModules[courseId];
  const current = currentModule[courseId];
  for (let i = 1; i <= total; i++) {
    document.getElementById(courseId + '-module' + i).style.display = (i === current) ? 'block' : 'none';
  }
}


function showCourse(courseId) {
  document.querySelectorAll('.course').forEach(course => course.style.display = 'none');
  document.getElementById('course' + courseId).style.display = 'block';
  showModule('course' + courseId); // display the current module for that course
}



function nextModule(courseId) {
  if (currentModule[courseId] < totalModules[courseId]) {
    currentModule[courseId]++;
    showModule(courseId);
  }
}

function prevModule(courseId) {
  if (currentModule[courseId] > 1) {
    currentModule[courseId]--;
    showModule(courseId);
  }
}


function checkQuiz(questionName, resultId) {
  const options = document.getElementsByName(questionName);
  let resultText = '';
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      resultText = options[i].value === 'correct' ? 'Correct!' : 'Wrong, try again.';
    }
  }
  document.getElementById(resultId).innerText = resultText;
}

// Initialize first course
showCourse(1);



// function showModule(courseId) {
//   const total = totalModules[courseId];
//   const current = currentModule[courseId];

//   for (let i = 1; i <= total; i++) {
//     const moduleEl = document.getElementById(courseId + '-module' + i);
//     if (moduleEl) {
//       moduleEl.style.display = (i === current) ? 'block' : 'none';
//     }
//   }
// }





for (let courseId in currentModule) { 
  showModule(courseId);
}

 
// Initialize first course and modules
showCourse(1);

for (let courseId in currentModule) {
  showModule(courseId);
}




function nextModule(courseId) {
  if (currentModule[courseId] < totalModules[courseId]) {
    currentModule[courseId]++;
    showModule(courseId);
  } else {
    alert("You are on the last module!");
  }
}

function prevModule(courseId) {
  if (currentModule[courseId] > 1) {
    currentModule[courseId]--;
    showModule(courseId);
  } else {
    alert("You are on the first module!");
  }
}


function nextModule(courseId) {
  if (currentModule[courseId] < totalModules[courseId]) {
    currentModule[courseId]++;
    showModule(courseId);
  } else {
    const nextCourse = {
      course1: 'course2',
      course2: 'course3'
    }[courseId];

    if (nextCourse) {
      currentModule[nextCourse] = 1; // start from first module of next course
      showCourse(parseInt(nextCourse.slice(-1))); // show next course
    } else {
      alert("You completed all modules!");
    }
  }
}


function handleSearch() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const courses = document.querySelectorAll(".course");
  let found = false;

  courses.forEach(course => {
    const title = course.querySelector("h2").innerText.toLowerCase();
    if (title.includes(input)) {
      course.style.display = "block";
      course.scrollIntoView({ behavior: "smooth" });
      found = true;
    } else {
      course.style.display = "none";
    }
  });

  if (!found) {
    alert("No matching course found!");
  }
}

function openModal(modalId) {
  document.getElementById(modalId).style.display = "flex";
  document.body.style.overflow = "hidden"; // disable background scroll
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
  document.body.style.overflow = "auto"; // re-enable scroll
}



// Close modal when clicking outside
window.onclick = function (event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};

function openModal(modalId) {
  document.getElementById(modalId).style.display = "flex";
}

navLinksItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});