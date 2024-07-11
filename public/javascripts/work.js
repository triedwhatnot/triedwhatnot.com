(()=>{
    window.addEventListener("load", () => {

        if (window.location.hash) {
            const element = document.querySelector(window.location.hash);
            if (element) {
                window.scrollTo({
                    top: element.offsetTop - 100, // Adjust the 50 value for the margin you want
                    behavior: 'smooth'
                });
            }
        }

        document.getElementById("show-more-btn").addEventListener("click", function(){
            let innerText = document.querySelector("#show-more-btn button").innerText;
            let isVireMoreClick = innerText === "view more ";
            document.querySelector("#show-more-btn button").innerHTML = isVireMoreClick ? "view less <img class='invert' src='/icons/arrow-down.svg'/>" : "view more <img src='/icons/arrow-down.svg'/>";

            if(isVireMoreClick){
                document.querySelectorAll(".projects .projects-card.hide").forEach(node => {
                    node.classList.remove("hide");
                });
            }
            else{
                document.querySelectorAll(".projects .projects-card").forEach((node, idx) => {
                    if(idx > 3) node.classList.add("hide");
                });
            }
            
        });

        // carousel logic
        new Splide( '.splide', {
            type: "loop",
            autoplay: true,
            arrows: false,
            interval: 4000,
            speed: 2000,
            classes: {
                pagination: 'splide__pagination pagination-styles',
            }
        }).mount();
    });
})();