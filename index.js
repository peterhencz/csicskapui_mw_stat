"use strict";
const API = require("call-of-duty-api");
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
const body = document.body;

const main = document.createElement("div");
main.classList.add("main");
body.appendChild(main);

const trog = [
  "TROG-sinka_sonka",
  "TROG-Peetunia",
  "TROG-kiralymarci",
  "PureDani84",
  "bandaniel85",
  "ZagiPeti",
];

trog.forEach(name =>
  API.MWstats(name, API.platforms.psn)
    .then(output => {
      const properties = output.lifetime.all.properties;
      console.log(output);
      createMainCards(
        output.username,
        properties.suicides,
        properties.timePlayedTotal,
        properties.kdRatio
      );
    })
    .catch(err => {
      console.log(err);
    })
);

const createMainCards = (nameIP, suicideStat, totalTime, kDStat) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const names = document.createElement("h4");
  names.innerHTML = nameIP;
  card.appendChild(names);

  const suicides = document.createElement("h5");
  suicides.innerHTML = suicideStat;
  card.appendChild(suicides);

  const allTime = document.createElement("h5");
  allTime.innerHTML = moment
    .duration(totalTime, "seconds")
    .format("h [h] m [m] s [s]");
  card.appendChild(allTime);

  const kD = document.createElement("h5");
  kD.innerHTML = kDStat;
  card.appendChild(kD);

  main.appendChild(card);
};

console.log("cica");
