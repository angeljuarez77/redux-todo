# React TODO List

1) Create actions
    * Action types
    * Action Creators
    * Dispatch
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
export const DELETE_TODO = 'DELETE_TODO';

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

export function toddleTodo(index) {
    return { type: TOGGLE_TODO, index };
}

export function deleteTodo(index) {
    return { type: DELETE_TODO, index };
}

// Remember to export everything!!!!!!!
```
</details>
