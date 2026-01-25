import TaskPage from "./pages/TaskPage";
import TasksPage from "./pages/TasksPage";
import Router from "./Router";

const App = () => {
  const routes = {
    "/": TasksPage,
    "/tasks/:id": TaskPage,
    "*": () => (
      <div>
        <h1>404</h1>
      </div>
    ),
  };

  return <Router routes={routes} />;
};

export default App;
