# React TODO List

1) Create actions
    * Action types
    * Action Creators
    * Dispatch
        * Unbounded actions
        * Bounded action reducers
<details>
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
 * Action Creators are just functions that compose a JS object and then return the said JS object
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

2) Create Reducers
    * Reducers tell us HOW the actions affect our *_store_*
    * Remember that if there is not any existing application state we'll have to create it.
    * Reducers shouldn't produce side effects.
        * They should be *_pure functions_*
        * This means that if you put certain arguments in then it will always produce the same output. There won't be any unexpected side effects.
        * In our Reducers the arguments are the previous state AND our action.
<details>
<summary>Let us make our initial reducer!!</summary>
<br>

```javascript
// FILE STRUCTURE: src/reducers/reducers.js

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
 * We COULD use an IF/ELSEIF statement but when you have hundreds of actions. That'll be too much
 * and less readable.
*/
function todoApp(state, action) {
    // We have to add this line in order to create an app state if one was not created before.
    if(typeof state === 'undefined') {
        return initialState;
    }

    // Now we handle our action types in order to decide how to manipulate our state
    switch(action.type) {
        case ADD_TODO:
            return Object.assign({}, state, {
                todos: [
                ...state.todos, { text: action.text, completed: false }
                ]
            })
        default:
        return state;
    }
    return state;
}
```
</details>
