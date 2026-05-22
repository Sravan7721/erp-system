import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

import { useNavigate, useLocation } from "react-router-dom";

function Analytics() {

  const navigate = useNavigate();

  const location = useLocation();

  // SIDEBAR MENU

  const menuItems = [

    { name: "Dashboard", path: "/dashboard" },

    { name: "Employees", path: "/employees" },

    { name: "Departments", path: "/departments" },

    { name: "Salary", path: "/salary" },

    { name: "Analytics", path: "/analytics" },

    { name: "Profile", path: "/profile" }

  ];

  // BAR CHART DATA

  const departmentSalary = [

    { department: "IT", salary: 50000 },

    { department: "Finance", salary: 45000 }

  ];

  // PIE CHART DATA

  const salaryData = [

    { name: "IT", value: 50000 },

    { name: "Finance", value: 45000 }

  ];

  const COLORS = [

    "#22c55e",

    "#3b82f6",

    "#a855f7",

    "#ef4444"
  ];

  return (

    <div className="flex bg-[#081028] min-h-screen text-white">

      {/* SIDEBAR */}

      <div className="w-[230px] h-screen bg-[#0f172a] fixed left-0 top-0 p-6 overflow-y-auto border-r border-slate-800">

        {/* LOGO */}

        <h1 className="text-5xl font-bold text-green-400 mb-12">

          ERP PRO

        </h1>

        {/* MENU */}

        <div className="flex flex-col gap-4">

          {menuItems.map((item) => (

            <button
              key={item.path}

              onClick={() => navigate(item.path)}

              className={`text-left px-4 py-3 rounded-xl transition duration-300 text-lg

              ${
                location.pathname === item.path

                  ? "bg-green-500 text-white shadow-lg"

                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >

              {item.name}

            </button>

          ))}

          {/* LOGOUT */}

          <button

            onClick={() => {

              localStorage.clear();

              navigate("/login");

            }}

            className="bg-red-500 hover:bg-red-600 transition duration-300 mt-8 py-3 rounded-xl text-lg font-semibold"
          >

            Logout

          </button>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="flex-1 ml-[230px] p-10">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-12">

          <div>

            <h1 className="text-6xl font-bold">

              Analytics Dashboard 📊

            </h1>

            <p className="text-slate-400 text-xl mt-3">

              Company performance overview

            </p>

          </div>

          {/* PROFILE */}

          <div className="bg-[#111c44] px-6 py-4 rounded-2xl flex items-center gap-4 shadow-xl">

            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold">

              {localStorage
                .getItem("username")
                ?.charAt(0)
                ?.toUpperCase()}

            </div>

            <div>

              <h1 className="text-xl font-bold">

                {localStorage.getItem("username")}

              </h1>

              <p className="text-slate-400">

                Administrator

              </p>

            </div>

          </div>

        </div>

        {/* KPI CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

          {/* EMPLOYEES */}

          <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-10 rounded-3xl shadow-2xl hover:scale-[1.03] transition duration-300">

            <h1 className="text-6xl font-bold">

              2

            </h1>

            <p className="text-3xl mt-4">

              Employees

            </p>

          </div>

          {/* DEPARTMENTS */}

          <div className="bg-gradient-to-r from-green-500 to-green-400 p-10 rounded-3xl shadow-2xl hover:scale-[1.03] transition duration-300">

            <h1 className="text-6xl font-bold">

              2

            </h1>

            <p className="text-3xl mt-4">

              Departments

            </p>

          </div>

          {/* SALARY */}

          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-10 rounded-3xl shadow-2xl hover:scale-[1.03] transition duration-300">

            <h1 className="text-6xl font-bold">

              ₹95000

            </h1>

            <p className="text-3xl mt-4">

              Total Salary

            </p>

          </div>

        </div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

          {/* BAR CHART */}

          <div className="bg-[#111c44]/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-slate-700">

            <h1 className="text-4xl font-bold mb-8">

              Department Salary

            </h1>

            <ResponsiveContainer width="100%" height={350}>

              <BarChart data={departmentSalary}>

                <XAxis
                  dataKey="department"
                  stroke="#fff"
                />

                <YAxis stroke="#fff" />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="salary"
                  fill="#22c55e"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* PIE CHART */}

          <div className="bg-[#111c44]/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-slate-700">

            <h1 className="text-4xl font-bold mb-8">

              Salary Distribution

            </h1>

            <ResponsiveContainer width="100%" height={350}>

              <PieChart>

                <Pie
                  data={salaryData}
                  dataKey="value"
                  outerRadius={120}
                  label
                >

                  {salaryData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[index % COLORS.length]
                      }
                    />

                  ))}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;