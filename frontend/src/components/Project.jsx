import { useState, useEffect } from "react";
import axios from "axios";

function Project() {

  const [projectName, setProjectName] = useState("");
  const [client, setClient] = useState("");
  const [manager, setManager] = useState("");
  const [deadline, setDeadline] = useState("");

  const [projects, setProjects] = useState([]);

  // LOAD PROJECTS

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/projects"
      );

      setProjects(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // ADD PROJECT

  const addProject = async () => {

    if (
      !projectName ||
      !client ||
      !manager ||
      !deadline
    ) {
      alert("Please fill all fields");
      return;
    }

    const newProject = {
      projectName,
      client,
      manager,
      deadline
    };

    try {

      await axios.post(
        "http://localhost:8080/api/projects",
        newProject
      );

      setProjectName("");
      setClient("");
      setManager("");
      setDeadline("");

      fetchProjects();

    } catch (error) {
      console.log(error);
    }
  };

  // DELETE PROJECT

  const deleteProject = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8080/api/projects/${id}`
      );

      fetchProjects();

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="bg-[#081028] min-h-screen text-white p-8">

      <h1 className="text-5xl font-bold mb-10">

        Project Management

      </h1>

      {/* FORM */}

      <div className="bg-[#111c44] p-6 rounded-3xl mb-10">

        <div className="grid grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) =>
              setProjectName(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          />

          <input
            type="text"
            placeholder="Client Name"
            value={client}
            onChange={(e) =>
              setClient(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          />

          <input
            type="text"
            placeholder="Project Manager"
            value={manager}
            onChange={(e) =>
              setManager(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          />

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
          onClick={addProject}
          className="bg-green-500 px-6 py-3 rounded-xl mt-6 hover:bg-green-600"
        >
          Add Project
        </button>

      </div>

      {/* TABLE */}

      <div className="bg-[#111c44] rounded-3xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#1e293b]">

            <tr>

              <th className="text-left p-5">ID</th>

              <th className="text-left p-5">Project</th>

              <th className="text-left p-5">Client</th>

              <th className="text-left p-5">Manager</th>

              <th className="text-left p-5">Deadline</th>

              <th className="text-left p-5">Action</th>

            </tr>

          </thead>

          <tbody>

            {projects.map((project) => (

              <tr
                key={project.id}
                className="border-b border-slate-700"
              >

                <td className="p-5">{project.id}</td>

                <td className="p-5">
                  {project.projectName}
                </td>

                <td className="p-5">
                  {project.client}
                </td>

                <td className="p-5">
                  {project.manager}
                </td>

                <td className="p-5">
                  {project.deadline}
                </td>

                <td className="p-5">

                  <button
                    onClick={() =>
                      deleteProject(project.id)
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

export default Project;