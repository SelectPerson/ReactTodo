import React from 'react';
import TodoListItem from '../todoListItem/todoListItem';
import './todoList.css'


const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
    const elements = todos.map((item, index) => {
        const { id, ...itemProps } = item;
        return (
            <li key={id} className="list-group-item">
                {/*<TodoListItem label={item.label} important={item.important} />*/}
                <TodoListItem
                    { ...itemProps }
                    onDeleted = {() => onDeleted(id) }
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleDone={() => onToggleDone(id)}
                />
            </li>
        )
    });
    return (
        <ul className="list-group todo-list">
            {elements}
        </ul>
    );
};

export default TodoList;