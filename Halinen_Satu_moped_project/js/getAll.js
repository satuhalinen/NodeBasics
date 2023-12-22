"use strict";

(function () {
  document.addEventListener("DOMContentLoaded", init);
  async function init() {
    try {
      const data = await fetch("/all");
      const result = await data.json();

      const resultset = document.getElementById("resultset");

      for (const moped of result) {
        const tr = document.createElement("tr");
        tr.appendChild(createCell(moped.mopedId));
        tr.appendChild(createCell(moped.name));
        tr.appendChild(createCell(moped.modelYear));
        tr.appendChild(createCell(moped.topspeed));
        tr.appendChild(createCell(moped.itemsInStock));
        resultset.appendChild(tr);
      }
    } catch (err) {}
  }
  function createCell(data) {
    const td = document.createElement("td");
    td.textContent = data;
    return td;
  }
})();
