import React from 'react';
import TodoItem from './TodoItem.js';
import {
    StyleSheet,
    ListView,
    View
} from 'react-native';


class TodoMain extends React.Component {
    // 遍历显示任务，转发props
    render() {
        return (
            <View style={styles.container}>
             {this.props.todos.map((todo, index) => {
                    return <TodoItem key={index} {...todo} index={index} {...this.props}/>
                })}
             </View>
        )
    }
}
let styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
    }
});
export default TodoMain;