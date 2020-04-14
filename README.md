# React TODO List

1) Create actions
    * Action types
    * Action Creators
    * Dispatch
        * Bounded action reducers
<details>
<summary>How do I make all of this?</summary>
<br>

```
/*
 * Here we have our Action Types.
 * Remember that they SHOULD be strings attached to a const variable declaration.
 * For now we'll create them in the same file as everything else.
*/

const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';

/* Action Creators
 * Are just functions that compose a JS object and then returns the said JS object
 * The object they build NEED a property called "type"
 * The rest is up to your discretion.
*/

function addTodo(descriptionOfTodo) {
    return {
        type: ADD_TODO,
        text: descriptionOfTodo
    };
}

function toddleTodo(index) {
    return { type: TOGGLE_TODO, index };
}

function deleteTodo(index) {
    return { type: DELETE_TODO, index };
}

```
</details>
