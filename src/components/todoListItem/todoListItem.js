import React from 'react';
import './todoListmItem.css';

class TodoListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            done: false,
            important: false
        };
    }
    // onLabelClick = () => {
    //     this.setState(({ done }) => {
    //         return {
    //             done: !done
    //         }
    //     });
    // };
    // onMarkImportant = () => {
    //     this.setState((state) => {
    //         return {
    //             important: !state.important
    //         }
    //     });
    // };
    render() {
        const { label, onDeleted, onToggleImportant, onToggleDone } = this.props;
        const { done, important = false } = this.state;
        let classNames = 'todo-list-item';
        if(done) {
            classNames += ' done';
        }
        if(important) {
            classNames += ' important';
        }
        return (
            <span className={classNames}>
                <span
                    className="todo-list-item-label"
                    onClick= { onToggleDone }>
                    {label}
                </span>
                <button type="button" className="btn btn-outline-success btn-sm float-right" onClick={onToggleImportant}>
                    <i className="fa fa-exclamation" />
                </button>
                <button type="button" className="btn btn-outline-danger btn-sm float-right" onClick={onDeleted}>
                    <i className="fa fa-trash-o" />
                </button>
            </span>
        );
    }
}

export default TodoListItem;