import {useState} from "react";

export default function TaskForm({onAdd}) {
  const [taskName,setTaskName] = useState('');
  function handleSubmit(ev) {
    ev.preventDefault();
    onAdd(taskName);
    setTaskName('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text"
             value={taskName}
             onChange={ev => setTaskName(ev.target.value)}
             placeholder="Próxima tarea..."/>
      <button><strong>Agregar</strong></button>
    </form>
  );
}

/* este componente renderiza un formulario con un campo de entrada y un botón. Cuando se envía el formulario, se llama a la función 'onAdd' con el valor actual del campo de entrada como argumento, y luego se borra el campo de entrada */
