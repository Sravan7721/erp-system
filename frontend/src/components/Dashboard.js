import { useEffect, useState } from "react";

import API from "../services/api";

import Loader from "./Loader";

function Dashboard() {

  const [employees, setEmployees] = useState([]);

  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData = async () => {

    try {

      const employeeResponse = await API.get("/employees");

      const departmentResponse = await API.get("/departments");

      setEmployees(employeeResponse.data);

      setDepartments(departmentResponse.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }
  };

  const totalSalary = employees.reduce(

    (total, employee) => total + Number(employee.salary || 0),

    0
  );

  if (loading) return <Loader />;

  return (

    <div>

      {/* HEADER */}

      <div className="flex justify-between items-start flex-wrap gap-5 mb-10">

        <div>

          <h1 className="text-6xl font-bold">

            ERP Dashboard 🚀

          </h1>

          <p className="text-slate-400 text-xl mt-2">

            Welcome back

          </p>

        </div>

      </div>

      {/* ACTION BUTTONS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-8 rounded-3xl text-3xl font-bold shadow-2xl hover:scale-105 transition duration-300 cursor-pointer">

          Add Employee

        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-400 p-8 rounded-3xl text-3xl font-bold shadow-2xl hover:scale-105 transition duration-300 cursor-pointer">

          Assign Task

        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-3xl text-3xl font-bold shadow-2xl hover:scale-105 transition duration-300 cursor-pointer">

          Add Finance

        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-400 p-8 rounded-3xl text-3xl font-bold shadow-2xl hover:scale-105 transition duration-300 cursor-pointer">

          Attendance

        </div>

      </div>

      {/* CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">

        <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-10 rounded-3xl shadow-2xl">

          <h1 className="text-7xl font-bold">

            {employees.length}

          </h1>

          <p className="text-3xl mt-3">

            Employees

          </p>

        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-400 p-10 rounded-3xl shadow-2xl">

          <h1 className="text-7xl font-bold">

            {departments.length}

          </h1>

          <p className="text-3xl mt-3">

            Departments

          </p>

        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-10 rounded-3xl shadow-2xl">

          <h1 className="text-6xl font-bold">

            ₹{totalSalary}

          </h1>

          <p className="text-3xl mt-3">

            Net Salary

          </p>

        </div>

      </div>

      {/* EMPLOYEE TABLE */}

      <div className="bg-[#111c44] rounded-3xl overflow-hidden shadow-2xl">

        <div className="p-6 border-b border-slate-700">

          <h1 className="text-4xl font-bold">

            Recent Employees

          </h1>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-[#1e293b]">

              <tr>

                <th className="p-5 text-left">

                  ID

                </th>

                <th className="p-5 text-left">

                  Name

                </th>

                <th className="p-5 text-left">

                  Department

                </th>

                <th className="p-5 text-left">

                  Salary

                </th>

              </tr>

            </thead>

            <tbody>

              {employees.map((employee) => (

                <tr
                  key={employee.id}
                  className="border-b border-slate-800 hover:bg-slate-800 transition duration-300"
                >

                  <td className="p-5">

                    {employee.id}

                  </td>

                  <td className="p-5">

                    {employee.name}

                  </td>

                  <td className="p-5">

                    {employee.department}

                  </td>

                  <td className="p-5">

                    ₹{employee.salary}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;