function processBaseScroll() {
    var t = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    t > 30 ? document.getElementById("header").className = "sticky" : document.getElementById("header").className = ""
}

window.addEventListener("scroll", function() {
    processBaseScroll()
});

function processScroll() {
    for (var t = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop, e = window.innerHeight, i = window.innerWidth, n = document.getElementsByTagName("body")[0].offsetHeight, s = 0; s < slides.length; s++) {
        var o = slides[s],
            r = t + o.getBoundingClientRect().top,
            a = o.clientHeight || o.offsetHeight || o.scrollHeight,
            l = s % 2 ? "45%" : "-45%";
        if (startY = r, stopY = r + a + 50, totalY = stopY - startY, trans = "translate3d(" + l + ",0,0)", i < 660 ? l = "0px" : i < 1e3 && (l = s % 2 ? "-15%" : "15%"), t + e >= startY && t + e <= stopY) {
            var c = (t + e - startY) / totalY,
                h = 140 * (1 - c),
                d = "translate3d(" + l + "," + h + "px,0)";
            o.style.cssText = "-webkit-transform:" + d + ";-moz-transform:" + d + ";transform:" + d + ";"
        }
        if (t >= startY - 100 && t < stopY && s < 3) {
            var u = 240 * ((t - startY + 100) / totalY);
            trans = "translate3d(" + l + "," + u + "px,0)", o.style.cssText = "-webkit-transform:" + trans + ";-moz-transform:" + trans + ";transform:" + trans + ";"
        } else if (t >= startY - 100 && t < stopY && s + 1 == slides.length) {
            var u = 60 * ((t - startY + 100) / totalY);
            trans = "translate3d(" + l + "," + u + "px,0)", o.style.cssText = "-webkit-transform:" + trans + ";-moz-transform:" + trans + ";transform:" + trans + ";"
        } else t + e > stopY && t < startY && (trans = "translate3d(" + l + ",0,0)", o.style.cssText = "-webkit-transform:" + trans + ";-moz-transform:" + trans + ";transform:" + trans + ";")
    }
};

var slides = document.querySelectorAll("#parallax .panel");
"undefined" == typeof window.orientation && slides.length > 0 && (window.addEventListener("scroll", function() {
    processScroll()
}), window.addEventListener("resize", function() {
    processScroll()
}), processScroll());



