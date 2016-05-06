import d from '../dispatchers/devices';
import c from '../constants/devices';

class Actions {
	constructor () {

	}

	initialize () {
		d.dispatch({
			type: c.INITIALIZE
		});
	}

	initialData (data) {
		d.dispatch({
			type: c.INITIAL_DATA,
			data: data
		});
	}

	updateLight (data) {
		d.dispatch({
			type: c.UPDATE_LIGHT,
			data: data
		});
	}

	// sensors

	updateSensors (data) {
		d.dispatch({
			type: c.UPDATE_SENSORS,
			data: data
		});
	}
}

export default new Actions();
