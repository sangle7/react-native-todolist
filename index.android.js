import React, {
	Component,
} from 'react';
import {
	AppRegistry,
	StyleSheet,
	View,
	AsyncStorage
} from 'react-native';
import Drawer from "./src/drawer.js"

class AwesomeProject extends Component {
	render() {
		return (
			<Drawer />
		)
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);