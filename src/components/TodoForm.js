import React, { useState, useEffect, useRef } from 'react'

// COMPONENTE HIJO DE TODOLIST DEL CUAL RECIBE PROPS
function TodoForm(props) {
  // Si se esta editando un todo mostrara el valor que ya tenia pero si se esta creando un todo sera un string vacio
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  /* Usamos una referencia para capturar el input del DOM
  Y con la funcion de useEffect cuando se renderiza el componente hacemos foco en esa referencia(input)*/
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  // Usamos un estado local para ir actualizando el estado del input con el valor que se ingrese
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  /* funcion para prevenir el submit del formulario
  luego recibe una funcion por props para agregar un
   objeto al array de objetos con un id y el valor del input local */
  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    setInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="Update your item"
            value={input}
            name="text"
            className="todo-input edit"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="todo-button edit">Update</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Add a todo"
            value={input}
            name="text"
            className="todo-input"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="todo-button">Add todo</button>
        </>
      )}
    </form>
  );
}

export default TodoForm