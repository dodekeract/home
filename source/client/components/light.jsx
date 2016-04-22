import React from 'react';

import store from '../stores/devices';

export default class Light extends React.Component {
	constructor () {
		super();
		this.state = store.getState();

		this._onChange = this._onChange.bind(this);
	}

	componentDidMount () {
		store.addChangeListener(this._onChange);
	}

	_onChange (data) {
		this.setState(store.getState());
	}

	componentWillUnmount () {
		store.removeChangeListener(this._onChange);
	}

	render () {
		let className = this.state.lights[this.props.id].on ? 'success' : 'danger';
		let label = this.state.lights[this.props.id].on ? 'On' : 'Off';

		let colorList = [{
			name: 'white',
			color: '#FFFFFF',
			className: 'default'
		}, {
			name: 'yellow',
			color: '#FFDC00',
			className: 'warning'
		}, {
			name: 'red',
			color: '#FF4136',
			className: 'danger'
		}, {
			name: 'blue',
			color: '#0074D9',
			className: 'primary'
		}];
		let colors = [];

		colorList.forEach((color) => {
			let classes = 'btn btn-' + (color.className ? color.className : 'default')
			let styles = color.className ? {} : {
				backgroundColor: color.color
			};
			colors.push(
				<button ref={color.name} className={classes} style={styles} onFocus={this.blur.bind(this, color.name)} onClick={this.color.bind(this, color.name)}>
					&nbsp;
				</button>
			);
		});

		return (
			<div className="col-xs-6">
				<div className="panel panel-default">
					<div className="panel-heading">
						{this.props.name} Light
					</div>
					<div className="panel-body">
						<div className="btn-group" data-toggle="buttons">
							<button ref="toggle" className={'btn btn-' + className} onFocus={this.blur.bind(this, 'toggle')} onClick={this.toggle.bind(this)}>
								{label}
							</button>
							{colors}
						</div>
					</div>
				</div>
			</div>
		);
	}

	blur (name) {
		this.refs[name].blur();
	}

	color (name) {
		let id = this.props.id;
		window.socket.emit('light:color', {
			id: id,
			color: name
		});
	}

	toggle () {
		window.socket.emit('light:toggle', {
			id: this.props.id
		});
	}
}
