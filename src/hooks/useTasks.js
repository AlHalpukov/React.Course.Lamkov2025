import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import tasksAPI from "../api/tasksAPI";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const newTaskInputRef = useRef(null);

  useEffect(() => {
    newTaskInputRef.current?.focus();

    tasksAPI.getAll().then(setTasks);
  }, []);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm("Are you sure?");
    if (isConfirmed) {
      tasksAPI.deleteAll(tasks).then(setTasks([]));
    }
  }, [tasks]);

  const deleteTask = useCallback(
    (taskId) => {
      tasksAPI
        .delete(taskId)
        .then((deletedTask) =>
          setTasks(tasks.filter((task) => task.id !== deletedTask.id))
        )
        .catch((error) =>
          console.error(`Error when deleting task with id ${taskId}`, error)
        );
    },
    [tasks]
  );

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      tasksAPI.toggleComplete(taskId, isDone).then(
        setTasks(
          tasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, isDone };
            }
            return task;
          })
        )
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
      title,
      isDone: false,
    };

    tasksAPI.add(newTask).then((addedTask) => {
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      setNewTaskTitle("");
      setSearchQuery("");
      newTaskInputRef.current?.focus();
    });
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
