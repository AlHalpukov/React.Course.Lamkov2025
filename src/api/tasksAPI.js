const url = import.meta.env.VITE_API_URL;

const headers = {
  "Content-Type": "application/json",
};

const tasksAPI = {
  getAll: () => {
    return fetch(url + "tasks").then((response) => response.json());
  },

  add: (task) => {
    return fetch(url + "tasks", {
      method: "POST",
      headers,
      body: JSON.stringify(task),
    }).then((response) => {
      console.log(response);

      return response.json();
    });
  },

  delete: (id) => {
    return fetch(url + `tasks/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      return response.json();
    });
  },

  deleteAll: (tasks) => {
    return Promise.all(
      tasks.map(({ id }) => {
        tasksAPI.delete(id);
      })
    );
  },

  toggleComplete: (id, isDone) => {
    return fetch(url + `tasks/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ isDone }),
    });
  },
};

export default tasksAPI;
