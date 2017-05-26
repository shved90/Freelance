var visibleArticles = document.getElementsByClassName("show");
var totalArticles = document.getElementsByTagName("article");
var requestedArticle = window.location.hash.substr(1);

var navigation = document.getElementById("nav");
var navToggle = document.getElementsByClassName("navToggle")[0];
var requesedNav = navigation.querySelectorAll("a[href='#" + requestedArticle + "']")[0];




	document.addEventListener("scroll", function(event){
		
		//check which article scrolled into view
		isScrolledIntoView();
		setInterval(function(){

		//load next article once scrolled to bottom 400px
		if ((window.scrollY - 400) >= document.getElementById("gofast").clientHeight) {
			var nextArticle = visibleArticles.length;
			console.log(totalArticles[nextArticle])
			totalArticles[nextArticle].classList.add("show");
		}
		}, 1000)
		//change logo from large to small
		if (window.scrollY > 100) {
			document.getElementsByClassName("logo")[0].classList.add("small");
			navigation.classList.add("small");
		} else {
			document.getElementsByClassName("logo")[0].classList.remove("small");
			navigation.classList.remove("small");
		}
	});





// open website on an article title based on url hash
if(window.location.hash) {
	for (i = 0; i < totalArticles.length; i++){
		if(totalArticles[i].id == requestedArticle){
			for (j = 0; j <= i; j++){
				totalArticles[j].classList.add("show");
			}
			navigation.parentElement.classList.remove("active");
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
			}
		}

		
	};

	for (var i = 0; i < elems.length; i++) {
		elems[i].addEventListener('mousedown', makeActive);
	}

})();





// needs error check for no articles found
function isScrolledIntoView() {
	for (i = 0; i < totalArticles.length; i++){
		var elemTop = totalArticles[i].getBoundingClientRect().top;
		var elemBottom = totalArticles[i].getBoundingClientRect().bottom;
		var isVisible = (elemTop <= window.innerHeight) && (elemBottom >= window.innerHeight);
		var currentLink = navigation.querySelectorAll("a[href='#" + totalArticles[i].id + "']")[0];
		if(isVisible){
			document.getElementsByClassName("chapterNumber")[0].innerText = i + 1;
			document.getElementsByClassName("chapterTitle")[0].innerText = currentLink.innerText;
			document.getElementsByClassName("currentChapter")[0].style.display = "block";
			navigation.parentElement.classList.remove("active");
			currentLink.parentElement.classList.add("active");
		} else {
			currentLink.parentElement.classList.remove("active");
		}
	}
}

//dirty hacks to be reworked and accounted for phase 2
document.addEventListener("click", function(event){

	var morocco = document.getElementById("morocco");

	if(event.target == morocco  || event.target.parentNode == morocco){
		console.log("morocco")
		if(!navigation.classList.contains("visible") == true){
			navigation.classList.add("visible");
		} else {
			navigation.classList.remove("visible");
		}
	}
	if(!(event.target == morocco  || event.target.parentNode == morocco)){
		navigation.classList.remove("visible");
	}

	if(event.target == navToggle || event.target.parentNode == navToggle){
		if(!navToggle.classList.contains("active") == true){
			navToggle.classList.add("active");
			navigation.classList.add("visible");
		} else {
			navToggle.classList.remove("active");
			navigation.classList.remove("visible");
		}
	}

	if (event.target.getAttribute("href") == "#gofast"){
		document.querySelector("#gofast").scrollIntoView({ behavior: 'smooth' });
	} else if (event.target.parentElement.getAttribute("href") == "#home") {
		event.preventDefault();
		document.querySelector("#home").scrollIntoView({ behavior: 'smooth' });
	}
})