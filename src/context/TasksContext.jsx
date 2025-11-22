import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const TasksContext = createContext({});

export const TasksProvider = (props) => {
  const { children } = props;

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
    newTaskInputRef.current?.focus();
  }, []);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm("Are you sure?");
    if (isConfirmed) {
      setTasks([]);
    }
  }, []);

  const deleteTask = useCallback(
    (taskId) => {
      setTasks(tasks.filter((task) => task.id !== taskId));
    },
    [tasks]
  );

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      setTasks(
        tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, isDone };
          }
          return task;
        })
      );
    },
    [tasks]
  );

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();
    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchQuery)
        )
      : tasks;
  }, [searchQuery, tasks]);

  const addTask = useCallback(() => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        // id: "task-" + (tasks.length + 1),
        // id: uuidv4() ?? Date.now().toString(),
        // вместо crypto можно использовать библиотеку uuid и ее метод v4()
        // для генерации Guid
        id: crypto.randomUUID(),
        //  ?? Date.now().toString(),
        // не сработал метод глобальный объект крипто в яндекс браузере
        // нужно попробовать в другом, и почитать вообще про него
        // так, как-то получилось, что он сработал, почему то )
        // и опять, что-то не работает с crypto, он генерирует одинаковый id при одинаковом
        // наименовании задачи
        // поэтому вернулся к библиотеке uuid

        //  все заработало, ошибка оказалось в другом месте
        title: newTaskTitle,
        isDone: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskTitle("");
      setSearchQuery("");
      newTaskInputRef.current?.focus();
    }
  }, [newTaskTitle]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        filteredTasks,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
