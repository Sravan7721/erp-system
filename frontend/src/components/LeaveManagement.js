import { useState, useEffect } from "react";

function LeaveManagement() {

  const [employees, setEmployees] = useState([]);

  const [leaveRequests, setLeaveRequests] = useState([]);

  const [selectedEmployee, setSelectedEmployee] =
    useState("");

  const [reason, setReason] = useState("");

  const [leaveDate, setLeaveDate] = useState("");

  // LOAD DATA

  useEffect(() => {

    const savedEmployees =
      JSON.parse(localStorage.getItem("employees")) || [];

    setEmployees(savedEmployees);

    const savedLeaves =
      JSON.parse(localStorage.getItem("leaveRequests")) || [];

    setLeaveRequests(savedLeaves);

  }, []);

  // APPLY LEAVE

  const applyLeave = () => {

    if (
      !selectedEmployee ||
      !reason ||
      !leaveDate
    ) {

      alert("Please fill all fields");

      return;
    }

    const newLeave = {
      id: Date.now(),
      employee: selectedEmployee,
      reason,
      leaveDate,
      status: "Pending"
    };

    const updatedLeaves = [
      ...leaveRequests,
      newLeave
    ];

    setLeaveRequests(updatedLeaves);

    localStorage.setItem(
      "leaveRequests",
      JSON.stringify(updatedLeaves)
    );

    // CLEAR INPUTS

    setSelectedEmployee("");
    setReason("");
    setLeaveDate("");

    alert("Leave Applied Successfully");
  };

  // UPDATE STATUS

  const updateStatus = (id, status) => {

    const updatedLeaves = leaveRequests.map(
      (leave) =>

        leave.id === id
          ? { ...leave, status }
          : leave
    );

    setLeaveRequests(updatedLeaves);

    localStorage.setItem(
      "leaveRequests",
      JSON.stringify(updatedLeaves)
    );
  };

  return (

    <div className="min-h-screen bg-[#081028] text-white p-10">

      {/* TITLE */}

      <h1 className="text-5xl font-bold mb-10">

        Leave Management

      </h1>

      {/* APPLY LEAVE FORM */}

      <div className="bg-[#1e293b] p-8 rounded-3xl max-w-3xl mb-10">

        <div className="grid grid-cols-1 gap-5">

          {/* EMPLOYEE */}

          <select
            value={selectedEmployee}
            onChange={(e) =>
              setSelectedEmployee(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          >

            <option value="">
              Select Employee
            </option>

            {employees.map((emp) => (

              <option
                key={emp.id}
                value={emp.name}
              >

                {emp.name}

              </option>

            ))}

          </select>

          {/* DATE */}

          <input
            type="date"
            value={leaveDate}
            onChange={(e) =>
              setLeaveDate(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          />

          {/* REASON */}

          <textarea
            placeholder="Leave Reason"
            value={reason}
            onChange={(e) =>
              setReason(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none h-[120px]"
          />

          {/* BUTTON */}

          <button
            onClick={applyLeave}
            className="bg-green-500 hover:bg-green-600 p-4 rounded-xl font-bold text-lg"
          >

            Apply Leave

          </button>

        </div>

      </div>

      {/* LEAVE TABLE */}

      <div className="bg-[#1e293b] rounded-3xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#334155]">

            <tr>

              <th className="p-4 text-left">
                Employee
              </th>

              <th className="p-4 text-left">
                Leave Date
              </th>

              <th className="p-4 text-left">
                Reason
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {leaveRequests.map((leave) => (

              <tr
                key={leave.id}
                className="border-b border-slate-700"
              >

                <td className="p-4">

                  {leave.employee}

                </td>

                <td className="p-4">

                  {leave.leaveDate}

                </td>

                <td className="p-4">

                  {leave.reason}

                </td>

                <td className="p-4">

                  <span
                    className={`px-4 py-2 rounded-xl

                    ${
                      leave.status === "Approved"
                        ? "bg-green-500"
                        : leave.status === "Rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500 text-black"
                    }`}
                  >

                    {leave.status}

                  </span>

                </td>

                <td className="p-4 flex gap-3">

                  {/* APPROVE */}

                  <button
                    onClick={() =>
                      updateStatus(
                        leave.id,
                        "Approved"
                      )
                    }
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
                  >

                    Approve

                  </button>

                  {/* REJECT */}

                  <button
                    onClick={() =>
                      updateStatus(
                        leave.id,
                        "Rejected"
                      )
                    }
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                  >

                    Reject

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

export default LeaveManagement;