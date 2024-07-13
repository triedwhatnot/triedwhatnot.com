window.addEventListener("load", function(){ 
    let tile1, tile2, openTilesCount = 0, isClickAllowed = true;

    initiateGame();


    function initiateGame(){
        const randomNums = generateRandomNums();
        updateDomWithRandomNums(randomNums);
        addTargetListeners();
        tile1 = null;
        tile2 = null;
        openTilesCount = 0;

        setTimeout(()=>{
            // show instructions 
            alert("Click on any tile to unveil the hidden number; if the numbers on two consecutively opened tiles match, they will remain open, otherwise, they will close. Keep revealing and matching tiles until all tiles are open to win the game!");
            openAllTiles();
            closeAllOpenTilesAfter2secs();
        }, 500);   
    }


    function restartGame(){
        const randomNums = generateRandomNums();
        updateDomWithRandomNums(randomNums);
        tile1 = null;
        tile2 = null;
        openTilesCount = 0;
        openAllTiles();
        closeAllOpenTilesAfter2secs();
    }


    function closeAllOpenTilesAfter2secs(){
        setTimeout(()=>{
            Array.from(document.querySelectorAll(".tile")).forEach(node => node.classList.remove("clicked"));
        }, 2000);
    }


    function openAllTiles(){
        Array.from(document.querySelectorAll(".tile")).forEach(node => node.classList.add("clicked"));
    }


    function generateRandomNums(){
        const randomNumsArr = [];
        const freqObj = {};
        while(randomNumsArr.length !== 20){
            let randomNum = Math.ceil(Math.random()*10); // 1 to 10

            while(freqObj[randomNum] === 2){
                randomNum = (randomNum + 1) % 11;
                randomNum = randomNum === 0 ? randomNum + 1 : randomNum;
            }
            freqObj[randomNum] = (freqObj[randomNum] || 0) + 1;
            randomNumsArr.push(randomNum);
        }
        return randomNumsArr;
    }


    function updateDomWithRandomNums(numsArr){
        let htmlStr = "";
        numsArr.forEach((num)=>{
            htmlStr += `<div class="tile" data-num="${num}">
                            <div class="tile-num">${num}</div>
                            <div class="tile-decoy"></div>
                        </div>`;
        });
        document.querySelector(".tile-game-area").innerHTML = htmlStr;
    }


    function addTargetListeners(){
        // new game CTA
        document.querySelector(".btn-tile-game").addEventListener("click", restartGame);

        // game area click
        document.querySelector(".tile-game-area").addEventListener("click", function(e){
            if(isClickAllowed){
                if(e.target.closest(".tile")){
                    let tileEl = e.target.classList.contains("tile") ? e.target : e.target.parentElement;
                    if(!tile1) tile1 = tileEl;
                    else tile2 = tileEl;
    
                    // open the tile
                    tileEl.classList.add("clicked");
    
                    // compare tiles
                    if(tile1 && tile2) {
                        compareTiles();
                        isClickAllowed = false;
                    }
                    else{
                        isClickAllowed = false;
                        enableClick(600);
                    }
                }
            }
        });
    }


    function compareTiles(){
        let num1 = tile1.getAttribute("data-num");
        let num2 = tile2.getAttribute("data-num");
        if(num1 === num2){
            openTilesCount += 2;

            tile1 = null;
            tile2 = null;

            enableClick(600);

            if(openTilesCount === 20){
                setTimeout(()=>{
                    if(confirm("Congratulations!! Play again?")) restartGame();
                },700);
            }
        }
        else{
            // close both the tile
            setTimeout(()=>{
                tile1.classList.remove("clicked");
                tile2.classList.remove("clicked");

                tile1 = null;
                tile2 = null;
            }, 600);

            enableClick(1200);
        }
    }

    function enableClick(time){
        setTimeout(()=>{
            isClickAllowed = true;
        }, time);
    }


});