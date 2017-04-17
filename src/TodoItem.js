import React from "react";
import {
    Text,
    Button,
    TextInput,
    StyleSheet,
    View
} from 'react-native';
import {
    MKCheckbox,
    MKButton
} from 'react-native-material-kit';

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
        <MKCheckbox
  checked={bool}
  onCheckedChange={this.handlerChange.bind(this)}
/>
                <Text style={styleForText} >{this.props.text}</Text>
                <ColoredFlatButton onPress={this.handlerDelete.bind(this)}/>
            </View>
        )
    }
}
const ColoredFlatButton = MKButton.coloredFlatButton()
    .withText('删除')
    .build();


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
    }
});