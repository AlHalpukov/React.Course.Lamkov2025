import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useTasksLocalStorage from "./useTasksLocalStorage";

const useTasks = () => {
  const { savedTasks, saveTasks } = useTasksLocalStorage();

  const [tasks, setTasks] = useState(
    savedTasks ?? [
      { id: "task-1", title: "Купить молоко", isDone: false },
      { id: "task-2", title: "Погладить кота", isDone: true },
      { id: "task-3", title: "Привязать коня", isDone: true },
    ]
  );

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const newTaskInputRef = useRef(null);

  useEffect(() => {
    saveTasks(tasks);
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

  const addTask = useCallback((title) => {
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
      title,
      isDone: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskTitle("");
    setSearchQuery("");
    newTaskInputRef.current?.focus();
  }, []);

  return {
    tasks,
    filteredTasks,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
  };
};

export default useTasks;
