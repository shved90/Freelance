var visibleArticles = document.getElementsByClassName("show");
var totalArticles = document.getElementsByTagName("article");
var requestedArticle = window.location.hash.substr(1);

document.addEventListener("scroll", function(event){

    if ((window.innerHeight + window.scrollY + 400) >= document.body.offsetHeight) {
        var nextArticle = visibleArticles.length;
        console.log(totalArticles[nextArticle])
        totalArticles[nextArticle].classList.add("show");
    }
    

});








if(window.location.hash) {
    for (i = 0; i < totalArticles.length; i++){
        if(totalArticles[i].id == requestedArticle){
            for (j = 0; j <= i; j++){
                console.log(j)
                totalArticles[j].classList.add("show");
            }
            console.log(i)
        }
    }

} else {
    console.log("no hash")
}






function isScrolledIntoView(el) {
    var elemTop = el.getBoundingClientRect().top;
    var elemBottom = el.getBoundingClientRect().bottom;

    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
}






var selector, elems, makeActive;
selector = '.nav--secondary li';
elems = document.querySelectorAll(selector);

makeActive = function () {
    for (var i = 0; i < elems.length; i++)
        elems[i].classList.remove('active');
    
    this.classList.add('active');
};

for (var i = 0; i < elems.length; i++)
    elems[i].addEventListener('mousedown', makeActive);









// checks which nav link is currently active based on url slug

// (function() {
//     var nav = document.getElementById('nav'),
//         anchor = nav.getElementsByTagName('a'),
//         current = window.location.pathname.split('/')[1];
//         for (var i = 0; i < anchor.length; i++) {
//         if(anchor[i].href == current) {
//             anchor[i].className = "active";
//         }
//     }
// })();












(function() // Smooth scroll to destination by anchor
{
var speed = 500;
var moving_frequency = 15; // Affects performance !
var links = document.getElementsByTagName('a');
var href;
for(var i=0; i<links.length; i++)
{   
    href = (links[i].attributes.href === undefined) ? null : links[i].attributes.href.nodeValue.toString();
    if(href !== null && href.length > 1 && href.substr(0, 1) == '#')
    {
        links[i].onclick = function()
        {
            var element;
            var href = this.attributes.href.nodeValue.toString();
            if(element = document.getElementById(href.substr(1)))
            {
                var hop_count = speed/moving_frequency
                var getScrollTopDocumentAtBegin = getScrollTopDocument();
                var gap = (getScrollTopElement(element) - getScrollTopDocumentAtBegin) / hop_count;

                for(var i = 1; i <= hop_count; i++)
                {
                    (function()
                    {
                        var hop_top_position = gap*i;
                        setTimeout(function(){  window.scrollTo(0, hop_top_position + getScrollTopDocumentAtBegin); }, moving_frequency*i);
                    })();
                }
            }

            //return false;  //uncomment to hide hash from url
        };
    }
}

var getScrollTopElement =  function (e)
{
    var top = 0;

    while (e.offsetParent != undefined && e.offsetParent != null)
    {
        top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
        e = e.offsetParent;
    }

    return top;
};

var getScrollTopDocument = function()
{
    return document.documentElement.scrollTop + document.body.scrollTop;
};
})();