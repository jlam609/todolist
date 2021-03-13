import { Task } from "./actions";

interface DefaultState {
  loggedIn: Boolean;
  tasks: Array<Task>;
}

const defaultState: DefaultState = {
  loggedIn: false,
  tasks: [],
};

const reducer = (state: DefaultState = defaultState, action): DefaultState => {
  switch (action.type) {
    default:
      return state;
    case "Login":
      return {
        ...state,
        loggedIn: true,
      };
    case "Logout":
      return {
        ...state,
        loggedIn: false,
      };
    case "SetTasks":
      return {
        ...state,
        tasks: action.tasks,
      };
  }
};

export default reducer;
