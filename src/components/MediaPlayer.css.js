const css = `
	:host {
		position: relative;
	}

	video {
		width: 100%;
		display: block;
	}

	.toolbar {
		font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
		display: flex;
		background-color: #d3fdb466;
		position: absolute;
		bottom: 0;
		width: 100%;
	}

	.toolbar.top {
		bottom: auto;
		top: 0;
	}

	.displayTime {
		display: flex;
		background-color: #33333366;
		color: #eee;
		font-size: 20px;
		padding: 0 20px;
		margin-left: auto;
	}

	.displayTime span {
		align-self: center;
	}

	button {
		font: inherit;
		line-height: 20px;
		font-size: 20px;
		padding: 10px;
		margin: 5px;
		background: #33333333;
		border: 0 none;
		color: white;
		cursor: pointer;
	}

	#custombuttom {
		margin-left: 50px;
	}

	button svg {
		fill: #ffffff;
	}
`;

export {css as default};