import React, { useState } from "react";

import ToDo from "./toDos/ToDo";
import UpdateForm from "./toDos/UpdateForm";
import AddTaskForm from "./toDos/AddTaskForm";

import "./TodoContainer.css";
import "bootstrap/dist/css/bootstrap.min.css";

function TodoContainer(props) {
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");
  const [toDo, setToDo] = useState(props.jsonTodos);

  const addTask = () => {
    if (newTask) {
      let newEntry = {
        id: Date.now(),
        title: newTask,
        completed: false,
      };
      setToDo([newEntry, ...toDo]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };

  const markDone = (id) => {
    let completeTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setToDo(completeTask);
  };
  //Cancel update
  const cancelUpdate = () => {
    setUpdateData("");
  };

  //Change task for update
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      completed: updateData.completed ? true : false,
    };
    setUpdateData(newEntry);
  };

  //Update Task
  const updateTask = () => {
    let filterRecord = [...toDo].filter((task) => task.id !== updateData.id);
    let UpdatedObject = [updateData, ...filterRecord];
    setToDo(UpdatedObject);
    setUpdateData("");
  };

  return (
    <React.Fragment>
      {/* heading of ToDo App  */}
      <div className="container">
      <h1 id="todo-heading"> ToDo List</h1>
        {/*Rendering Two Comp updating Task  && for Adding a New Task  */}
        {updateData && updateData ? (
          <UpdateForm
            updateData={updateData}
            changeTask={changeTask}
            updateTask={updateTask}
            cancelUpdate={cancelUpdate}
          />
        ) : (
          <AddTaskForm
            newTask={newTask}
            setNewTask={setNewTask}
            addTask={addTask}
          />
        )}

        {/* Display ToDos  */}
        <ToDo
          toDo={toDo}
          markDone={markDone}
          setUpdateData={setUpdateData}
          deleteTask={deleteTask}
        />
      </div>
    </React.Fragment>
  );
}

//finally Export TodoContainer File
export default TodoContainer;
