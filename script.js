// script.js

const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const stopBtn = document.getElementById('stopBtn');
const seekBar = document.getElementById('seekBar');
const volumeBar = document.getElementById('volumeBar');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const songList = document.getElementById('songList');

let isPlaying = false;

// Cập nhật thời gian và thanh tiến độ
audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    seekBar.value = (currentTime / duration) * 100;
    currentTimeDisplay.textContent = formatTime(currentTime);
    durationDisplay.textContent = formatTime(duration);
});

// Định dạng thời gian
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Phát hoặc tạm dừng bài hát
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.textContent = 'Play';
    } else {
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
});

// Dừng bài hát
stopBtn.addEventListener('click', () => {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    playPauseBtn.textContent = 'Play';
    isPlaying = false;
});

// Điều chỉnh thanh tiến độ
seekBar.addEventListener('input', () => {
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (seekBar.value / 100) * duration;
});

// Điều chỉnh âm lượng
volumeBar.addEventListener('input', () => {
    audioPlayer.volume = volumeBar.value / 100;
});

// Phát bài hát đã chọn
function playSelectedSong() {
    const selectedOption = songList.options[songList.selectedIndex];
    const songUrl = selectedOption.value;

    audioPlayer.src = songUrl;
    audioPlayer.play();
    playPauseBtn.textContent = 'Pause';
    isPlaying = true;
}

// Khi bài hát kết thúc, quay lại bài đầu tiên
audioPlayer.addEventListener('ended', () => {
    const firstOption = songList.options[1];
    audioPlayer.src = firstOption.value;
    audioPlayer.play();
    playPauseBtn.textContent = 'Pause';
    isPlaying = true;
});

// Di chuyển iframe từ từ
function moveIframeSmoothly() {
    const iframe = document.getElementById('animeIframe');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const iframeWidth = iframe.offsetWidth;
    const iframeHeight = iframe.offsetHeight;

    function getRandomPosition() {
        const x = Math.random() * (windowWidth - iframeWidth);
        const y = Math.random() * (windowHeight - iframeHeight);
        return { x, y };
    }

    function move() {
        const position = getRandomPosition();
        iframe.style.left = `${position.x}px`;
        iframe.style.top = `${position.y}px`;
        setTimeout(move, 2000); // Di chuyển mỗi 2 giây
    }

    move();
}

// Bắt đầu di chuyển khi trang tải xong
window.onload = function() {
    moveIframeSmoothly();
    playSelectedSong(); // Phát bài 'Tình Đầu' khi trang tải
};
