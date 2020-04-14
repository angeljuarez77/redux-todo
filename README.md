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
*/

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

/* Action Creators
 * Are just functions that compose a JS object and then returns the said JS object
 * The object they build NEED a property called "type"
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

// Remember to export everything!!!!!!!
```
</details>

### Now let us try and create an action just for deleting an item inside of our todo list.
Hint: What do you think the action types and action creators should look like?

2) Create Reducers
    * Reducers tell us HOW the actions affect our *_store_*

