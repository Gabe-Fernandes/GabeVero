// Countdown Feature
const currentDate = new Date();
const weddingDate = new Date("2026-08-16");
const daysToGo = Math.round((weddingDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
$("#countDown").html(`${daysToGo} DAYS TO GO!`);

// Navbar Underline
$(".nav-wrap .btn").hover(
    function(event) {
        $(event.target).siblings(".nav-underline").css("opacity", "100%");
    },
    function(event) {
        $(event.target).siblings(".nav-underline").css("opacity", "0%");
    }
);
