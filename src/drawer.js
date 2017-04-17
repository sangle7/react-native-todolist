import React, {
	Component,
} from 'react';
import {
	StyleSheet,
	DrawerLayoutAndroid,
	View,
	ListView,
	Text,
} from 'react-native';
import TodoSection from "./TodoSection.js";
import Appbar from "./appbar.js";
import {
	AppState
} from './appState.js';
import {
	observer
} from 'mobx-react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
	MKButton
} from 'react-native-material-kit';

export default @observer class Drawer extends Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		let arr = AppState.cats.split(';');
		arr.unshift('All')
		this.state = {
			dataSource: ds.cloneWithRows(arr),
		};
	}
	openDrawer() {
		this.refs['DRAWER'].openDrawer()
	}
	handleCategory(data) {
		AppState.changeCategory(data);
		this.refs['DRAWER'].closeDrawer()
	}
	showHeader() {
		AppState.showHeader()
	}

	render() {
		let buttonStyle = AppState.raiseButton ? styles.View : styles.NoView
		var navigationView = (
			<View style={{flex: 1, backgroundColor: '#fff',padding:30}}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text style={styles.Text} onPress={this.handleCategory.bind(this,rowData)}>{rowData}</Text>}
      />
    </View>
		);
		return (
			<DrawerLayoutAndroid
			ref='DRAWER'
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={() => navigationView}>
      <View style={{flex: 1, alignItems: 'center'}}>
      <Appbar openDrawer={this.openDrawer.bind(this)}/>
      <TodoSection />
      </View>
      <ColoredRaisedButton  ref="raisedButton">
      <Icon name="add" size={30} color="#FFF"/>
      </ColoredRaisedButton>
    </DrawerLayoutAndroid>
		);
	}
}

let styles = StyleSheet.create({
	Text: {
		lineHeight: 50,
		fontSize: 15,
		borderBottomColor: '#333',
		borderBottomWidth: 1,
	},
});

const ColoredRaisedButton = MKButton.coloredFab()
	.withStyle({
		position: 'absolute',
		height: 56,
		width: 56,
		bottom: 52,
		right: 40
	})
	.withOnPress(() => {
		AppState.showHeader()
	})
	.build();