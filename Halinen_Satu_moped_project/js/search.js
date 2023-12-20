"use strict";

(function () {
  let keylist;
  let resultarea;
  let searchvalue;

  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    keylist = document.getElementById("keylist");
    resultarea = document.getElementById("resultarea");
    searchvalue = document.getElementById("searchvalue");

    try {
      const data = await fetch("/keys");
      if (data.ok) {
        const keys = await data.json();
        if (keys.length > 0) {
          populateList(keys);
        } else {
          showErrorMessage("failed communication!");
        }
      } else {
        showErrorMessage("failed communication");
      }
    } catch (err) {
      showErrorMessage(err.message);
    }
  }

  function populateList(keynames) {
    for (const field of keynames) {
      const option = document.createElement("option");
      option.value = field;
      option.textContent = field;
      keylist.appendChild(option);
    }

    keylist.value = keynames[0];
    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    const keyName = keylist.value;
    const value = searchvalue.value;

    try {
      const fetchOptions = {
        method: "POST",
        body: JSON.stringify({ value, key: keyName }),
        headers: { "Content-Type": "application/json" },
      };
      const data = await fetch("/search", fetchOptions);
      const result = await data.json();

      updatePage(result);
    } catch (err) {
      showErrorMessage(err.message);
    }
  }

  function updatePage(data) {
    if (!data) {
      showErrorMessage("Programming error!");
    } else if (data.length === 0) {
      showErrorMessage("Nothing found");
    } else {
      const htmlString = data.map((item) => createMoped(item)).join("");
      resultarea.innerHTML = htmlString;
    }
  }

  function createMoped(moped) {
    return `<div class="moped">
    <p>mopedId: ${moped.mopedId}</p>
    <p>name: ${moped.name}</p>
    <p>modelYear: ${moped.modelYear}</p>
    <p>topspeed: ${moped.topspeed}</p>
    <p>itemsInStock: ${moped.itemsInStock}</p>
    <div>`;
  }
  function showErrorMessage(message) {
    resultarea.innerHTML = `<p>${message}</p>`;
  }
})();
