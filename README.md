# React TODO List

1) Our first step in using redux is to create actions
    * Action types
    * Action Creators
    * Dispatch
        * Unbounded actions
        * Bounded action reducers
<details open>
<summary>How do I make all of this?</summary>
<br>

```javascript
// FILE STRUCTURE: src/actions/actions.js

/*
 * Here we have our Action Types.
 * Remember that they SHOULD be strings attached to a const variable declaration.
 * For now we'll create them in the same file as everything else.
 *
 * A way to look at it is to think of Action Types as the heading of an email,
 * where the email heading tells you what to do in a very condensed way.
 * But remember the heading is just a description. It won't have all the instructions.
*/
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * This is just going to be an object where we could store all of our visibility options.
 * Remember that when we use VisibilityFilters.property in the future it will just return a string
 * So instead of making multiple const variables like above where we'll basically repeat ourselves
 * let's just make an object. Where we'll have all of our options instead of having all our visibility
 * options scattered.
*/
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/* Action Creators
 *
 * Action Creators are just functions that compose a JS object adnd then return the said JS object
 * The objects they build NEED a property called "type"
 * The rest is up to your discretion.
*/
export function addTodo(descriptionOfTodo) {
    return {
        type: ADD_TODO,
        text: descriptionOfTodo
    };
}

export function toggleTodo(index) {
    return { type: TOGGLE_TODO, index };
}

export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter }
}

// Remember to export everything!!!!!!!
```
</details>

### Now let us try and create an action just for deleting an item inside of our todo list.
*Hint*: What do you think the action types and action creators should look like in order to delete an item?
<details>
<summary>Still need more guidance? Check here...</summary>
<br>

1) Create your delete todo Action Type. Should be a const variable set to a string.
2) Make your Action Creators. They should be functions that compose an object and return that object.
3) Then you will have to export these 2 things.
</details>

2) Create Reducers
    * Reducers tell us HOW the actions affect our *_store_*
    * Remember that if there is not any existing application state we'll have to create it.
    * Reducers shouldn't produce side effects.
        * They should be *_pure functions_*
        * This means that if you put certain arguments in then it will always produce the same output. There won't be any unexpected side effects OR unexpected outputs.
        * In our Reducers the arguments are the previous state AND our action.
<details open>
<summary>Let us make our initial reducer!!</summary>
<br>

```javascript
// FILE STRUCTURE: src/reducers/reducers.js

/*
 * Here below we import the different const variables that describe our actions type.
*/
import {
  VisibilityFilters,
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
} from '../actions/actions.js';

/*
 * We will create an initialState object purely for the sake of creating a state for our application
 * just in case we don't already have one.
*/
const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL, // this equates to string 'SHOW_ALL'
    todos: [],
}

/*
 * Here is our reducer. The function that decides how our ACTION will act upon the application state.
 * The if statement handles this possible situation: application state doesn't exist.
 * Then after the if we have a switch statement.
 * So basically IF app state exists --> then check what the action.type is
 * We COULD use an IF/ELSEIF statement instead of SWITCH but when you have hundreds of actions.
 * That'll be (in Angels humble opinion) too much
 * and less readable.
*/
function todoApp(state, action) {
  // This if statement is ONLY to make an application state obj just in case one didn't exist already
  if(typeof state === 'undefined') {
    return initialState;
  }

  // Now we handle all the other possibilities.
  switch(action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false,
          }
        ]
      })
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.map((todo, index) => {
          if(index === index.action) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          }
          return todo;
        })
      })
    default:
      return state;
  }
}
```
</details>

### Do you see anything odd about the code above?
Well there is quite a lot going on inside of the one switch statement.
It's a little dense and hard to read but ALSO it mixes a lot of different concerns.
We are handling visual options and informative options in the same function.
We could seperate our concerns. This is a bit dense so if anything is unclear you could check on this link.
https://redux.js.org/basics/reducers#splitting-reducers
<details open>
<summary>Let us split up all of the todo list functionality from the entire reducer.</summary>
<br>

