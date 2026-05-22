import { useEffect, useState } from "react";
import axios from "axios";

function Leave() {

  const [employeeName, setEmployeeName] = useState("");
  const [department, setDepartment] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {

    const response = await axios.get(
      "http://localhost:8080/api/leaves"
    );

    setLeaves(response.data);
  };

  const addLeave = async () => {

    if (
      !employeeName ||
      !department ||
      !leaveType
    ) {
      alert("Fill all fields");
      return;
    }

    await axios.post(
      "http://localhost:8080/api/leaves",
      {
        employeeName,
        department,
        leaveType,
        fromDate,
        toDate,
        reason,
        status: "Pending"
      }
    );

    setEmployeeName("");
    setDepartment("");
    setLeaveType("");
    setFromDate("");
    setToDate("");
    setReason("");

    fetchLeaves();
  };

  const deleteLeave = async (id) => {

    await axios.delete(
      `http://localhost:8080/api/leaves/${id}`
    );

    fetchLeaves();
  };

  return (

    <div className="bg-[#081028] min-h-screen p-8 text-white">

      <h1 className="text-5xl font-bold mb-8">

        Leave Management

      </h1>

      {/* FORM */}

      <div className="bg-[#0f172a] p-6 rounded-3xl mb-8">

        <div className="grid grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Employee Name"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className="bg-slate-700 p-4 rounded-xl"
          />

          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="bg-slate-700 p-4 rounded-xl"
          />

          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="bg-slate-700 p-4 rounded-xl"
          >
            <option value="">Select Leave</option>
            <option>Casual Leave</option>
            <option>Sick Leave</option>
            <option>Emergency Leave</option>
          </select>

          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="bg-slate-700 p-4 rounded-xl"
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="bg-slate-700 p-4 rounded-xl"
          />

          <input
            type="text"
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="bg-slate-700 p-4 rounded-xl"
          />

        </div>

        <button
          onClick={addLeave}
          className="bg-green-500 px-6 py-3 rounded-xl mt-5"
        >
          Apply Leave
        </button>

      </div>

      {/* TABLE */}

      <table className="w-full bg-[#0f172a] rounded-3xl overflow-hidden">

        <thead className="bg-slate-800">

          <tr>

            <th className="p-4 text-left">Employee</th>
            <th className="p-4 text-left">Department</th>
            <th className="p-4 text-left">Leave Type</th>
            <th className="p-4 text-left">From</th>
            <th className="p-4 text-left">To</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Action</th>

          </tr>

        </thead>

        <tbody>

          {leaves.map((leave) => (

            <tr
              key={leave.id}
              className="border-b border-slate-700"
            >

              <td className="p-4">{leave.employeeName}</td>

              <td className="p-4">{leave.department}</td>

              <td className="p-4">{leave.leaveType}</td>

              <td className="p-4">{leave.fromDate}</td>

              <td className="p-4">{leave.toDate}</td>

              <td className="p-4 text-yellow-400">
                {leave.status}
              </td>

              <td className="p-4">

                <button
                  onClick={() => deleteLeave(leave.id)}
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

export default Leave;