import React, {
	Component,
} from 'react';
import {
	StyleSheet,
	View,
	AsyncStorage
} from 'react-native';
import TodoHeader from "./TodoHeader.js";
import TodoMain from "./TodoMain.js";
import TodoFooter from "./TodoFooter.js";

export default class TodoSection extends Component {
	constructor() {
		super();
		this.state = {
			todos: [],
			isAllChecked: false
		};
	}
	componentWillMount() {
			//读取储存的待办事项
			AsyncStorage.getItem('todolists', (errs, result) => {
				if (result) {
					let _arr = result.split('^')
					let _temp = _arr.map((elem) => {
						return {
							isDone: /true/.test(elem.split('/')[0]) ? true : false,
							category: elem.split('/')[1],
							text: elem.split('/')[2]
						}
					})
					let isAllChecked = false;
					if (_temp.every((elem) => elem.isDone)) {
						isAllChecked = true;
					}
					this.setState({
						todos: _temp,
						isAllChecked
					})
				}
			});
		}
		// 判断是否所有任务的状态都完成，同步底部的全选框
	allChecked() {
		let isAllChecked = false;
		if (this.state.todos.every((todo) => todo.isDone)) {
			isAllChecked = true;
		}
		this.setState({
			todos: this.state.todos,
			isAllChecked: isAllChecked
		});
	}

	// 添加任务，是传递给Header组件的方法
	addTodo(todoItem) {
		this.state.todos.push(todoItem);
		this.allChecked();
	}

	// 改变任务状态，传递给TodoItem和Footer组件的方法
	changeTodoState(index, isDone, isChangeAll = false) {
		if (isChangeAll) {
			this.setState({
				todos: this.state.todos.map((todo) => {
					todo.isDone = isDone;
					return todo;
				}),
				isAllChecked: isDone
			})
		} else {
			this.state.todos[index].isDone = isDone;
			this.allChecked();
		}
	}

	// 清除已完成的任务，传递给Footer组件的方法
	clearDone() {
		let todos = this.state.todos.filter(todo => !todo.isDone);
		this.setState({
			todos: todos,
			isAllChecked: false
		});
	}

	// 删除当前的任务，传递给TodoItem的方法
	deleteTodo(index) {
		this.state.todos.splice(index, 1);
		this.setState({
			todos: this.state.todos
		});
	}

	componentDidUpdate(nextProp) {
		let todoName = this.state.todos.map((elem) => {
			return elem.isDone + '/' + elem.category + '/' + elem.text
		})
		let todoString = todoName.join('^')
		AsyncStorage.setItem('todolists', todoString);

	}

	render() {
		let props = {
			todoCount: this.state.todos.length || 0,
			todoDoneCount: (this.state.todos && this.state.todos.filter((todo) => todo.isDone)).length || 0
		};
		return (
			<View style={styles.container}>
                <TodoHeader addTodo={this.addTodo.bind(this)}/>
                <TodoMain deleteTodo={this.deleteTodo.bind(this)} todos={this.state.todos} changeTodoState={this.changeTodoState.bind(this)}/>
                <TodoFooter isAllChecked={this.state.isAllChecked} clearDone={this.clearDone.bind(this)} {...props} changeTodoState={this.changeTodoState.bind(this)}/>
            </View>
		)
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		backgroundColor: '#F5FCFF',
	}
});