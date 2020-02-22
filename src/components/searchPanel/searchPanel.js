import React from 'react';

import './searchPanel.css'

export default class SearchPanel extends React.Component {

    state = {
        term: ''
    };
    onSearchOnChange = (e) => {
        const term = e.target.value;
        this.setState({ term });
        this.props.onSearchChange(term);
    };
    render() {
        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="type to search"
                   onChange={this.onSearchOnChange}
            />
        );
    }
};