```javascript
// FILE STRUCTURE: src/reducers/reducers.js

/*
 * Here below we have ONLY the todo list functionality part of our reducer.
 * this todos function is a reducer in itself. We could have multiple reducers.
 * at some point there will be multiple files for different reducers which is why
 * we made a directory ./reducers/ for this.
 * For now we will only use one file.
*/
function todos(state = []/* if state is undefined set it equal to an empty array */, action) {
  switch(action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map( (todo, index) => {
        if(index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo;
      })
    case default:
      return state;
  }
}

/*
 * This below is ALSO another reducer
 * Because of how we are calling the other reducer(todos)
 * We are only giving todos(state, action) an array as its first argument.
 * This means that todos() could only update that little tiny piece of the
 * application state!
 * This is called reducer composition...(think how we have to "compose" the reducers to work together as one)
 * A fundmental pattern of redux!
*/
function todoApp(state = initialState/* if state is undefined set it to initialState */, action) {
  switch(action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: todos(state.todos, action)
      })
  }
}
```
</details>

<details open>
<summary>Now let's take it a step futher and split up the view options reducer into its own thing</summary>
<br>

```javascript
// FILE STRUCTURE: src/reducers/reducers.js

/*
 * Let us destructure what will be our default view option.
 *
 * Remember that with every reducer we have to handle a situation
 * where the application state doesn't exist. And we'll have to assign
 * it something if it doesn't exist. Now that we're going to create a
 * visibility reducer we'll have to handle an undefined state.
*/
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL /* if the state is undefined then set it to SHOW_ALL option */, action) {
  switch(action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state;
  }
}
```
</details>

<details open>
<summary>Now let us combine both of our newly created reducers.</summary>
<br>

```javascript
/*
 * This is one way to combine multiple reducers into a single one.
 * But there is also another way to do it with a redux function.
 * Let's see how we would do it with the redux function now...
*/
function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

/*
 * Now we export our reducer in order to use it
 * in different parts of our application.
*/
export default todoApp;
```
</details>

3) Create redux store. (Your application state)
<details open>
<summary>Here is how we do that!</summary>
<br>
Step 1: Install redux. npm install redux react-redux
Step 2: Create your store.
```javascript
// FILE STRUCTURE: src/store.js

/*
 * We need to use createStore which comes from our redux package that we installed.
 * We also have to import our apps ENTIRE reducer.
*/
import { createStore } from 'redux'
import todoApp from './reducers'

/*
 * We could only pass in ONE REDUCER to createStore.
 * If you have multiple reducers (which you most likely will)
 * then you'll have to use another function provided by redux in order
 * to combine all reducers to bring it all into
 * createStore() at once.
*/
const store = createStore(todoApp)
```
</details>

4) Now let's quickly build a UI (Low priority. Not necessary to know exactly why decisions were made)
<details open>
<summary>Necessary code. Just copy and paste into their respective files.</summary>
<br>

```javascript
// FILE STRUCTURE: src/components/Todo.js

import React from 'react';

function Todo(props) {
  return(
    <li onClick={ props.onClick } style={{ textDecoration: props.completed ? 'line-through' : 'none' }}>
      { props.text }
    </li>
  )
}

export default Todo;
```

```javascript
// FILE STRUCTURE: src/components/TodoList.js

import React from 'react';
import Todo from './Todo.js';

function TodoList(props) {
  return(
    <ul>
      {
        props.todos.map( (todo, index) => <Todo
          key={ index }
          onClick={ () => props.onTodoClick(index) }
          { ...props.todo }
        /> )
      }
    </ul>
  )
}

export default TodoList;
```

```javascript
// FILE STRUCTURE: src/components/Link.js
import react from 'react';

function Link(props) {
  if(props.active) {
    return <span>{ props.children }</span>
  }

  return(
    <a
      href=""
      onclick={ e => {
        e.preventdefault();
        props.onclick();
      }}
    >{ props.children }</a>
  )
}

export default Link;
```
```javascript
// FILE STRUCTURE: src/components/Footer.js
import React from 'react';
import FilterLink from '../containers/FilterLink';
import { VisibilityFilters } from '../actions/actions.js';

function Footer() {
  return(
    <p>
      Show: <FilterLink filter={ VisibilityFilters.SHOW_ALL }>All</FilterLink>
    {', '}
      <FilterLink filter={ VisibilityFilters.SHOW_ACTIVE }>Active</FilterLink>
    {', '}
      <FilterLink filter={ VisibilityFilters.SHOW_COMPLETED }>Active</FilterLink>
    </p>
  )
}

export default Footer;
```
</details>
