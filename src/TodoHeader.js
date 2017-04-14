import React from "react";
import {
    View,
    TextInput,
    Button,
    StyleSheet,
} from 'react-native';

export default class TodoHeader extends React.Component {
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
                isDone: false
            };
            this.props.addTodo(newTodoItem);
            this.setState({
                text: '',
            })
        }
    }

    render() {
        return (
            <View style={styles.View}>
        <TextInput style={styles.TextInput} underlineColorAndroid="#2196f3" selectionColor="#2196f3" placeholder="what's your task ?" onSubmitEditing={this.handleSubmit.bind(this)}  onChangeText={(text) => this.setState({text})} value={this.state.text} />
        <Button style={styles.Button} onPress={this.handleSubmit.bind(this)} title="Add"/>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    View: {
        height: 50,
        width: '100%',
        backgroundColor: 'pink',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextInput: {
        width: '80%'
    },
    Button: {
        width: '20%',
        height: 40,
        right: 0,
        fontSize: 15,
        lineHeight: 30,
        textAlignVertical: 'bottom'
    },
});