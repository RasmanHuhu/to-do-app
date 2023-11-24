import "./styles/App.css";
import MexiHat from "./styles/sombrero_3798267.png";
import ToDoLogo from "./styles/list_8476658.png";
import ToDoForm from "./components/ToDoForm";
import ToDoList from "./components/ToDoList";
import { useState, useEffect } from "react";
import { fetchData } from "./util/persistence.js";


//tomt objekt
const blankTask = { id: '', name: '', urgency: '' };

function App() {

  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(blankTask);

  const APIURL = "http://localhost:3000/api/";

  //EDIT
function editTask(task) {
  setTaskToEdit(task);
}

//MUTATE - opdater og hvis ikke -> opret.
function mutateTask(task) {
  if (task.id != '') {
    updateTask(task);
  } else {
    createTask(task);
  }
}

//UPDATE
function updateTask(task) {
  console.log('update');
  fetchData(
    `${APIURL}/${task.id}`,
    (task) => {
      setTasks(
        tasks.map((t) => (t.id === task.id ? { ...task } : t))
      );
    },
    'PUT',
    task
  );
}

function createTask(task) {
  console.log('create');
  fetchData(
    APIURL,
    (task) => setTask([...tasks, task]),
    'POST',
    task
  );
}

//GET'er
  function getTasks(callback) {
    fetchData(APIURL, callback);
  }

  //DELETE
  function deleteTaskById(taskId) {
    // Fjern via API - JSONServer
    fetchData(`${APIURL}/${taskId}`, () => {}, 'DELETE');
    // Fjern fra persons array via setTask()
    setTasks([...tasks.filter((t) => t.id != taskId)]);
  }

  useEffect(() => {
    getTasks((data) => setTasks(data));

  }, []);
    

  return (
    <div>
      <img src={MexiHat} width="100" height="100" alt="mexi hat"/>
      <img src={ToDoLogo} width="100" height="100" alt="logo jaja"/>
      <h1>Amigos ToDo-DB</h1>
      
      
      <ToDoForm
        blankTask={blankTask}
        taskToEdit={taskToEdit}
        mutateTask={mutateTask}
      />

      <ToDoList
        tasks={tasks}
        deleteTaskById={deleteTaskById}
        editTask={editTask}
        doneTask={deleteTaskById}
      />
    </div>
  );
}

export default App;
