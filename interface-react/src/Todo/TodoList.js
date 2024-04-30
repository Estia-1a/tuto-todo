import React, { Component } from 'react';

class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            userInput: '',
            items: []
        }
    }

    componentDidMount() {
        this.fetchTodos();
    }

    fetchTodos() {
        fetch('http://localhost:8000/todos')
            .then(response => response.json())
            .then(data => {
                this.setState({ items: data.data });
            })
            .catch(error => {
                console.error('410:Error fetching todos:', error);
            });
    }

    onChange(event) {
        this.setState({
            userInput: event.target.value
        });
    }

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
            this.setState({
                userInput: '',
                items: [...this.state.items, data.data]
            });
        })
        .catch(error => {
            console.error('411:Error adding todo:', error);
        });
    }

    deleteTodo(index) {
        fetch(`http://localhost:8000/todos/${index}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('412:Failed to delete todo');
            }
            return response.text();
        })
        .then(() => {
            const updatedItems = [...this.state.items];
            updatedItems.splice(index, 1);
            this.setState({ items: updatedItems });
        })
        .catch(error => {
            console.error('413:Error deleting todo:', error);
        });
    }    
    
    renderTodos() {
        return this.state.items.map((item, index) => {
            return (
                <div key={index}>
                    {item} | <button onClick={() => this.deleteTodo(index)}>X</button>
                </div>
            )
        });
    }    

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
                            />
                        </form>
                        <button className="btn btn-primary mb-2 ml-2"
                            onClick={this.addTodo.bind(this)}>Add</button>
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