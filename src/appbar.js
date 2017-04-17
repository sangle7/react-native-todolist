import React, {
	Component,
} from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Appbar extends Component {
	openDrawer() {
		this.props.openDrawer()
	}

	render() {
		return (
			<View style={styles.container}>
              <Icon.Button name="menu" size={30} backgroundColor="transparent" onPress={this.openDrawer.bind(this)} />
              <Text style={{color:'white', fontSize: 18}}>所有任务</Text>
            </View>
		)
	}
}

let styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 56,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#3f51b5',
	}
});