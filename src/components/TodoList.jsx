import { useContext } from "react";
import TodoItem from "./TodoItem";
import { TasksContext } from "../context/TasksContext";

const TodoList = () => {
  const { tasks, filteredTasks } = useContext(TasksContext);

  const hasTasks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredTasks?.length === 0;

  if (!hasTasks) {
    return <div className="todo__empty-message">No Tasks</div>;
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return <div className="todo__empty-message">Tasks not found</div>;
  }

  return (
    <ul className="todo__list">
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem key={task.id} className="todo__item" {...task}>
          {task.title}
        </TodoItem>
      ))}
    </ul>
  );
};

export default TodoList;
