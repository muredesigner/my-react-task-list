import './App.css';
import TaskForm from "./Components/TaskForm";
import Task from "./Components/Task";
import {useEffect, useState} from "react";

function App() {
  const [tasks,setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  /* este hook guarda el valor de 'tasks' en el almacenamiento local cada vez que cambia. Esto puede ser útil para la persistencia de datos a través de actualizaciones de página o sesiones del navegador */

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks || []);
  }, []);
/*   este hook recupera el valor de 'tasks' del almacenamiento local y actualiza el estado del componente con este valor cuando el componente es renderizado por primera vez. Esto puede ser útil para restaurar datos que se guardaron previamente en el almacenamiento local */

  function addTask(name) {
    setTasks(prev => {
      return [...prev, {name:name,done:false}];
    });
  }
/*   esta función añade un nuevo objeto tarea con el nombre dado */

  function removeTask(indexToRemove) {
    setTasks(prev => {
      return prev.filter((taskObject,index) => index !== indexToRemove);
    });
  }
/*   esta función elimina el objeto tarea en el índice especificado de la matriz 'tasks' */

  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }
/*   esta función actualiza la propiedad 'done' del objeto tarea en el índice especificado en el array 'tasks' */

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;

  function getMessage() {
    const percentage = numberComplete/numberTotal * 100;
    if (percentage === 0) {
      return 'Intente hacer al menos una 🙏';
    }
    if (percentage === 100) {
      return '¡Buen trabajo por hoy! 🚀';
    } 
    return 'Sigue así 💪🏻';
  }
/*   este código calcula el porcentaje de tareas que están completas y define una función que devuelve un mensaje basado en este porcentaje */

  function renameTask(index,newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    })
  }
/*   esta función actualiza la propiedad 'name' del objet  */

  return (
    <main>
      <h1>{numberComplete}/{numberTotal} Tareas Completadas</h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask} />
      {tasks.map((task,index) => (
        <Task key={index} {...task}
              onRename={newName => renameTask(index,newName)}
              onTrash={() => removeTask(index)}
              onToggle={done => updateTaskDone(index, done)} />
      ))}
    </main>
  );
}

export default App;
