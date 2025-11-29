import { useRef } from "react";

const useIncompleteTaskScroll = (tasks) => {
  const firstIncompleteTaskRef = useRef(null);
  const firstIncompleteTaskId = tasks.find((task) => task.isDone === false)?.id;

  return { firstIncompleteTaskRef, firstIncompleteTaskId };
};

export default useIncompleteTaskScroll;
