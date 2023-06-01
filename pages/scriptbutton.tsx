document.getElementById('videoFile').addEventListener('change', function(event) {
    const file = (event.target as HTMLInputElement).files[0];
    const videoPlayer = document.getElementById('videoPlayer') as HTMLVideoElement;
    const videoURL = URL.createObjectURL(file);
    videoPlayer.src = videoURL;
});

const video = document.getElementById("videoPlayer") as HTMLVideoElement;
video.volume = 0.2;