import React from "react";
import {
    Button,
    TextInput,
    Text,
    View,
    StyleSheet
} from 'react-native';
import CheckBox from 'react-native-checkbox';
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
        return (
            <View style={styles.View}>
            <CheckBox
            ref='checkbox'
            uncheckedImage={require('./checkboxu.png')} 
            checkedImage={require('./checkbox.png')}
            label=''
            checked={this.props.isAllChecked}
            onChange={this.handlerAllState.bind(this)}
            underlayColor='transparent'
            />
                <Text style={styles.Text} >{this.props.todoDoneCount}已完成 / {this.props.todoCount}总数</Text>
                <Button style={styles.Button} onPress={this.handlerClick.bind(this)} title="清除已完成" />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    View: {
        height: 80,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink'
    },
    Text: {
        width: '60%',
        textAlignVertical: 'center'
    },
    Button: {
        width: '20%',
        right: 0,
        fontSize: 15,
        textAlignVertical: 'center'
    },

});