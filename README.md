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
<summary>*_Still need more guidance?_*</summary>
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
        * This means that if you put certain arguments in then it will always produce the same output. There won't be any unexpected side effects.
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
 * The if statement handles the possible situation: application state doesn't exist.
 * Then we have a switch statement.
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
We could seperate our concerns.

For now we are not going to split up our code since it introduces a few new API's and it may make it a little harder to follow along. But! If you want to split your code up then start reading the text in this link!
https://redux.js.org/basics/reducers#splitting-reducers

3) Create redux store. (Your application state)
<details open>
<summary>Here is how we do that!</summary>
<br>

```javascript
// FILE STRUCTURE: src/store.js
import { createStore } from 'redux'
import todoApp from './reducers'

const store = createStore(todoApp)
```
</details>

4) Now let's quickly build a UI (low priority. Not necessary to know exactly why decisions were made)
