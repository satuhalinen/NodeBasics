"use strict";

(function () {
  let mopedIdField;
  let nameField;
  let modelYearField;
  let topspeedField;
  let itemsInStockField;
  let resultarea;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    resultarea = document.getElementById("resultarea");
    mopedIdField = document.getElementById("mopedId");
    nameField = document.getElementById("name");
    modelYearField = document.getElementById("modelYear");
    topspeedField = document.getElementById("topspeed");
    itemsInStockField = document.getElementById("itemsInStock");

    document.getElementById("submit").addEventListener("click", send);

    mopedIdField.addEventListener("focus", clear);
  }

  function clear() {
    mopedIdField.value = "";
    nameField.value = "";
    modelYearField.value = "";
    topspeedField.value = "";
    itemsInStockField.value = "";
    resultarea.textContent = "";
    resultarea.removeAttribute("class");
  }

  async function send() {
    const moped = {
      mopedId: +mopedIdField.value,
      name: nameField.value,
      modelYear: +modelYearField.value,
      topspeed: +topspeedField.value,
      itemsInStock: +itemsInStockField.value,
    };
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(moped),
        headers: { "Content-Type": "application/json" },
      };
      const data = await fetch("/addMoped", options);
      const result = await data.json();

      updateStatus(result);
    } catch (err) {
      updateStatus({ message: err.message, type: "error" });
    }
  }

  function updateStatus(status) {
    resultarea.textContent = status.message;
    resultarea.setAttribute("class", status.type);
  }
})();
