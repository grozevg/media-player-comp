import '../src/components/MediaPlayer.Component';
import config from '../src/config.mediaplayer';

describe('MediaPlayer test', function () {
	var mediaplayer = document.createElement('media-player');
	mediaplayer.data = config;

	beforeAll(function (done) {
		mediaplayer.addEventListener('canplay', function () {
			done();
		});
	});

	it('is not muted', function () {
		expect(mediaplayer.isMuted).toEqual(false);
	});

	it('is paused', function () {
		expect(mediaplayer.isPlaying).toEqual(false);
	});

	it('duration', function () {
		expect(mediaplayer.duration).toEqual(10.026667);
	});
});