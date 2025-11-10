import Button from "./Button";
import Field from "./Field";

const AddTaskForm = (props) => {
  const { addTask, newTaskTitle, setNewTaskTitle, newTaskInputRef } = props;

  const onSubmit = (event) => {
    event.preventDefault();
    addTask();
  };
  return (
    <form className="todo__form" onSubmit={onSubmit}>
      <Field
        className="todo__field"
        label="New Task title"
        id="new-task"
        value={newTaskTitle}
        onInput={(event) => setNewTaskTitle(event.target.value)} // вот тут рендерится вся форма
        // на ввод каждого символа, это скорее всего не верно
        // а так как метод обновления состояния тянется из родительского компонента,
        // то и перерендеривается чуть не все приложение.
        ref={newTaskInputRef}
      />
      <Button type="submit" className="">
        Add
      </Button>
    </form>
  );
};

export default AddTaskForm;
