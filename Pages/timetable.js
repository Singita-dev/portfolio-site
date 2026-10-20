var form = document.getElementById("scheduleForm");
var table = document.getElementById("Timetable");
var tbody = table.getElementsByTagName("tbody")[0];

var firstTime = true;

form.addEventListener("submit", function(event) {
  event.preventDefault();

  var day = document.getElementById("dayInput").value;
  var time = document.getElementById("timeInput").value;
  var moduleName = document.getElementById("ModuleInput").value;

  // Remove your 6 empty rows on first add
  if (firstTime) {
    tbody.innerHTML = "";
    firstTime = false;
  }

  // Create new row - allows any module, any number
  var newRow = tbody.insertRow();

  var cellDay = newRow.insertCell(0);
  var cellTime = newRow.insertCell(1);
  var cellModule = newRow.insertCell(2);
  var cellAction = newRow.insertCell(3);

  cellDay.innerText = day;
  cellTime.innerText = time;
  cellModule.innerText = moduleName;

  // Delete button - ONLY your 4 colors
  cellAction.innerHTML = "<button class='btn-delete' onclick='deleteRow(this)'>Delete</button>";

  // Clear form
  form.reset();
});

function deleteRow(button) {
  var row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);

  // If no rows left, add back empty message
  if (tbody.rows.length == 0) {
    firstTime = true;
    tbody.innerHTML = "<tr><td> </td><td> </td><td> </td><td> </td></tr>";
  }
}Add this to your TIMETABLE.css so Delete button uses your colors:css.btn-delete {
  background: #ff8c00;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 6px 15px;
  font-weight: bold;
  cursor: pointer;
}
.btn-delete:hover {
  background: #c9ebff;
  color: #0a1930;
}