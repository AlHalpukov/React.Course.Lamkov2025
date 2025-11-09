import { useEffect, useRef, useState } from "react";
import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";
import Button from "./Button";

const Todo = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) return JSON.parse(savedTasks);

    return [
      { id: "task-1", title: "Купить молоко", isDone: false },
      { id: "task-2", title: "Погладить кота", isDone: true },
      { id: "task-3", title: "Привязать коня", isDone: true },
    ];
  });
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const newTaskInputRef = useRef(null);
  const firstIncompleteTaskRef = useRef(null);

  const firstIncompleteTaskId = tasks.find((task) => task.isDone === false)?.id;

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    console.log("Ref -> ", newTaskInputRef);

    newTaskInputRef.current?.focus();

    // вот тут не работает так как задумано, т.к. метод focus вызывается
    // на еще не отрисованном компоненте
    // TODO нужно разобраться
  }, []);

  const deleteAllTasks = () => {
    const isConfirmed = confirm("Are you sure?");
    if (isConfirmed) {
      setTasks([]);
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskComplete = (taskId, isDone) => {
    setTasks(
      tasks.map((task) => {
        if ((task.id = taskId)) {
          return { ...task, isDone };
        }
        return task;
      })
    );
  };

  const clearSearchQuery = searchQuery.trim().toLowerCase();
  const filteredTasks =
    clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchQuery)
        )
      : tasks;

  const addTask = () => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        // id: "task-" + (tasks.length + 1),
        // id: v4() ?? Date.now().toString(),
        // вместо crypto можно использовать библиотеку uuid и ее метод v4()
        // для генерации Guid
        id: crypto.randomUUID() ?? Date.now().toString(),
        // не сработал метод глобальный объект крипто в яндекс браузере
        // нужно попробовать в другом, и почитать вообще про него
        // так, как-то получилось, что он сработал, почему то )
        title: newTaskTitle,
        isDone: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setSearchQuery("");
    }
  };

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        newTaskInputRef={newTaskInputRef}
      />
      <SearchTaskForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <TodoInfo
        total={tasks.length}
        done={tasks.filter(({ isDone }) => isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <Button
        onClick={() => {
          firstIncompleteTaskRef.current?.scroll.IntoView({
            behavior: "smooth",
          });
        }}
      >
        Show first incomplete task
      </Button>
      <TodoList
        tasks={tasks}
        filteredTasks={filteredTasks}
        firstIncompleteTaskRef={firstIncompleteTaskRef}
        firstIncompleteTaskId={firstIncompleteTaskId}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete}
      />
    </div>
  );
};

export default Todo;
