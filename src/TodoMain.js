import React from 'react';
import TodoItem from './TodoItem.js';
import {
    StyleSheet,
    ListView,
    View,
    Text
} from 'react-native';
// <TodoItem key={index} {...todo} index={index} {...this.props}/>

class TodoMain extends React.Component {
    render() {
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        let dataSource = ds.cloneWithRows(this.props.todos)
        return (
            <ListView style = {styles.container}
            dataSource = {dataSource}
            renderRow = {(rowData, sectionID, rowID) =><TodoItem key={rowID} {...rowData} index={rowID} {...this.props}/>
        }
        />
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