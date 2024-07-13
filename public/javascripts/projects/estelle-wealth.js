var videoPlayer = document.getElementById('video-back'); 

//video initial offset
setTimeout(function(){
    customDuration(0,10);
}, 1800);

//clipping duration and looping video
function customDuration(startTime, endTime) {
    videoPlayer.currentTime = startTime; 
    videoPlayer.play();

    var duration = (endTime - startTime)*1000; 
    
    setInterval(function(){
        videoPlayer.pause();
        videoPlayer.currentTime = startTime;
        videoPlayer.play();
    }, duration);
}

//mute video
document.querySelector('.mute-btn').addEventListener('click', muteVideo);

function muteVideo(){
    document.querySelector('.mute-top').classList.toggle('muted');

    if(document.querySelector('.mute-top').classList.contains('muted')){
        videoPlayer.muted = 'true';
    }
    else{
        videoPlayer.muted = 'false';
    }
}
