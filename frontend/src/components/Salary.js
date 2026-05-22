import { useEffect, useState } from "react";

import axios from "axios";

function Salary() {

  const [salaries, setSalaries] =
    useState([]);

  const [employeeName, setEmployeeName] =
    useState("");

  const [department, setDepartment] =
    useState("");

  const [salary, setSalary] =
    useState("");

  // FETCH

  const fetchSalaries = async () => {

    const response =
      await axios.get(
        "http://localhost:8080/api/salaries"
      );

    setSalaries(response.data);
  };

  useEffect(() => {

    fetchSalaries();

  }, []);

  // ADD

  const addSalary = async () => {

    if (
      !employeeName ||
      !department ||
      !salary
    ) {

      alert("Fill all fields");

      return;
    }

    await axios.post(

      "http://localhost:8080/api/salaries",

      {
        employeeName,
        department,
        salary
      }
    );

    setEmployeeName("");
    setDepartment("");
    setSalary("");

    fetchSalaries();
  };

  // DELETE

  const deleteSalary = async (id) => {

    await axios.delete(

      `http://localhost:8080/api/salaries/${id}`
    );

    fetchSalaries();
  };

  // TOTAL SALARY

  const totalSalary =
    salaries.reduce(
      (total, item) =>
        total + item.salary,
      0
    );

  return (

    <div className="min-h-screen bg-[#081028] text-white p-10">

      <h1 className="text-5xl font-bold mb-10">

        Salary Management

      </h1>

      {/* TOTAL */}

      <div className="bg-purple-500 p-8 rounded-3xl mb-10 w-[350px]">

        <h1 className="text-2xl">

          Net Company Salary

        </h1>

        <h1 className="text-5xl font-bold mt-3">

          ₹{totalSalary}

        </h1>

      </div>

      {/* FORM */}

      <div className="bg-slate-900 p-6 rounded-3xl mb-10">

        <div className="grid grid-cols-3 gap-5">

          <input
            type="text"
            placeholder="Employee Name"
            value={employeeName}
            onChange={(e) =>
              setEmployeeName(e.target.value)
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
          onClick={addSalary}
          className="bg-green-500 px-6 py-3 rounded-xl mt-5"
        >
          Add Salary
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
                Employee
              </th>

              <th className="p-4 text-left">
                Department
              </th>

              <th className="p-4 text-left">
                Salary
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {salaries.map((item) => (

              <tr
                key={item.id}
                className="border-b border-slate-800"
              >

                <td className="p-4">
                  {item.id}
                </td>

                <td className="p-4">
                  {item.employeeName}
                </td>

                <td className="p-4">
                  {item.department}
                </td>

                <td className="p-4">
                  ₹{item.salary}
                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      deleteSalary(item.id)
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

export default Salary;