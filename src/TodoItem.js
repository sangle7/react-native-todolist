import React from "react";
import {
    Text,
    Button,
    TextInput,
    StyleSheet,
    View
} from 'react-native';
import CheckBox from 'react-native-checkbox';


export default class TodoItem extends React.Component {

    // 处理任务是否完成状态
    handlerChange() {
        let bool = /true/.test(this.props.isDone) ? true : false
        let isDone = !bool;
        this.props.changeTodoState(this.props.index, isDone);
    }

    // 删除当前任务
    handlerDelete() {
        this.props.deleteTodo(this.props.index);
    }

    render() {
        let bool = /true/.test(this.props.isDone) ? true : false
        let styleForText = bool ? styles.TextLine : styles.Text

        return (
            <View style={styles.View}>
            <CheckBox 
            uncheckedImage={require('./checkboxu.png')} 
            checkedImage={require('./checkbox.png')}
            label=''
            checked={bool}
            onChange={this.handlerChange.bind(this)}
            />
                <Text style={styleForText} >{this.props.text}</Text>
                <Button onPress={this.handlerDelete.bind(this)}  title="删除" />
            </View>
        )
    }
}

let styles = StyleSheet.create({
    View: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1
    },
    Text: {
        width: '60%',
        textAlignVertical: 'center',
        textDecorationLine: 'none',
    },
    TextLine: {
        width: '60%',
        textAlignVertical: 'center',
        textDecorationLine: 'line-through',
    },
    Button: {
        width: '20%',
        right: 0,
        fontSize: 15,
        textAlignVertical: 'center'
    },

});