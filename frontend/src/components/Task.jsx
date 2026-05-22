import { useState, useEffect } from "react";
import axios from "axios";

function Task() {

  const [employee, setEmployee] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/tasks"
      );

      setTasks(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // ADD TASK

  const addTask = async () => {

    if (
      !employee ||
      !taskTitle ||
      !priority ||
      !deadline
    ) {
      alert("Please fill all fields");
      return;
    }

    const newTask = {
      employee,
      taskTitle,
      priority,
      deadline,
      status: "Pending"
    };

    try {

      await axios.post(
        "http://localhost:8080/api/tasks",
        newTask
      );

      setEmployee("");
      setTaskTitle("");
      setPriority("");
      setDeadline("");

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  // DELETE TASK

  const deleteTask = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8080/api/tasks/${id}`
      );

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="bg-[#081028] min-h-screen text-white p-8">

      <h1 className="text-5xl font-bold mb-10">

        Task Management

      </h1>

      {/* FORM */}

      <div className="bg-[#111c44] p-6 rounded-3xl mb-10">

        <div className="grid grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Employee Name"
            value={employee}
            onChange={(e) =>
              setEmployee(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          />

          <input
            type="text"
            placeholder="Task Title"
            value={taskTitle}
            onChange={(e) =>
              setTaskTitle(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          >
            <option value="">Select Priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <input
            type="date"
            value={deadline}
            onChange={(e) =>
              setDeadline(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          />

        </div>

        <button
          onClick={addTask}
          className="bg-green-500 px-6 py-3 rounded-xl mt-6 hover:bg-green-600"
        >
          Assign Task
        </button>

      </div>

      {/* TABLE */}

      <div className="bg-[#111c44] rounded-3xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#1e293b]">

            <tr>

              <th className="text-left p-5">ID</th>

              <th className="text-left p-5">Employee</th>

              <th className="text-left p-5">Task</th>

              <th className="text-left p-5">Priority</th>

              <th className="text-left p-5">Deadline</th>

              <th className="text-left p-5">Status</th>

              <th className="text-left p-5">Action</th>

            </tr>

          </thead>

          <tbody>

            {tasks.map((task) => (

              <tr
                key={task.id}
                className="border-b border-slate-700"
              >

                <td className="p-5">{task.id}</td>

                <td className="p-5">{task.employee}</td>

                <td className="p-5">{task.taskTitle}</td>

                <td className="p-5">

                  <span
                    className={`
                    px-3 py-1 rounded-lg text-sm

                    ${
                      task.priority === "High"
                        ? "bg-red-500"
                        : task.priority === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }
                    `}
                  >
                    {task.priority}
                  </span>

                </td>

                <td className="p-5">{task.deadline}</td>

                <td className="p-5 text-cyan-400">
                  {task.status}
                </td>

                <td className="p-5">

                  <button
                    onClick={() =>
                      deleteTask(task.id)
                    }
                    className="bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default Task;