(()=>{
    window.addEventListener("load", () => {

        if(window.innerWidth <= 1024){
            document.getElementById("nav-parent-wrap").classList.add("hide");

            document.getElementById("header-id").addEventListener("click", function(e){
                if(e.target.classList.contains("hamburger-icon")){
                    document.querySelectorAll(".hamburger-icon").forEach(node => {
                        node.classList.toggle("hide");
                    });
                    document.getElementById("nav-parent-wrap").classList.toggle("hide");
                }
            });
        }
    });
})();