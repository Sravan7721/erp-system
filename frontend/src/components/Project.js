import { useEffect, useState } from "react";
import axios from "axios";

function Project() {

  const [projectName, setProjectName] = useState("");
  const [teamLead, setTeamLead] = useState("");
  const [department, setDepartment] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState("");

  const [projects, setProjects] = useState([]);

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

  const addProject = async () => {

    if (
      !projectName ||
      !teamLead ||
      !department
    ) {
      alert("Fill all fields");
      return;
    }

    try {

      await axios.post(
        "http://localhost:8080/api/projects",
        {
          projectName,
          teamLead,
          department,
          deadline,
          status,
          progress
        }
      );

      setProjectName("");
      setTeamLead("");
      setDepartment("");
      setDeadline("");
      setStatus("");
      setProgress("");

      fetchProjects();

    } catch (error) {

      console.log(error);

    }
  };

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

    <div className="bg-[#081028] min-h-screen p-8 text-white">

      <h1 className="text-5xl font-bold mb-8">

        Project Management

      </h1>

      {/* FORM */}

      <div className="bg-[#0f172a] p-6 rounded-3xl mb-8">

        <div className="grid grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) =>
              setProjectName(e.target.value)
            }
            className="bg-slate-700 p-4 rounded-xl"
          />

          <input
            type="text"
            placeholder="Team Lead"
            value={teamLead}
            onChange={(e) =>
              setTeamLead(e.target.value)
            }
            className="bg-slate-700 p-4 rounded-xl"
          />

          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
            className="bg-slate-700 p-4 rounded-xl"
          />

          <input
            type="date"
            value={deadline}
            onChange={(e) =>
              setDeadline(e.target.value)
            }
            className="bg-slate-700 p-4 rounded-xl"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="bg-slate-700 p-4 rounded-xl"
          >

            <option value="">

              Select Status

            </option>

            <option value="Pending">

              Pending

            </option>

            <option value="In Progress">

              In Progress

            </option>

            <option value="Completed">

              Completed

            </option>

          </select>

          <input
            type="number"
            placeholder="Progress %"
            value={progress}
            onChange={(e) =>
              setProgress(e.target.value)
            }
            className="bg-slate-700 p-4 rounded-xl"
          />

        </div>

        <button
          onClick={addProject}
          className="bg-green-500 px-6 py-3 rounded-xl mt-5"
        >
          Add Project
        </button>

      </div>

      {/* TABLE */}

      <table className="w-full bg-[#0f172a] rounded-3xl overflow-hidden">

        <thead className="bg-slate-800">

          <tr>

            <th className="p-4 text-left">

              Project

            </th>

            <th className="p-4 text-left">

              Team Lead

            </th>

            <th className="p-4 text-left">

              Department

            </th>

            <th className="p-4 text-left">

              Deadline

            </th>

            <th className="p-4 text-left">

              Status

            </th>

            <th className="p-4 text-left">

              Progress

            </th>

            <th className="p-4 text-left">

              Action

            </th>

          </tr>

        </thead>

        <tbody>

          {projects.map((project) => (

            <tr
              key={project.id}
              className="border-b border-slate-700"
            >

              <td className="p-4">

                {project.projectName}

              </td>

              <td className="p-4">

                {project.teamLead}

              </td>

              <td className="p-4">

                {project.department}

              </td>

              <td className="p-4">

                {project.deadline}

              </td>

              <td className="p-4 text-green-400">

                {project.status}

              </td>

              <td className="p-4">

                <div className="bg-slate-700 h-4 rounded-full">

                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{
                      width: `${project.progress}%`
                    }}
                  >

                  </div>

                </div>

                <p className="mt-1">

                  {project.progress}%

                </p>

              </td>

              <td className="p-4">

                <button
                  onClick={() =>
                    deleteProject(project.id)
                  }
                  className="bg-red-500 px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Project;