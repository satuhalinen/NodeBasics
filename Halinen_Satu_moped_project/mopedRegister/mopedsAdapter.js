"use strict";

function adapt(item) {
  return Object.assign(item, {
    mopedId: +item.mopedId,
    modelYear: +item.modelYear,
    topspeed: +item.topspeed,
    itemsInStock: +item.itemsInStock,
  });
}

module.exports = { adapt };
