import React from "react";
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMoon from 'react-native-vector-icons/Ionicons';

import Poptip from './poptip.js';
import {
    observer
} from 'mobx-react';
import {
    AppState
} from './appState.js';
import {
    MKButton,
    MKTextField,
    MKColor
} from 'react-native-material-kit';

export default @observer class TodoHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: null,
        };
    }

    handleSubmit(e) {
        if (this.state.text) {
            let newTodoItem = {
                text: this.state.text,
                isDone: false,
                category: AppState.inputCat,
            };
            console.log(newTodoItem)
            this.props.addTodo(newTodoItem);
            this.setState({
                text: '',
            })
        }
        AppState.hideHeader()
    }
    handleCancel() {
        AppState.hideHeader()
        AppState.closePoptip();
    }
    showCategoryList() {
        AppState.showPoptip()
    }

    render() {
        let viewStyle = AppState.header ? styles.View : styles.NoView;
        return (
            <View style={viewStyle}>
            <Poptip />
        <Textfield autoFocus={true} placeholder={'在"'+AppState.inputCat+'"中添加一个任务'} onSubmitEditing={this.handleSubmit.bind(this)}  onChangeText={(text) => this.setState({text})} value={this.state.text} />
        <MKButton  backgroundColor={MKColor.white} onPress={this.showCategoryList.bind(this)}>
        <View style={styles.categoryChoice}>
        <Icon name="list" size={30} color="#333"></Icon>
  <Text style={{fontFamily: 'Arial', fontSize: 15,textAlign:'left'}}>{AppState.inputCat}</Text>
   <Icon name="keyboard-arrow-down" size={30} color="#333"></Icon>
  </View>
  </MKButton>
  <View style={styles.submitOrNot}>
  <Cancel onPress={this.handleCancel.bind(this)}/>
  <Add onPress={this.handleSubmit.bind(this)}/>
        </View>
            </View>
        )
    }
}

const Cancel = MKButton.flatButton()
    .withText('Cancel')
    .build();
const Add = MKButton.flatButton()
    .withText('Add')
    .build();
const Textfield = MKTextField.textfield()
    .withStyle({
        width: '80%',
    })
    .build();

let styles = StyleSheet.create({
    View: {
        top: 0,
        height: '100%',
        width: '100%',
        zIndex: 100,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'white',
        bottom: 80
    },
    NoView: {
        display: 'none',
    },
    categoryChoice: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopColor: '#333',
        borderTopWidth: 1,
    },
    submitOrNot: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    wideButton: {
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
});