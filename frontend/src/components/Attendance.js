import { useEffect, useState } from "react";

import axios from "axios";

function Attendance() {

  const [attendance, setAttendance] =
    useState([]);

  const [employeeName, setEmployeeName] =
    useState("");

  const [department, setDepartment] =
    useState("");

  const [status, setStatus] =
    useState("Present");

  const [date, setDate] =
    useState("");

  // FETCH

  const fetchAttendance = async () => {

    const response =
      await axios.get(
        "http://localhost:8080/api/attendance"
      );

    setAttendance(response.data);
  };

  useEffect(() => {

    fetchAttendance();

  }, []);

  // ADD

  const addAttendance = async () => {

    if (
      !employeeName ||
      !department ||
      !date
    ) {

      alert("Fill all fields");

      return;
    }

    await axios.post(

      "http://localhost:8080/api/attendance",

      {
        employeeName,
        department,
        status,
        date
      }
    );

    setEmployeeName("");
    setDepartment("");
    setStatus("Present");
    setDate("");

    fetchAttendance();
  };

  // DELETE

  const deleteAttendance = async (id) => {

    await axios.delete(

      `http://localhost:8080/api/attendance/${id}`
    );

    fetchAttendance();
  };

  return (

    <div className="min-h-screen bg-[#081028] text-white p-10">

      <h1 className="text-5xl font-bold mb-10">

        Attendance Management

      </h1>

      {/* FORM */}

      <div className="bg-slate-900 p-6 rounded-3xl mb-10">

        <div className="grid grid-cols-4 gap-5">

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

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="bg-slate-800 p-4 rounded-xl outline-none"
          >

            <option>
              Present
            </option>

            <option>
              Absent
            </option>

          </select>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="bg-slate-800 p-4 rounded-xl outline-none"
          />

        </div>

        <button
          onClick={addAttendance}
          className="bg-green-500 px-6 py-3 rounded-xl mt-5"
        >

          Mark Attendance

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
                Status
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {attendance.map((item) => (

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

                <td className={`p-4 font-bold

                  ${
                    item.status === "Present"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >

                  {item.status}

                </td>

                <td className="p-4">

                  {item.date}

                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      deleteAttendance(item.id)
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

export default Attendance;