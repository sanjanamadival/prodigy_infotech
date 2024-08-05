window.onscroll = function() {changeNavbarColor()};

function changeNavbarColor() {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = "#111";
    } else {
        navbar.style.backgroundColor = "#333";
    }
}