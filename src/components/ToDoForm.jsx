import { useState, useEffect } from "react";

function ToDoForm({ blankTask, taskToEdit, mutateTask }) {
  const [task, setTask] = useState({ ...taskToEdit });

  useEffect(() => {
    setTask(taskToEdit);
  }, [taskToEdit]);

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.id;
    setTask({ ...task, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("submit", task);
    mutateTask(task);
    // callback function fra App.jsx, som enten indsætter en ny task (hvis id er tom)
    // eller opdaterer (hvis id != "")
  }

  return (
    <div>
      <h1>Add/Edit task</h1>

      <form>
        <label htmlFor="id">Id</label>
        <input
          id="id"
          type="number"
          readOnly
          placeholder="id"
          value={task.id}
        />

        <label htmlFor="name">Task</label>
        <input
          id="name"
          type="text"
          placeholder="name"
          value={task.name}
          onChange={handleChange}
        />

        <label htmlFor="urgency">Urgency</label>
        <select id="urgency" value={task.urgency} onChange={handleChange}>
          <option defaultChecked>Select urgency</option>
          <option value="not-urgent">Not urgent</option>
          <option value="urgent">Urgent</option>
          <option value="not-defined">Not defined</option>
        </select>

        <button className="m-2 btn btn-outline-success btn-sm" onClick={handleSubmit}>Update task</button>
    
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => setTask(blankTask)}
        >Reset</button>
      </form>
    </div>
  );
}

export default ToDoForm;
