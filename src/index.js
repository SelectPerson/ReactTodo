import React from 'react';
import ReactDOM from 'react-dom';

import TodoList from './components/todoList/todoList';
import AppHeader from './components/appHeader/appHeader';
import SearchPanel from './components/searchPanel/searchPanel';
import ItemStatusFilter from './components/itemStatusFilter/itemStatusFilter';
import ItemAddForm from './components/itemAddForm/itemAddForm';

import './index.css';

export default class App extends React.Component {

    maxID = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink BestCoffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        filter: 'active' // All, Active, Done
    };
    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxID++
        };

    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({ todoData }) => {
            const newArr = [
                ...todoData,
                newItem
            ];
            return {
                todoData: newArr
            }
        });
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);
            const newArray = [...before, ...after];
            console.log(newArray);
            return {
                todoData: newArray
            };
        });
    };
    onToggleProperty(arr, id, propertyName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = { ...oldItem,
            [propertyName]: !oldItem[propertyName] };
        console.log(newItem);
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    };
    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.onToggleProperty(todoData, id, 'done')
            };
        });
        console.log('Toggle Done: ',id)
    };
    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.onToggleProperty(todoData, id, 'important')
            };
        });
        console.log('Toggle Important: ',id);
    };

    search(items, term) {
        if(term.length === 0) return items;
        return items.filter((item) => item.label.indexOf(term) > -1);
    }

    onSearchChange = (term) => {
      this.setState({term});
    };
    onFilterChange = (filter) => {
        this.setState({ filter });
    };
    filter(items, filter) {
        switch (filter) {
            case 'all': return items;
            case 'active': return items.filter((item) => !item.done);
            case 'done': return items.filter((item) => item.done);
            default: return items;
        }
    }

    render() {

        const doneCount = this.state.todoData.filter((el) => el.done).length;
        const todoCount = this.state.todoData.length - doneCount;
        const visibleItems = this.filter(
            this.search(this.state.todoData, this.state.term), this.state.filter);

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={this.state.filter} onFilterChange={this.onFilterChange}/>
                </div>
                <TodoList
                    todos={visibleItems}
                    onDeleted={ this.deleteItem }
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        );
    }

};

ReactDOM.render(<App/>, document.getElementById('root'));

