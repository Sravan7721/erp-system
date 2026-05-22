import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

function Reports() {

  // GET DATA

  const employees =
    JSON.parse(localStorage.getItem("employees")) || [];

  const attendance =
    JSON.parse(localStorage.getItem("attendance")) || [];

  const leaves =
    JSON.parse(localStorage.getItem("leaveRequests")) || [];

  // EXPORT FUNCTION

  const exportToExcel = (data, fileName) => {

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Sheet1"
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });

    const fileData =
      new Blob(
        [excelBuffer],
        {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
      );

    saveAs(fileData, `${fileName}.xlsx`);
  };

  return (

    <div className="min-h-screen bg-[#081028] text-white p-10">

      {/* TITLE */}

      <h1 className="text-5xl font-bold mb-10">

        Reports & Exports

      </h1>

      {/* REPORT CARDS */}

      <div className="grid grid-cols-3 gap-8">

        {/* EMPLOYEE REPORT */}

        <div className="bg-[#1e293b] p-8 rounded-3xl shadow-xl">

          <h2 className="text-3xl font-bold mb-5">

            Employee Report

          </h2>

          <p className="text-slate-400 mb-6">

            Export all employee records

          </p>

          <button
            onClick={() =>
              exportToExcel(
                employees,
                "Employees_Report"
              )
            }
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold"
          >

            Export Excel

          </button>

        </div>

        {/* ATTENDANCE REPORT */}

        <div className="bg-[#1e293b] p-8 rounded-3xl shadow-xl">

          <h2 className="text-3xl font-bold mb-5">

            Attendance Report

          </h2>

          <p className="text-slate-400 mb-6">

            Export attendance records

          </p>

          <button
            onClick={() =>
              exportToExcel(
                attendance,
                "Attendance_Report"
              )
            }
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl font-bold"
          >

            Export Excel

          </button>

        </div>

        {/* LEAVE REPORT */}

        <div className="bg-[#1e293b] p-8 rounded-3xl shadow-xl">

          <h2 className="text-3xl font-bold mb-5">

            Leave Report

          </h2>

          <p className="text-slate-400 mb-6">

            Export leave requests

          </p>

          <button
            onClick={() =>
              exportToExcel(
                leaves,
                "Leave_Report"
              )
            }
            className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-xl font-bold"
          >

            Export Excel

          </button>

        </div>

      </div>

      {/* SUMMARY */}

      <div className="mt-14 bg-[#1e293b] p-8 rounded-3xl">

        <h2 className="text-4xl font-bold mb-8">

          Company Summary

        </h2>

        <div className="grid grid-cols-3 gap-6">

          {/* EMPLOYEES */}

          <div className="bg-[#334155] p-6 rounded-2xl">

            <h3 className="text-xl text-slate-400">

              Total Employees

            </h3>

            <h1 className="text-5xl font-bold mt-4">

              {employees.length}

            </h1>

          </div>

          {/* ATTENDANCE */}

          <div className="bg-[#334155] p-6 rounded-2xl">

            <h3 className="text-xl text-slate-400">

              Attendance Records

            </h3>

            <h1 className="text-5xl font-bold mt-4">

              {attendance.length}

            </h1>

          </div>

          {/* LEAVES */}

          <div className="bg-[#334155] p-6 rounded-2xl">

            <h3 className="text-xl text-slate-400">

              Leave Requests

            </h3>

            <h1 className="text-5xl font-bold mt-4">

              {leaves.length}

            </h1>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Reports;