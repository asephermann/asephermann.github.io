const CACHE_KEY = "laptop_loan_history";

function checkForStorage() {
  return typeof Storage !== "undefined";
}

function putHistory(data) {
  if (checkForStorage()) {
    let historyData = null;
    if (localStorage.getItem(CACHE_KEY) === null) {
      historyData = [];
    } else {
      historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
    }

    historyData.push(data);

    localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
  }
}

function updateHistory(index) {
  let historyData = showHistory();
  let item = null;
  for (let x = 0; x < historyData.length; x++) {
    if (x == index) {
      item = historyData[x];
    }
  }

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

  item.date_end = dateTime;

  historyData = JSON.stringify(historyData);

  localStorage.setItem(CACHE_KEY, historyData);

  renderHistory();
}

function showHistory() {
  if (checkForStorage()) {
    // return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];

    // hanya ambil per hari ini
    const history = JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    return history.filter((d) => {
      const time = new Date(
        d.date_start.substring(0, 10) + "T" + d.date_start.substring(11, 19)
      );
      time.setHours(0, 0, 0, 0);

      const current_time = new Date();
      current_time.setHours(0, 0, 0, 0);

      console.log(time);
      console.log(current_time);

      return current_time.getTime() == time.getTime();
    });
    // return history;
  } else {
    return [];
  }
}

let i = 0;
const checkboxes = document.querySelectorAll("input[type=checkbox]");

function renderHistory() {
  i = 0;
  let historyData = showHistory();
  let historyList = document.querySelector("#historyList");

  historyList.innerHTML = "";
  for (let history of historyData) {
    let row = document.createElement("tr");
    row.innerHTML = "<th>" + parseInt(i + 1) + "</th>";
    row.innerHTML += "<td>" + history.date_start.substring(11, 16) + "</td>";
    row.innerHTML += "<td>" + history.name + " (" + history.group + ")</td>";
    // ekstrak laptopIds dengan tanda koma
    row.innerHTML += "<td>" + history.laptopIds.join(", ") + "</td>";
    if (history.date_end == null || history.date_end == "") {
      row.innerHTML +=
        "<td><button type='button' onclick='updateHistory(" +
        i +
        ");'>Kembalikan</button></td>";

      for (let laptopId of history.laptopIds) {
        document.querySelector("#laptop" + laptopId).disabled = true;
      }
    } else {
      row.innerHTML +=
        "<td>Kembali: " + history.date_end.substring(11, 16) + "</td>";

      for (let laptopId of history.laptopIds) {
        document.querySelector("#laptop" + laptopId).disabled = false;
      }
    }

    historyList.appendChild(row);
    i++;
  }
}

renderHistory();
