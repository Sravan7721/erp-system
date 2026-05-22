import { Outlet, useNavigate, useLocation } from "react-router-dom";

function MainLayout() {

  const navigate = useNavigate();

  const location = useLocation();

  // SIDEBAR MENU

  const menuItems = [

    { name: "Dashboard", path: "/dashboard" },

    { name: "Projects", path: "/projects" },

    { name: "Tasks", path: "/tasks" },

    { name: "Performance", path: "/performance" },

    { name: "Recruitment", path: "/recruitment" },

    { name: "Inventory", path: "/inventory" },

    { name: "Finance", path: "/finance" },

    { name: "Analytics", path: "/analytics" },

    { name: "Employees", path: "/employees" },

    { name: "Departments", path: "/departments" },

    { name: "Attendance", path: "/attendance" },

    { name: "Leave", path: "/leave" },

    { name: "Salary", path: "/salary" },

    { name: "Reports", path: "/reports" },

    { name: "Profile", path: "/profile" }

  ];

  return (

    <div className="flex bg-[#081028] min-h-screen text-white">

      {/* SIDEBAR */}

      <div className="w-[240px] h-screen bg-[#0f172a] fixed left-0 top-0 overflow-y-auto border-r border-slate-800 p-6">

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

              className={`text-left px-4 py-3 rounded-xl transition duration-300 text-lg font-medium

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

            className="bg-red-500 hover:bg-red-600 mt-8 py-3 rounded-xl text-lg font-semibold transition duration-300"
          >

            Logout

          </button>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="flex-1 ml-[240px] p-8">

        {/* TOPBAR */}

        <div className="flex justify-between items-center mb-10">

          {/* LEFT */}

          <div>

            <h1 className="text-5xl font-bold">

              Enterprise ERP 🚀

            </h1>

            <p className="text-slate-400 mt-2 text-lg">

              Company Management System

            </p>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-5">

            {/* NOTIFICATION */}

            <button className="bg-[#111c44] p-4 rounded-2xl text-3xl hover:bg-slate-700 transition duration-300">

              🔔

            </button>

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

        </div>

        {/* PAGE CONTENT */}

        <Outlet />

      </div>

    </div>
  );
}

export default MainLayout;