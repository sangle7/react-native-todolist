import React from "react";
import {
    Button,
    TextInput,
    Text,
    View,
    StyleSheet
} from 'react-native';
import {
    MKCheckbox,
    MKButton
} from 'react-native-material-kit';
export default class TodoFooter extends React.Component {

    // 处理全选与全不选的状态
    handlerAllState(e) {
        if (this.props.isAllChecked) {
            this.props.changeTodoState(null, false, true);
            this.refs.checkbox.state.internalChecked = true;
        } else {
            this.props.changeTodoState(null, this.refs.checkbox.state.internalChecked, true);
            this.refs.checkbox.state.internalChecked = !this.refs.checkbox.state.internalChecked;
        }
    }

    // 绑定点击事件，清除已完成
    handlerClick() {
        this.props.clearDone();
    }

    render() {
        let bool = /true/.test(this.props.isAllChecked) ? true : false
        return (
            <View style={styles.View}>
            <MKCheckbox ref='checkbox'
  checked={this.props.isAllChecked}
  onCheckedChange={this.handlerAllState.bind(this)}
/>
                <Text style={styles.Text} >{this.props.todoDoneCount}已完成 / {this.props.todoCount}总数</Text>
                <ColoredRaisedButton onPress={this.handlerClick.bind(this)}/>
            </View>
        )
    }
}
const ColoredRaisedButton = MKButton.coloredButton()
    .withText('清除已完成')
    .build();

let styles = StyleSheet.create({
    View: {
        height: 80,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E91E63',
    },
    Text: {
        width: '60%',
        textAlignVertical: 'center',
        color: 'white'
    },
    Button: {
        width: '20%',
        right: 0,
        fontSize: 15,
        textAlignVertical: 'center'
    },

});