import React, { Component } from 'react';

class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            userInput: '',
            items: []
        };
        this.addTodo = this.addTodo.bind(this);
    }

    // Connect the enter button with the add action
    handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.addTodo();
        }
    }

    // Updates the input value with that entered by the user
    onChange(event) {
        this.setState({
            userInput: event.target.value
        });
    }

    // Call the todos fetch function after the component is mounted in the DOM
    componentDidMount() {
        this.fetchTodos();
    }

    // Retrieve all todos by a GET request to the API
    fetchTodos() {
        fetch('http://localhost:8000/todos')
            .then(response => response.json())
            .then(data => {
                this.setState({ items: data });
            })
            .catch(error => {
                console.error('Error fetching todos:', error);
            });
    }

    // Add a todo via a POST request to the API
    addTodo() {
        const { userInput } = this.state;
        fetch('http://localhost:8000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todo: userInput }),
        })
            .then(response => response.json())
            .then(data => {
                this.fetchTodos();
                this.setState({
                    userInput: ''
                });
            })
            .catch(error => {
                console.error('Error adding todo:', error);
            });
    }

    // Delete a todo using a DELETE request to the API
    deleteTodo(id) {
        fetch(`http://localhost:8000/todos/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete todo');
                }
                return response.text();
            })
            .then(() => {
                const updatedItems = this.state.items.filter(item => item.id !== id);
                this.setState({ items: updatedItems });
            })
            .catch(error => {
                console.error('Error deleting todo:', error);
            });
    }
    
    // Render the todos list
    renderTodos() {
        return this.state.items.map(item => {
            return (
                <div key={item.id}>
                    {item.todo} | <button onClick={() => this.deleteTodo(item.id)}>X</button>
                </div>
            );
        });
    }

    // Render global
    render() {
        return (
            <div className='container'>
                <div className="row justify-content-center align-items-center main-row">
                    <div className="col shadow main-col bg-white">
                        <div className="row bg-primary text-white">
                            <div className="col  p-2"></div>
                            <h1>My Todo list</h1>
                        </div>
                    </div>
                    <div className="row justify-content-between text-white p-2">
                        <form className="form-group flex-fill mb-2">
                            <input className='form-control'
                                value={this.state.userInput}
                                type='text'
                                placeholder='Input a task...'
                                onChange={this.onChange.bind(this)}
                                onKeyDown={this.handleKeyDown.bind(this)}
                            />
                        </form>
                        <button className="btn btn-primary mb-2 ml-2"
                            onClick={this.addTodo}>Add</button>
                    </div>
                    <div className="row">
                        {this.renderTodos()}
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoList;
