import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setTasks } from "../store/actions";
import { StoreState } from "../store/store";

const TaskList: React.FC = () => {
  const {tasks} = useSelector((state:StoreState) => state)
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get("/api/tasks").then((res) => {
      const { tasks } = res.data;
      if (tasks) dispatch(setTasks(tasks));
    });
  }, []);
  return (
    <div>
      {tasks && tasks.length
        ? tasks.map((task, idx) => {
            return task.edit ? (
              <div className="task-container" key={task.id}>
                <input
                  value={task.name}
                  onChange={(e) => {
                    task.name = e.target.value;
                    dispatch(setTasks([...tasks]));
                  }}
                />
                <button
                  className="save-task"
                  onClick={async (e) => {
                    e.preventDefault();
                    await axios.put("/api/tasks", {
                      task,
                    });
                    task.edit = false;
                    dispatch(setTasks([...tasks]));
                  }}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="task-container" key={task.id}>
                <li>{task.name}</li>
                <i
                  className="fa fa-edit icon-task"
                  onClick={() => {
                    task.edit = !task.edit;
                    dispatch(setTasks([...tasks]));
                  }}
                />
                <i
                  className="fa fa-trash icon-task1"
                  onClick={async() => {
                    await axios.delete(`/api/tasks/${task.id}`)
                    tasks.splice(idx, 1);
                    dispatch(setTasks([...tasks]));
                  }}
                />
              </div>
            );
          })
        : null}
    </div>
  );
};

export default TaskList;
