// Start with 3 modules but student can add more
var modules = [
  { name: "Your Module 1", progress: 0, tasks: 0 },
  { name: "Your Module 2", progress: 0, tasks: 0 },
  { name: "Your Module 3", progress: 0, tasks: 0 }
];

// Function to add ANY new module - any student, any name
function addNewModule() {
  var input = document.getElementById("newModuleName");
  var moduleName = input.value;

  // Check if empty
  if (moduleName == "") {
    alert("Please enter module name");
    return;
  }

  // Add new module to list
  var newModule = { name: moduleName, progress: 0, tasks: 0 };
  modules.push(newModule);

  // Clear input
  input.value = "";

  // Show all modules again
  showAllModules();
}

// Function when student clicks Complete Task
function userAction(index) {
  // Increase progress by 10% each time
  if (modules[index].progress < 100) {
    modules[index].tasks = modules[index].tasks + 1;
    modules[index].progress = modules[index].tasks * 10;

    if (modules[index].progress > 100) {
      modules[index].progress = 100;
    }

    showAllModules();
  }
}

// Function to display everything
function showAllModules() {
  var statsBody = document.getElementById("statsBody");
  var circleContainer = document.getElementById("circleContainer");

  // Clear old data
  statsBody.innerHTML = "";
  circleContainer.innerHTML = "";

  var totalTasks = 0;
  var totalProgress = 0;

  // Loop through all modules - works for any number
  for (var i = 0; i < modules.length; i++) {
    var currentModule = modules[i];
    totalTasks = totalTasks + currentModule.tasks;
    totalProgress = totalProgress + currentModule.progress;

    var statusText = "In Progress";
    if (currentModule.progress == 100) {
      statusText = "Completed";
    }

    // Add to table
    statsBody.innerHTML = statsBody.innerHTML +
      "<tr>" +
        "<td>" + currentModule.name + "</td>" +
        "<td>" + currentModule.progress + "%</td>" +
        "<td>" + currentModule.tasks + "/10</td>" +
        "<td>" + statusText + "</td>" +
      "</tr>";

    // Add circle - ONLY your 4 colors
    // Orange #ff8c00 for progress, water blue #c9ebff for empty, blue #7ccfff border
    var circleColor = "background: conic-gradient(#ff8c00 " + currentModule.progress + "%, #c9ebff " + currentModule.progress + "% 100%);";

    circleContainer.innerHTML = circleContainer.innerHTML +
      "<div class='module-circle-card'>" +
        "<div class='circle-wheel' style='" + circleColor + "'>" +
          "<span>" + currentModule.progress + "%</span>" +
        "</div>" +
        "<h3>" + currentModule.name + "</h3>" +
        "<button class='btn-action' onclick='userAction(" + i + ")'>Complete Task</button>" +
      "</div>";
  }

  // Update summary
  document.getElementById("totalCompleted").innerText = totalTasks;

  var average = 0;
  if (modules.length > 0) {
    average = Math.round(totalProgress / modules.length);
  }

  document.getElementById("overallProgress").innerText = average + "%";

  var daysLeft = 30 - Math.floor(average / 3);
  if (average == 100) {
    document.getElementById("estimatedTime").innerText = "Done!";
  } else {
    document.getElementById("estimatedTime").innerText = daysLeft + " days";
  }
}

// Run when page loads
showAllModules();

function escapeHtml(t) {
  return String(t).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

// Turn text into fill-in-the-blank questions
function generateQuestions(text) {
  var sentences = text.split(/(?<=[.!?])\s+/);
  var questions = [];
  for (var i = 0; i < sentences.length && questions.length < 10; i++) {
    var s = sentences[i].trim();
    if (s.length < 40 || s.length > 200) continue;
    var words = s.replace(/[^\w\s]/g, "").split(/\s+/);
    var answer = words.reduce(function (a, b) { return b.length > a.length ? b : a; });
    if (answer.length < 6) continue;
    questions.push({ text: s.replace(answer, "_____"), answer: answer.toLowerCase() });
  }
  return questions;
}

function handleUpload(index, file) {
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function () {
    var qs = generateQuestions(reader.result);
    if (qs.length == 0) { alert("Couldn't generate questions from this file"); return; }
    modules[index].questions = qs;
    modules[index].tasks = 0;
    modules[index].progress = 0;
    showAllModules();
  };
  reader.readAsText(file);
}

// Replaces userAction
function answerQuestion(index) {
  var m = modules[index];
  var q = m.questions[m.tasks];
  var input = document.getElementById("answer" + index);
  if (!q) return;
  if (input.value.trim().toLowerCase() == q.answer) {
    m.tasks++;
    m.progress = Math.round(m.tasks / m.questions.length * 100);
  } else {
    alert("Not quite, try again");
    return;
  }
  showAllModules();
}