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
      const ltProperties = output.lifetime.all.properties;
      const weeklyProperties = output.weekly.all.properties;
      const acc = output.lifetime.accoladeData;

      console.log(output);
      createMainCards(
        output.username,
        output.level,
        weeklyProperties.kdRatio,
        ltProperties.kdRatio,
        ltProperties.bestKD,
        ltProperties.scorePerMinute,
        ltProperties.kills,
        ltProperties.deaths,
        ltProperties.winLossRatio,
        ltProperties.totalShots,
        ltProperties.headshots,
        ltProperties.recordKillStreak,
        ltProperties.suicides,
        ltProperties.gamesPlayed,
        ltProperties.timePlayedTotal
      );
    })
    .catch(err => {
      console.log(err);
    })
);

const createMainCards = (
  nameIP,
  lvlStat,
  weeklykDStat,
  kDStat,
  bestKDStat,
  scorePerMinuteStat,
  kills,
  deaths,
  wlRatioStat,
  totalShotsStat,
  headshotsStat,
  recordKillStreakStat,
  suicideStat,
  gamesPlayedStat,
  totalTime
) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const lvl = document.createElement("h3");
  lvl.innerHTML = "lvl " + lvlStat;
  lvl.classList.add("lvl");
  card.appendChild(lvl);

  const showMore = document.createElement("div");
  showMore.classList.add("show-more-button");
  card.appendChild(showMore);

  const names = document.createElement("h3");
  names.innerHTML = nameIP;
  names.classList.add("name");
  card.appendChild(names);

  card.appendChild(createStatRow("Weekly K/D: ", weeklykDStat.toFixed(2)));

  card.appendChild(createStatRow("Overall K/D: ", kDStat.toFixed(2)));

  card.appendChild(createStatRow("Best K/D: ", bestKDStat));

  card.appendChild(
    createStatRow("Score/minute: ", scorePerMinuteStat.toFixed(2))
  );

  card.appendChild(createStatRow("Kills: ", kills));

  card.appendChild(createStatRow("Deaths: ", deaths));

  card.appendChild(createStatRow("W/L: ", wlRatioStat.toFixed(2)));
  card.appendChild(createStatRow("Total shots: ", totalShotsStat));
  card.appendChild(createStatRow("Headshots: ", headshotsStat));
  card.appendChild(createStatRow("Kill streak: ", recordKillStreakStat));

  card.appendChild(createStatRow("Suicides: ", suicideStat));

  card.appendChild(createStatRow("Games played: ", gamesPlayedStat));
  card.appendChild(
    createStatRow(
      "Total played time: ",
      moment.duration(totalTime, "seconds").format("h[h] m[m] s[s]")
    )
  );

  main.appendChild(card);
};

const createStatRow = (labelName, statNumber) => {
  const row = document.createElement("div");
  row.classList.add("row");

  const label = document.createElement("h5");
  label.classList.add("label");
  label.innerHTML = labelName;
  row.appendChild(label);

  const stat = document.createElement("h4");
  stat.classList.add("stat");
  stat.innerHTML = statNumber;
  row.appendChild(stat);
  return row;
};

console.log("cica");
