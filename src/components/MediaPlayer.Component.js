import icons from './MediaPlayer.icons';
import html from './MediaPlayer.html';
import css from './MediaPlayer.css';

const tag = 'media-player';

class MediaPLayer extends HTMLElement {
	constructor() {
		super();
		this._initShadowDOM();
	}

	set data(configData) {
		this._config = configData;

		if (configData.video) {
			this.video = configData.video;
		}

		if (configData.toolbar) {
			this.toolbar = configData.toolbar;
		}
	}

	get data() {
		return this._config;
	}

	set video(value) {
		this._config.video = value;
		this.initVideo();
	}

	get video() {
		return this._config.video;
	}

	set toolbar(value) {
		this._config.toolbar = value;
		this.initToolbar();
	}

	get toolbar() {
		return this._config.toolbar;
	}

	togglePlay(e) {
		let svgEL = e.currentTarget.querySelector('svg');
		if (this.isPlaying) {
			svgEL.innerHTML = icons.play;
			this.pause();
		} else {
			svgEL.innerHTML = icons.pause;
			this.play();
		}
	}

	play() {
		if (!this.isPlaying) {
			this._refs.video.play();
			this.dispatchEvent(new CustomEvent('play', { detail: this, composed: true }));
		}
	}

	pause() {
		if (this.isPlaying) {
			this._refs.video.pause();
			this.dispatchEvent(new CustomEvent('pause', { detail: this, composed: true }));
		}
	}

	// Go rewind - default value: 5 sec 
	playBackward(e) {
		let time = e.value ? e.value : 5;
		this.currentTime -= time;
		this.dispatchEvent(new CustomEvent('playbackward', { detail: this, composed: true }));
	}

	// Go forward - default value: 5 sec 
	playForward(e) {
		let time = e.value ? e.value : 5;
		this.currentTime += time;
		this.dispatchEvent(new CustomEvent('playforward', { detail: this, composed: true }));
	}

	load() {
		this._refs.video.load();
	}

	mute() {
		if (!this.isMuted) {
			this._refs.video.muted = true;
			this.dispatchEvent(new CustomEvent('mute', { detail: this, composed: true }));
		}
	}

	unmute() {
		if (this.isMuted) {
			this._refs.video.muted = false;
			this.dispatchEvent(new CustomEvent('unmute', { detail: this, composed: true }));
		}
	}

	// Show the progrees and duration time in the toolbar
	updateDisplayTime() {
		this._refs.displayTime.textContent = this._formatTime(this.currentTime) + ' / ' + this._formatTime(this.duration);
	}

	// Get Current Time
	get duration() {
		return this._refs.video.duration;
	}

	// Get Current Time
	get currentTime() {
		return this._refs.video.currentTime;
	}

	// Jump to time
	set currentTime(time) {
		this._refs.video.currentTime = time;
	}

	// Return the playing status 
	get isPlaying() {
		return !this._refs.video.paused;
	}

	// Return is muted status
	get isMuted() {
		return this._refs.video.muted;
	}

	// autoplay (controls if the video is automatically started) 
	get autoplay() {
		return this._refs.video.autoplay;
	}

	set autoplay(value) {
		this._refs.video.autoplay = value;
	}

	// Lifecycle events
	connectedCallback() {
		this.dispatchEvent(new CustomEvent('ready', { detail: this, composed: true }));
	}

	disconnectedCallback() {
		this.dispatchEvent(new CustomEvent('disconnected', { detail: this, composed: true }));
	}

	initVideo() {
		this._refs.video.innerHTML = '';
		this.data.video.forEach((src) => {
			const source = document.createElement('source');
			source.src = src;
			this._refs.video.appendChild(source);
		});
		this.load();
	}

	initToolbar() {
		const toolbar = this._refs.toolbar;
		const toolbar_buttons = this._refs.toolbar_buttons;

		this.data.toolbar.id ? toolbar.id = this.data.toolbar.id : null;
		toolbar.className = 'toolbar';
		toolbar.className += this.data.toolbar.className ? ' ' + this.data.toolbar.className : '';
		toolbar.className += this.data.toolbar.position == 'top' ? ' top' : '';

		toolbar_buttons.innerHTML = '';
		this._refs.buttons = [];
		this.data.toolbar.buttons.forEach((button) => {
			let buttonEl = this.createButton(button);
			toolbar_buttons.appendChild(buttonEl);
		});
	}

	// TODO
	createIcon(icon) {
		let svg = document.createElement('svg');
		svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		svg.setAttribute('width', '24');
		svg.setAttribute('height', '24');
		svg.setAttribute('viewbox', '0 0 24 24');
		svg.innerHTML = icons[icon];
		return svg;
	}

	createButton(data) {
		let buttonEl = document.createElement('button');

		if (data.id) {
			buttonEl.id = data.id;
		}

		if (data.className) {
			buttonEl.className = data.className;
		}

		if (data.icon) {
			// buttonEl.appendChild(this.createIcon(data.icon)); // TODO

			const svg = this.$('.samplesvg');
			buttonEl.appendChild(svg.cloneNode(true));
			buttonEl.querySelector('svg').innerHTML = icons[data.icon];
			data.text ? buttonEl.title = data.text : null;
		} else if (data.text) {
			buttonEl.title = data.text;
			buttonEl.textContent = data.text;
		}

		if (typeof data.action == 'function') {
			buttonEl.addEventListener('click', (e) => {
				e.mediaplayer = this;
				data.action(e);
			});
		} else if (this.__proto__.hasOwnProperty(data.action)) {
			buttonEl.addEventListener('click', (e) => {
				if (data.value) {
					e.value = data.value;
				}

				this[data.action](e);
			});
		}

		this._refs.buttons.push(buttonEl);

		return buttonEl;
	}

	_initShadowDOM() {
		const style = document.createElement('style');
		style.textContent = css;

		const template = document.createElement('template');
		template.innerHTML = html;

		let shadowRoot = this.attachShadow({ mode: 'open' });

		shadowRoot.appendChild(style);
		shadowRoot.appendChild(template.content.cloneNode(true));

		this._refs = {
			video: this.$('video'),
			toolbar: this.$('.toolbar'),
			toolbar_buttons: this.$('.toolbar__buttons'),
			buttons: [],
			displayTime: this.$('.displayTime span')
		};

		this._refs.video.addEventListener('canplay', () => { 
			this.dispatchEvent(new CustomEvent('canplay', { detail: this, composed: true }));
			this.updateDisplayTime(); 
		});
		this._refs.video.addEventListener('timeupdate', () => { this.updateDisplayTime(); });
	}

	_formatTime(value) {
		let minutes = Math.floor(value / 60);
		let seconds = Math.floor(value - minutes * 60);
		var x = minutes < 10 ? '0' + minutes : minutes;
		var y = seconds < 10 ? '0' + seconds : seconds;

		if (isNaN(x) || isNaN(y))
			return '';

		return x + ':' + y;
	}

	$(selector) {
		return this.shadowRoot.querySelector(selector);
	}

	$$(selector) {
		return this.shadowRoot.querySelectorAll(selector);
	}
}

customElements.define(tag, MediaPLayer);