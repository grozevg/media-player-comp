import Component from './components/Component';
import './components/MediaPlayer.Component';
import config from './config.mediaplayer';
import './style.scss';

const eventLogConsole = Component('div', 'EVENTS LOG', 'console', '');
const eventLogConsoleContent = Component('div', '', '', '');
const rightSide = Component('div', '', '', 'right');

const mediaPlayer = document.createElement('media-player');
const root = document.getElementById('root');
const button = Component('button', 'Add Custom Volume Button', '', 'mycustombtn');
const buttonPosition = Component('button', 'Change Toolbar Position', '', 'mycustombtn');
const buttonVideo = Component('button', 'Change Video', '', 'mycustombtn');
const buttonLayout = Component('button', 'Change Layout and Styles', '', 'mycustombtn');


mediaPlayer.addEventListener('ready', function () {
	log('ready');
});

root.appendChild(mediaPlayer);
eventLogConsole.appendChild(eventLogConsoleContent);
rightSide.appendChild(eventLogConsole);
rightSide.appendChild(button);
rightSide.appendChild(buttonPosition);
rightSide.appendChild(buttonVideo);
rightSide.appendChild(buttonLayout);
root.appendChild(rightSide);

button.addEventListener('click', addButton);
buttonPosition.addEventListener('click', changePosition);
buttonVideo.addEventListener('click', changeVideo);
buttonLayout.addEventListener('click', changeLayoutAndStyles);

function changeVideo() {
	mediaPlayer.autoplay = true;
	mediaPlayer.video = ['https://app.coverr.co/s3/mp4/Mt_Baker.mp4','https://app.coverr.co/s3/webm/Mt_Baker.webm'];
}

function changePosition() {
	if (config.toolbar.position == 'top') {
		config.toolbar.position = 'bottom';
	} else {
		config.toolbar.position = 'top';
	}

	mediaPlayer.toolbar = config.toolbar;
}

function addButton() {
	config.toolbar.buttons.push({
		className: 'button1',
		icon: 'volume',
		text: 'Custom Btn',
		action: function (e) {
			unmutePlayer(e);
		}
	});
	mediaPlayer.toolbar = config.toolbar;
}

function unmutePlayer() {
	if (mediaPlayer.isMuted) {
		mediaPlayer.unmute();
	} else {
		log('Custom button clicked, but the player is already unmuted!');
	}
}

let flag = true;
function changeLayoutAndStyles() { 
	if (flag) {
		mediaPlayer.toolbarHTML = `
		<span class="displayTime"><span></span></span>
		<div class="toolbar__buttons"></div>
		`;
		mediaPlayer.style = `
			button {background:#ff000022;}
			.toolbar {background:#ff000022;}
			.displayTime {background:#ff000022; margin-left: 0; margin-right: auto;}
		`;
		buttonLayout.innerHTML = 'Reset Styles';
		flag = false;
	} else {
		// Reset styles
		buttonLayout.innerHTML = 'Change Layout and Styles';
		mediaPlayer.toolbarHTML = '';
		mediaPlayer.style = '';
		flag = true;
	}
}

mediaPlayer.data = config;

mediaPlayer.addEventListener('play', function () {
	log('play');
});

mediaPlayer.addEventListener('pause', function () {
	log('pause');
});

mediaPlayer.addEventListener('playbackward', function () {
	log('playbackward');
});

mediaPlayer.addEventListener('playforward', function () {
	log('playforward');
});

mediaPlayer.addEventListener('mute', function () {
	log('mute');
});

mediaPlayer.addEventListener('unmute', function () {
	log('unmute');
});

function log(mg) {
	eventLogConsoleContent.innerHTML += '<div>Event :: ' + mg + '</div>';
	eventLogConsoleContent.scrollTop = eventLogConsoleContent.scrollHeight;
}