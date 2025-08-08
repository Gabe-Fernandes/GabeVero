// Font from save the date: "Le Jour Serif"



// Countdown Feature
const currentDate = new Date();
const weddingDate = new Date("2026-08-16");
const daysToGo = Math.round((weddingDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
$("#countDown").html(`${daysToGo} DAYS TO GO!`);
