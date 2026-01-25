import { useEffect, useState } from "react";
import tasksAPI from "../api/tasksAPI";

const TaskPage = (props) => {
  const { params } = props;

  const taskId = params.id;
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    tasksAPI
      .getById(taskId)
      .then((taskData) => {
        setTask(taskData);
        setHasError(false);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div>
        <h2>Loading ...</h2>
      </div>
    );
  }

  if (hasError) {
    return (
      <div>
        <h2>Task Not Found!</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>{task.title}</h1>
      <h3>{task.isDone ? "Task Complete" : "Task Incomplete"}</h3>
    </div>
  );
};

export default TaskPage;
