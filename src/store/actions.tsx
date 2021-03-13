interface Action {
  type: String;
  tasks?: Array <Task>
}
export interface Task {
    id: Number;
    name: String;
    edit?:boolean
}
export const login = (): Action => ({
  type: "Login",
});
export const logout = (): Action => ({
  type: "Logout",
});

export const setTasks = (tasks: Array<Task>): Action => ({
    type: 'SetTasks',
    tasks
})