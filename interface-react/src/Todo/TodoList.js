import React, { Component } from 'react';

class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            userInput: '',
            items: []
        }
    }

    onChange(event) {
        this.setState({
            userInput: event.target.value
        });
    }

    addTodo(event) {
        event.preventDefault();
        this.setState({
            userInput: '',
            items: [...this.state.items, this.state.userInput]
        });
    }

    deleteTodo(item) {
        const array = this.state.items;
        const index = array.indexOf(item);
        array.splice(index, 1);
        this.setState({
            items: array
        });
    }

    renderTodos() {
        return this.state.items.map((item) => {
            return (
                <div key={item}>
                    {item} | <button onClick={this.deleteTodo.bind(this, item)}>X</button>
                </div>
            )
        });
    }

    render() {
        return (
            <div className='container'>
                <div class="row justify-content-center align-items-center main-row">
                    <div class="col shadow main-col bg-white">
                        <div class="row bg-primary text-white">
                            <div class="col  p-2"></div>
                            <h1>Ma Todo list</h1>
                        </div>
                    </div>
                    <div class="row justify-content-between text-white p-2">
                        <form className="form-group flex-fill mb-2">
                            <input className='form-control'
                                value={this.state.userInput}
                                type='text'
                                placeholder='Renseignez un item'
                                onChange={this.onChange.bind(this)}
                            />
                        </form>
                        <button className="btn btn-primary mb-2 ml-2"
                            onClick={this.addTodo.bind(this)}>Ajouter</button>
                    </div>
                    <div className="row">
                        {this.renderTodos()}
                    </div>
                </div>
            </div>
        )
    }
}

export default TodoList;