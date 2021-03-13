import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { logout, setTasks } from "../store/actions";
import { StoreState } from "../store/store";
import TaskList from "./tasklist";

const Tasks: React.FC = () => {
  const { loggedIn, tasks } = useSelector((state: StoreState) => state);
  const history = useHistory();
  if (!loggedIn) {
      history.push("/")
  }
  const dispatch = useDispatch();
  let [filter, setFilter] = useState("");
  const [addTask, setAdd] = useState(false);
  const [task, setTask] = useState("");
  return (
    <div className="taskList">
      <div className="logout-container">
        <button
          className="logout-button"
          onClick={(e) => {
            e.preventDefault;
            dispatch(logout());
          }}
        >
          Logout
        </button>
      </div>
      <h1 className="task-header">My To-Do List</h1>
      <div className="tasks-container">
        <div className='searchbar'>
          <i className="fa fa-search icon"></i>
          <input
            className="input-field-tasks"
            placeholder="Search"
            value={filter}
            onChange={async (e) => {
              await setFilter(e.target.value);
              let temp = e.target.value;
              const { tasks } = (
                await axios.get(`/api/tasks?filter=${temp}`)
              ).data;
              dispatch(setTasks(tasks));
            }}
          ></input>
          <button
            className="task-create"
            onClick={(e) => {
              e.preventDefault();
              setAdd(true);
            }}
          >
            New
          </button>
        </div>
        <div>
          {addTask && (
            <div className='task-container'>
              <input
                placeholder="Add New Task Here"
                value={task}
                onChange={(e) => {
                  if (
                    e.target.value.length >= 1 &&
                    e.target.value.length <= 25
                  ) {
                    setTask(e.target.value);
                  }
                }}
              ></input>
              <button
                className="save-task"
                onClick={async (e) => {
                  e.preventDefault();
                  const { taskData } = (
                    await axios.post("/api/tasks", {
                      task,
                    })
                  ).data;
                  setAdd(false);
                  setTask("");
                  dispatch(setTasks([...tasks, taskData]));
                }}
              >
                Save
              </button>
            </div>
          )}
        </div>
        <TaskList />
      </div>
    </div>
  );
};

export default Tasks;
