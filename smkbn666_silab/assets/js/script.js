const loan = {
  name: "",
  group: "",
  phone: "",
  date_start: null,
  date_end: null,
  laptopIds: [],
};

function resetForm() {
  document.querySelector("#name").value = "";
  document.querySelector("#group").value = "umum";
  document.querySelector("#phone").value = "";
  for (let checkbox of checkboxes) {
    checkbox.checked = false;
  }

  loan.name = "";
  loan.group = "";
  loan.phone = "";
  loan.date_start = null;
  loan.date_end = null;
  loan.laptopIds = [];

  setFormValue();
}

function setFormValue() {
  loan.name = document.querySelector("#name").value;
  let groupSelect = document.querySelector("#group");
  loan.group = groupSelect.options[groupSelect.selectedIndex].text;
  loan.phone = document.querySelector("#phone").value;

  let today = new Date();
  let date =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);
  let time =
    String(today.getHours()).padStart(2, "0") +
    ":" +
    String(today.getMinutes()).padStart(2, "0") +
    ":" +
    String(today.getSeconds()).padStart(2, "0");
  let dateTime = date + " " + time;
  loan.date_start = dateTime;
  checkForm();
}

function getCurrentDate() {
  let today = new Date();
  let date =
    ("0" + today.getDate()).slice(-2) +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    today.getFullYear();
  return date;
}

document.querySelector("#buttonPinjam").disabled = true;

for (let checkbox of checkboxes) {
  if (checkbox.checked) {
    checkLaptop(checkbox.value);
  }

  checkbox.addEventListener("click", function (event) {
    // mendapatkan objek elemen yang diklik
    const target = event.target;

    checkLaptop(target.value);
    checkForm();
  });
}

function checkLaptop(laptopId) {
  if (loan.laptopIds.includes(laptopId)) {
    loan.laptopIds.splice(loan.laptopIds.indexOf(laptopId), 1);
    // variabel dari storage.js
  } else {
    loan.laptopIds.push(laptopId);
  }
}

function checkForm() {
  if (
    loan.name == "" ||
    loan.group == "" ||
    loan.phone == "" ||
    loan.laptopIds.length < 1
  ) {
    document.querySelector("#buttonPinjam").disabled = true;
  } else {
    document.querySelector("#buttonPinjam").disabled = false;
  }
}

function submitLoan() {
  putHistory(loan);
  resetForm();
  renderHistory();
}

document.querySelector("#currentDate").innerHTML =
  "(Tanggal: " + getCurrentDate() + ")";

function myFunction() {
  var x = document.getElementById("links");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
