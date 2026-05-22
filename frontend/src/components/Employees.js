import { useEffect, useState } from "react";

import axios from "axios";

function Employees() {

  const [employees, setEmployees] =
    useState([]);

  const [name, setName] =
    useState("");

  const [department, setDepartment] =
    useState("");

  const [salary, setSalary] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [editId, setEditId] =
    useState(null);

  // FETCH

  const fetchEmployees = async () => {

    const response =
      await axios.get(
        "http://localhost:8080/api/employees"
      );

    setEmployees(response.data);
  };

  useEffect(() => {

    fetchEmployees();

  }, []);

  // ADD OR UPDATE

  const saveEmployee = async () => {

    if (!name || !department || !salary) {

      alert("Fill all fields");

      return;
    }

    // UPDATE

    if (editId) {

      await axios.put(

        `http://localhost:8080/api/employees/${editId}`,

        {
          name,
          department,
          salary
        }
      );

      alert("Employee Updated");

      setEditId(null);

    } else {

      // ADD

      await axios.post(

        "http://localhost:8080/api/employees",

        {
          name,
          department,
          salary
        }
      );

      alert("Employee Added");
    }

    // RESET

    setName("");
    setDepartment("");
    setSalary("");

    fetchEmployees();
  };

  // DELETE

  const deleteEmployee = async (id) => {

    await axios.delete(

      `http://localhost:8080/api/employees/${id}`
    );

    fetchEmployees();
  };

  // EDIT

  const editEmployee = (employee) => {

    setEditId(employee.id);

    setName(employee.name);

    setDepartment(employee.department);

    setSalary(employee.salary);
  };

  // SEARCH FILTER

  const filteredEmployees =
    employees.filter((employee) =>

      employee.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (

    <div className="min-h-screen bg-[#081028] text-white p-10">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-5xl font-bold">

          Employees

        </h1>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search Employee..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="bg-slate-800 p-4 rounded-xl outline-none w-[300px]"
        />

      </div>

      {/* FORM */}

      <div className="bg-slate-900 p-6 rounded-3xl mb-10">

        <div className="grid grid-cols-3 gap-5">

          <input
            type="text"
            placeholder="Employee Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="bg-slate-800 p-4 rounded-xl outline-none"
          />

          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
            className="bg-slate-800 p-4 rounded-xl outline-none"
          />

          <input
            type="number"
            placeholder="Salary"
            value={salary}
            onChange={(e) =>
              setSalary(e.target.value)
            }
            className="bg-slate-800 p-4 rounded-xl outline-none"
          />

        </div>

        <button
          onClick={saveEmployee}
          className={`px-6 py-3 rounded-xl mt-5 text-white

          ${
            editId
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        >

          {editId
            ? "Update Employee"
            : "Add Employee"}

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
                Department
              </th>

              <th className="p-4 text-left">
                Salary
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredEmployees.map((employee) => (

              <tr
                key={employee.id}
                className="border-b border-slate-800 hover:bg-slate-800 transition"
              >

                <td className="p-4">

                  {employee.id}

                </td>

                <td className="p-4">

                  {employee.name}

                </td>

                <td className="p-4">

                  {employee.department}

                </td>

                <td className="p-4">

                  ₹{employee.salary}

                </td>

                <td className="p-4 flex gap-3">

                  {/* EDIT */}

                  <button
                    onClick={() =>
                      editEmployee(employee)
                    }
                    className="bg-yellow-500 px-4 py-2 rounded-xl"
                  >

                    Edit

                  </button>

                  {/* DELETE */}

                  <button
                    onClick={() =>
                      deleteEmployee(employee.id)
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

export default Employees;