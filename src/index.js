// Countdown Feature
function weddingCountdown() {
    const currentDate = new Date();
    const weddingDate = new Date("2026-08-16");
    const daysToGo = Math.round((weddingDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    $("#countDown").html(`${daysToGo} DAYS TO GO!`);
}
weddingCountdown();

// Navbar Underline
$(".nav-wrap .btn").hover(
    function(event) {
        $(event.target).siblings(".nav-underline").removeClass("hidden-with-display");
    },
    function(event) {
        const containerId = $(event.target).attr("data-containerId");
        if ($(`#container${containerId}`).hasClass("hidden")) {
            $(event.target).siblings(".nav-underline").addClass("hidden-with-display");
        }
    }
);

// Navigate Between Sections
$(".nav-wrap .btn, .qa-link").on("click", (event) => {
    $(".section-container").addClass("hidden");
    $(".nav-underline").addClass("hidden-with-display");
    const containerId = $(event.target).attr("data-containerId");
    $(`#container${containerId}`).removeClass("hidden");
    $(`#navUnderline${containerId}`).removeClass("hidden-with-display");
    $(".qa-wrap").css("opacity", "0%"); $(".always-show").css("opacity", "100%");
    if (containerId === "4") { $("#nameSearch")[0].focus(); }
});

// Country Selection Dropdown open/close
$(".selection-header").on("click", ()=> {
    if ($("#countrySelectionArrow").hasClass("open-dropdown")) {
        // close dropdown actions
        $("#countrySelectionArrow").removeClass("open-dropdown");
        $("#countrySelectWrap").addClass("close-dropdown");
        $(".country-info").addClass("hidden");
    }
    else {
        // open dropdown actions
        $("#countrySelectionArrow").addClass("open-dropdown");
        $("#countrySelectWrap").removeClass("close-dropdown");
    }
    $("#dropdownHeaderText").html("Select Your Country");
});

// Country Dropdown selection event
$(".country-selection").on("click", (event) => {
    const contentId = $(event.target).attr("data-contentId");
    $("#dropdownHeaderText").html($(event.target).html());
    $("#countrySelectionArrow").removeClass("open-dropdown");
    $("#countrySelectWrap").addClass("close-dropdown");
    $(".country-info").addClass("hidden");
    $(`#countryInfo${contentId}`).removeClass("hidden");
});

// Q & A fade in effect
$(window).scroll( function(){
    // Check the location of each desired element
    $('.qa-wrap').each( function(i){
        const bottomOfObject = $(this).position().top + $(this).outerHeight();
        const bottomOfWindow = $(window).scrollTop() + $(window).height();
        // If the object is completely visible in the window, fade it in
        if( bottomOfWindow > bottomOfObject ){
            $(this).css("opacity", "100%");
        }    
    }); 
});

// RSVP Slideshow
function createSlideShow(namespace) {
    const lastPage = $(`.${namespace}`).length;
    const slideshowWrap = $(`#${namespace}SlideshowWrap`);

    slideshowWrap.find(".slideshow-left").on("click", ()=> {
        let currentPage = parseInt(slideshowWrap.attr("data-page"));
        if (currentPage > 1) {
            $(`#${namespace}Slideshow${currentPage}`).addClass("slideshow-shrink");
            currentPage--;
            slideshowWrap.attr("data-page", currentPage);
            $(`#${namespace}Slideshow${currentPage}`).removeClass("slideshow-shrink");
        }
    });
    slideshowWrap.find(".slideshow-right").on("click", ()=> {
        let currentPage = parseInt(slideshowWrap.attr("data-page"));
        if (currentPage < lastPage) {
            $(`#${namespace}Slideshow${currentPage}`).addClass("slideshow-shrink");
            currentPage++;
            slideshowWrap.attr("data-page", currentPage);
            $(`#${namespace}Slideshow${currentPage}`).removeClass("slideshow-shrink");
        }
    });
}
createSlideShow("rsvp");

// RSVP Name Search
$("#nameSearch").on("input", ()=> {
    const searchText = $("#nameSearch").val().toLowerCase();
    if (searchText === "" || searchText === " ") { $(".rsvp-name,#noResultsMessage").addClass("hide-name"); $(".rsvp-name").attr("tabindex", -1); return; }
    const names = $(".rsvp-name");
    for (let i = 0; i < names.length; i++) {
        if (names.eq(i).html().toLowerCase().includes(searchText)) {
            names.eq(i).removeClass("hide-name");
            names.eq(i).attr("tabindex", 0);
        } else {
            names.eq(i).addClass("hide-name");
            names.eq(i).attr("tabindex", -1);
        }
    }
    if ($(".rsvp-name.hide-name").length === $(".rsvp-name").length) {
        $("#noResultsMessage").html(`No results found for "${searchText}"`);
        $("#noResultsMessage").removeClass("hide-name");
    } else {
        $("#noResultsMessage").addClass("hide-name");
    }
});

// RSVP Pull Up Invitation
function pullUpInvitation(familyName) {
    const familyMembers = $(`.${familyName}`);
    for (let i = 0; i < familyMembers.length; i++) {
        const name = familyMembers.eq(i).html();
        $("#invitationWrap").append(`
            <div class="invitation-name">
                <input type="checkbox">
                <span>${name}</span>
            </div>
        `);
    }
}
$(".rsvp-name").on("click", (event) => {
    pullUpInvitation($(event.target).attr("data-fam"));
});
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 13 && $(":focus").hasClass("rsvp-name")) {
        console.log($(":focus").attr("data-fam"));
        pullUpInvitation($(":focus").attr("data-fam"));
        $(`#rsvpSlideshow1`).addClass("slideshow-shrink");
        $(`#rsvpSlideshow2`).removeClass("slideshow-shrink");
        $(`#rsvpSlideshowWrap`).attr("data-page", 2);
        event.preventDefault();
    }
});

// RSVP Back to Search
$("#backToSearchBtn").on("click", ()=> {
    $("#nameSearch").val("");
    $(".rsvp-name").addClass("hide-name");
    $("#nameSearch")[0].focus();
    $("#invitationWrap").empty();
})
