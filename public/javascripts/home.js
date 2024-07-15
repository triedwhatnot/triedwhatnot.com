(()=>{
    window.addEventListener("load", () => {

        document.getElementById("show-more-btn").addEventListener("click", function(){
            window.location.href = "/work#projects";
        });

        document.getElementById("show-more-exp").addEventListener("click", function(){
            window.location.href = "/work#experience";
        });

        document.getElementById("show-more-blogs").addEventListener("click", function(){
            window.open("https://www.linkedin.com/in/triedwhatnot/recent-activity/all/", "_blank");
        });

        // carousel logic
        new Splide('#blog-splide', {
            type: "loop",
            autoplay: true,
            arrows: false,
            interval: 4000,
            speed: 2000,
            classes: {
                pagination: 'splide__pagination pagination-styles',
            }
        }).mount();
        
        new Splide('#testimonials-splide', {
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