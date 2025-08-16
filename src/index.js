// Countdown Feature
const currentDate = new Date();
const weddingDate = new Date("2026-08-16");
const daysToGo = Math.round((weddingDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
$("#countDown").html(`${daysToGo} DAYS TO GO!`);

// Navbar Underline
$(".nav-wrap .btn").hover(
    function(event) {
        $(event.target).siblings(".nav-underline").removeClass("hidden");
    },
    function(event) {
        const containerId = $(event.target).attr("data-containerId");
        if ($(`#container${containerId}`).hasClass("hidden")) {
            $(event.target).siblings(".nav-underline").addClass("hidden");
        }
    }
);

// Navigate Between Sections
$(".nav-wrap .btn, .qa-link").on("click", (event) => {
    $(".section-container, .nav-underline").addClass("hidden");
    const containerId = $(event.target).attr("data-containerId");
    $(`#container${containerId}, #navUnderline${containerId}`).removeClass("hidden");
});

// Country Selection Dropdown open/close
$(".selection-header").on("click", ()=> {
    if ($("#countrySelectionArrow").hasClass("open-dropdown")) {
        // close dropdown actions
        $("#countrySelectionArrow").removeClass("open-dropdown");
        $("#countrySelectWrap").addClass("close-dropdown");
    }
    else {
        // open dropdown actions
        $("#countrySelectionArrow").addClass("open-dropdown");
        $("#countrySelectWrap").removeClass("close-dropdown");
    }
});

// Country Dropdown selection event
