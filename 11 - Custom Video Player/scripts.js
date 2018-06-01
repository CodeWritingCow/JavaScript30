/* Get our elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
// Bug: When in fullscreen mode, the custom video buttons disappear and are replaced by browser buttons
// Pressing the default browser fullscreen button doesn't run changeScreen()
const screenButton = player.querySelector('.fullscreen');

/* Build out functions */
function togglePlay() {
	// if (video.paused) {
	// 	video.play();
	// } else {
	// 	video.pause();
	// }
	const method = video.paused ? 'play' : 'pause'; // more concise version of code above
	video[method]();

}

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
	// console.log('Update the button');
}

function skip() {
	// console.log(this.dataset.skip);
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	video[this.name] = this.value;
	// console.log(this.name);
	// console.log(this.value);
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
	// console.log(e);
}

function changeScreen() {
	if (fullscreen) {
		// fullscreen = !fullscreen;
		video.webkitExitFullScreen();
		console.log('Regular screen!');
	} else {
		// video.requestFullscreen();
		video.webkitEnterFullScreen();
		// fullscreen = !fullscreen;
		console.log('Full screen!');
		console.log(`fullscreen is now: ${fullscreen}`);
	}
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click',
	skip));
ranges.forEach(range => range.addEventListener('change',
	handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',
	handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

let fullscreen = false;
screenButton.addEventListener('click', () => changeScreen());
// document.addEventListener('fullscreenchange', () => {
// 	fullscreen = !fullscreen;
// });