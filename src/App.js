import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCircleCheck, faTrashCan} from  "@fortawesome/free-solid-svg-icons"

import "./App.css";

function App() {
  const [todo, setTodo] = useState([]);

  //new tast
  const [newTask, setNewTask] = useState("");
  const [updatedata, setUpdateData] = useState("");

  const addTask = () => {
    if (newTask) {
      let num = todo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setTodo([...todo, newEntry]);
      setNewTask("");
    }
  };
  const deleteTask = (id) => {
    let newTask = todo.filter( task => task.id !== id);
    setTodo(newTask)
  };
  const markDone = (id) => {
let newTask = todo.map(task => {
  if (task.id === id) {
return ({...task, status: !task.status })
  }
  return task;
})
setTodo(newTask);
  };
  const cancelUpdate = (id) => {
    setUpdateData('');
  };
  const changeTask = (e) => {
    let newEntry = {
      id: updatedata.id,
      title: e.target.value ,
      status: updatedata.status ? true : false
    }
    setUpdateData(newEntry)
  };
  const updateTask = () => {
    let filterRecords = [...todo].filter (task => task.id !== updatedata.id);
    let updatedObject= [...filterRecords, updatedata]
    setTodo(updatedObject);
    setUpdateData('')
  };
  return (
    <div className="container App mb-5">
    <br/><br/>

      <h2>Marve-forte todoApp </h2>
      <br/><br/>
      { /** Update task */}
      {updatedata && updatedata  ? (
        <div className="row">
      <div className="col">
        <input 
        value={ updatedata && updatedata.title}
        onChange={(e) => changeTask(e)}
        className=" form-control form-control-lg"/>
      </div>
     <div className="col-auto">
      <button  
      onClick={updateTask}
      className="btn btn-lg btn-success"> Update</button>
      <button 
      onClick={cancelUpdate} className="btn ms-2 btn-lg btn-warning  "> Cancel</button>
     </div>
     </div>
      ) : (
     
     <div className="row">
      <div className="col">
        <input 
           value={newTask}
           onChange={(e)=> setNewTask(e.target.value) }
           className=" form-control form-control-lg"/>
      </div>
     <div className="col-auto">
      <button className="btn btn-lg btn-success"
          onClick={addTask}> Add task</button>
     </div>
     </div>
        
      ) }
      
      

      { /*  Display toDos */ }
      {todo && todo.length ? "" : "no task"}
      {todo &&
        todo.sort((a,b) => a.id > b.id ? 1 : -1)
        .map((task, index) => {
          return (
            <React.Fragment  key={task.id}>
              <div className="col mt-4 taskBg ">
              <div className={task.status ? 'done' : ""}>
                <span className="taskNumber">{index + 1}</span>
                <span className="taskText">{task.title}</span>
              </div>
              <div className="iconWrap">
                <span  title=" Completed / Not completed " onClick={(e) => markDone(task.id)}> <FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon></span>
                { task.status ? null : (
                  <span title=" Edit"
                  onClick={() => setUpdateData({ id : task.id,
                  title: task.title,
                  status: task.status ? true : false
                   })}> <FontAwesomeIcon icon={faPen}>

                  </FontAwesomeIcon></span>
                )}
              
                <span title=" Delete " onClick={() => deleteTask(task.id)}> <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon></span>
              </div>
              </div>
            </React.Fragment>
          );
        })}
    </div>
  );
}

export default App;
