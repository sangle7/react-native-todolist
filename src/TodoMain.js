import React from 'react';
import TodoItem from './TodoItem.js';
import {
    StyleSheet,
    ListView,
    View,
    Text
} from 'react-native';
import {
    observer
} from 'mobx-react';
import {
    AppState
} from './appState.js';


export default @observer class TodoMain extends React.Component {

    render() {
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        console.log(this.props.todos)
        let _temp
        if (AppState.category != 'All')
            _temp = this.props.todos.filter((elem) => {
                return elem.category == AppState.category
            })
        else {
            _temp = this.props.todos
        }
        let dataSource = ds.cloneWithRows(_temp)
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