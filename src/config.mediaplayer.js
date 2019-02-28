const config = {
	toolbarHTML: '',
	css: '',

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

function customButtonHandler(e) {
	e.mediaplayer.mute();
	// console.log(e.mediaplayer); // MediaPlayer Object
}

export { config as default };