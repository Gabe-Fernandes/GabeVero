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
    $(".qa-wrap").css("opacity", "0%"); $(".always-show").css("opacity", "100%");
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

    slideshowWrap.children(".slideshow-left:first").on("click", ()=> {
        let currentPage = parseInt(slideshowWrap.attr("data-page"));
        if (currentPage > 1) {
        $(`#${namespace}Slideshow${currentPage}`).addClass("slideshow-shrink");
        currentPage--;
        slideshowWrap.attr("data-page", currentPage);
        $(`#${namespace}Slideshow${currentPage}`).removeClass("slideshow-shrink");
        }
    });
    slideshowWrap.children(".slideshow-right:first").on("click", ()=> {
        let currentPage = parseInt(slideshowWrap.attr("data-page"));
        if (currentPage < lastPage) {
        $(`#${namespace}Slideshow${currentPage}`).addClass("slideshow-shrink");
        currentPage++;
        slideshowWrap.attr("data-page", currentPage);
        $(`#${namespace}Slideshow${currentPage}`).removeClass("slideshow-shrink");
        }
    });
    slideshowWrap.children(".slideshow-btn").on("click", ()=> {
        let currentPage = parseInt(slideshowWrap.attr("data-page"));
        $(`#${namespace}SlideshowCounter`).html(`Showing (${currentPage} of ${lastPage})`);
    });

    // init counter
    $(`#${namespace}SlideshowCounter`).html(`Showing (1 of ${lastPage})`);
}
createSlideShow("test");
