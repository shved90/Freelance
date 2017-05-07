var visibleArticles = document.getElementsByClassName("show");
var totalArticles = document.getElementsByTagName("article");
var requestedArticle = window.location.hash.substr(1);

var navigation = document.getElementById("nav");
var requesedNav = navigation.querySelectorAll("a[href='#" + requestedArticle + "']")[0];



//load next article once scrolled to bottom 400px
document.addEventListener("scroll", function(event){

    setInterval(function(){
        if ((window.innerHeight + window.scrollY + 400) >= document.body.offsetHeight) {
            var nextArticle = visibleArticles.length;
            console.log(totalArticles[nextArticle])
            totalArticles[nextArticle].classList.add("show");
        }
        isScrolledIntoView();
    }, 1000)

});





// open website on an article title based on url hash
if(window.location.hash) {
    for (i = 0; i < totalArticles.length; i++){
        if(totalArticles[i].id == requestedArticle){
            for (j = 0; j <= i; j++){
                totalArticles[j].classList.add("show");
            }
            requesedNav.parentElement.classList.add("active");
        }
    }
    console.log(requestedArticle)
    document.querySelector("#" + requestedArticle).scrollIntoView({ behavior: 'smooth' });

} else {
    console.log("no hash")
}








(function(){

    var selector, elems, makeActive;
    selector = 'nav li';
    elems = document.querySelectorAll(selector);




    makeActive = function () {
        for (var i = 0; i < elems.length; i++){
            elems[i].classList.remove('active');
        }
        
        this.classList.add('active');

        var currentLink = this.getElementsByTagName("a")[0].getAttribute("href").split("#")[1];

        for (i = 0; i < totalArticles.length; i++){
            if(totalArticles[i].id == currentLink){
                for (j = 0; j <= i; j++){
                    totalArticles[j].classList.add("show");
                    console.log("#" + currentLink)
                    document.querySelector("#" + currentLink).scrollIntoView({ behavior: 'smooth' });
                }
            } else if (currentLink == "home"){
                document.querySelector("#home").scrollIntoView({ behavior: 'smooth' });
            }
        }
        
    };

    for (var i = 0; i < elems.length; i++) {
        elems[i].addEventListener('mousedown', makeActive);
    }

})();



var scroll = true;



function isScrolledIntoView() {
    for (i = 0; i < totalArticles.length; i++){
        var elemTop = totalArticles[i].getBoundingClientRect().top;
        var elemBottom = totalArticles[i].getBoundingClientRect().bottom;
        var isVisible = (elemTop <= 0) && (elemBottom >= window.innerHeight);
        var currentLink = navigation.querySelectorAll("a[href='#" + totalArticles[i].id + "']")[0];
        if(isVisible){
            currentLink.parentElement.classList.add("active");
            // window.location.hash = totalArticles[i].id;
            // window.addEventListener("hashchange",function(event){
            //     event.preventDefault();
            // });

        } else {
            currentLink.parentElement.classList.remove("active");
        }
    }
}