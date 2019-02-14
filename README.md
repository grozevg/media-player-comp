# Media Player Component

A sample Media Player Component built with pure JavaScript and Web Component.

```
This repository is forked from Webpack Boilerplate (https://github.com/taniarascia/webpack-boilerplate)
```

## Installation

```bash
git clone https://github.com/grozevg/media-player-comp.git
          ssh://git@github.com:grozevg/media-player-comp.git
cd media-player-comp
npm install (requires node.js)
```

## Features
### Methods:
```
play
pause
playBackward - Go rewind - default value: 5 sec (10s in the demo )
playForward - Go forward - default value: 5 sec 
load
mute
unmute
set currentTime (Jump to time)
```
### Properties:
```
currentTime  - return current time of video
duration - return total time of video
autoplay - controls if the video is automatically started
isMuted
```
### Events:
```
ready
play
pause
playbackward
playforward
mute
unmute
```

The `toolbar's buttons` and the layout are fully configurable by Config Object. The Media Player Component is data driven component, which mean you can control it using by Data Object, e.t.c:
```
const config = {
	video: [
		'https://www.w3schools.com/tags/mov_bbb.mp4',
		'https://www.w3schools.com/tags/mov_bbb.ogg'
	],
	toolbar: {
		id: 'toolbar',
		className: 'mytoolbar',
		position: 'bottom', // top

		buttons: [
			{
				id: 'uniquebutton',
				className: 'button0',
				icon: 'play',
				text: 'Play/Pause',
				action: 'togglePlay'
			},
			{
				className: 'button3',
				icon: 'rewind',
				text: 'Rewind 10 sec',
				value: 10,
				action: 'playBackward'
			},
			{
				className: 'button4',
				icon: 'forward',
				text: 'Forward 10 sec',
				value: 10,
				action: 'playForward'
			},
			{
				id: 'custombuttom',
				text: 'Custom Mute Button',
				icon: 'mute',
				action: function (event) { customButtonHandler(event); }
			}
		]
	}
};
```

## Node.js Commands

### npm start

> This will start sample demo page. It will not create or affect the `dist` build.

Start development server on `localhost:1916`.

### npm run build

Generate `dist` folder with `app.bundle.js` and `index.html`.
> Production

### npm test

Run tests. Running with Karma and Jasmine Framework. 
```
