function ToDoList({ tasks, deleteTaskById, editTask, doneTask}) {
  return (
    <div>
      <h1>List of tasks to do</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Task</th>
            <th>Urgency</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.urgency}</td>
              <td>
                <button onClick={() => editTask(task.id)}>Edit</button>
                <button onClick={() => deleteTaskById(task.id)}>Delete</button>
                <button onClick={() => doneTask(task.id)}>Done</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ToDoList;
