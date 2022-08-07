import React, { useState } from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm'

// COMPONENTE PADRE
function TodoList() {
  // estado con un array y objetos dentro con el valor y id de cada todo
  const [todos, setTodos] = useState([]);

  // Funcion que se pasa por props a TodoForm para agregar un todo
  const addTodo = todo => {
    // Este condicional toma el texto del todo y logra eliminar los espcios.
    if(!todo.text || /^\s*$/.test(todo.text)) {
        return;
    }

    /* Adding the new todo to the top of the list. */
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  }

  /**
   * If the newValue.text is empty or contains only whitespace, then return. Otherwise, update the todo
   * with the newValue.
   * @param todoId - The id of the todo item that we want to update.
   * @param newValue - This is the new value that we want to update the todo with.
   * @returns the updated todo item.
   */
  const updateTodo = (todoId, newValue) => {
    if(!newValue.text || /^\s*$/.test(newValue.text)) {
        return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
  }

  /**
   * It takes an id as an argument, creates a new array from the todos array, filters out the todo with
   * the matching id, and then sets the todos array to the new array.
   */
  const removeTodo = id => {
    const removeArr = [...todos].filter(todo => todo.id !== id)
    setTodos(removeArr);
  }


  /**
   * If the id of the todo matches the id of the todo that was clicked, then toggle the isComplete
   * property of that todo.
   */
  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
        if(todo.id === id){
            todo.isComplete = !todo.isComplete
        }
        return todo
    })
    setTodos(updatedTodos);
  }

  return (
    <div>
        <h1>What's the Plan for Today</h1>
        <TodoForm onSubmit={addTodo}/>
        <Todo 
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
        />
    </div>
  )
}

export default TodoList