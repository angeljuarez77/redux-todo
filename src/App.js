import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {
          text: 'create react app',
        },
        {
          text: 'create actions, action types, and action creators',
        },
        {
          text: 'create reducers',
        },
        {
          text: 'create store'
        }
      ]
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ul>
            {
              this.state.todos.map(todo => <li>{ todo.text }</li>)
            }
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
