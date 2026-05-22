import { useEffect, useState } from "react";

import axios from "axios";

function Departments() {

  const [departments, setDepartments] =
    useState([]);

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  // FETCH

  const fetchDepartments = async () => {

    const response =
      await axios.get(
        "http://localhost:8080/api/departments"
      );

    setDepartments(response.data);
  };

  useEffect(() => {

    fetchDepartments();

  }, []);

  // ADD

  const addDepartment = async () => {

    if (!name || !description) {

      alert("Fill all fields");

      return;
    }

    await axios.post(

      "http://localhost:8080/api/departments",

      {
        name,
        description
      }
    );

    setName("");
    setDescription("");

    fetchDepartments();
  };

  // DELETE

  const deleteDepartment = async (id) => {

    await axios.delete(

      `http://localhost:8080/api/departments/${id}`
    );

    fetchDepartments();
  };

  return (

    <div className="min-h-screen bg-[#081028] text-white p-10">

      <h1 className="text-5xl font-bold mb-10">

        Departments

      </h1>

      {/* ADD DEPARTMENT */}

      <div className="bg-slate-900 p-6 rounded-3xl mb-10">

        <div className="grid grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Department Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="bg-slate-800 p-4 rounded-xl outline-none"
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="bg-slate-800 p-4 rounded-xl outline-none"
          />

        </div>

        <button
          onClick={addDepartment}
          className="bg-green-500 px-6 py-3 rounded-xl mt-5"
        >
          Add Department
        </button>

      </div>

      {/* TABLE */}

      <div className="bg-slate-900 rounded-3xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Description
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {departments.map((department) => (

              <tr
                key={department.id}
                className="border-b border-slate-800"
              >

                <td className="p-4">

                  {department.id}

                </td>

                <td className="p-4">

                  {department.name}

                </td>

                <td className="p-4">

                  {department.description}

                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      deleteDepartment(department.id)
                    }
                    className="bg-red-500 px-4 py-2 rounded-xl"
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

export default Departments;