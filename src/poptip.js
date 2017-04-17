import React from 'react';
import {
    StyleSheet,
    ListView,
    View,
    Text
} from 'react-native';
import Modal from 'react-native-modalbox';
import {
    observer
} from 'mobx-react';
import {
    AppState
} from './appState.js';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default @observer class Poptip extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
        }
    }
    componentWillMount() {
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.setState({
            dataSource: ds.cloneWithRows(AppState.cats.split(';'))
        })
    }
    changeCat(cat) {
        AppState.changeInputCat(cat);
    }
    closePoptip() {
        AppState.closePoptip();
    }
    render() {
        return (
            <Modal backButtonClose={true} style={[styles.modal, styles.modal3]} onClosed={this.closePoptip.bind(this)} position={"center"} ref={"modal3"} isOpen={AppState.poptip}>
          <ListView style = {styles.container}
            dataSource = {this.state.dataSource}
            renderRow = {(rowData) => <Text style={styles.Text} onPress={this.changeCat.bind(this,rowData)}><Icon name="list" size={30} color="#900" />{rowData}</Text>}/>
            </Modal>
        )
    }
}
let styles = StyleSheet.create({
    container: {
        width: '80%',
        flexDirection: 'column',
        padding: 20,
    },
    Text: {
        lineHeight: 40,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    wrapper: {
        paddingTop: 50,
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1111
    },

    modal2: {
        height: 230,
        backgroundColor: "#3B5998"
    },

    modal3: {
        height: 300,
        width: 300
    },

    modal4: {
        height: 300
    },
});