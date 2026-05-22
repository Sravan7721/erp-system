import { useState, useEffect } from "react";

function RoleManagement() {

  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState("");

  const [role, setRole] = useState("");

  // LOAD USERS

  useEffect(() => {

    const savedUsers =
      JSON.parse(localStorage.getItem("roles")) || [];

    setUsers(savedUsers);

  }, []);

  // ADD USER ROLE

  const addRole = () => {

    if (!username || !role) {

      alert("Please fill all fields");

      return;
    }

    const newUser = {
      id: Date.now(),
      username,
      role
    };

    const updatedUsers = [
      ...users,
      newUser
    ];

    setUsers(updatedUsers);

    localStorage.setItem(
      "roles",
      JSON.stringify(updatedUsers)
    );

    // CLEAR INPUTS

    setUsername("");
    setRole("");

    alert("Role Assigned Successfully");
  };

  // DELETE USER

  const deleteUser = (id) => {

    const filteredUsers =
      users.filter((user) => user.id !== id);

    setUsers(filteredUsers);

    localStorage.setItem(
      "roles",
      JSON.stringify(filteredUsers)
    );
  };

  return (

    <div className="min-h-screen bg-[#081028] text-white p-10">

      {/* TITLE */}

      <h1 className="text-5xl font-bold mb-10">

        Role Management

      </h1>

      {/* FORM */}

      <div className="bg-[#1e293b] p-8 rounded-3xl max-w-3xl mb-10">

        <div className="grid grid-cols-2 gap-5">

          {/* USERNAME */}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          />

          {/* ROLE */}

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          >

            <option value="">
              Select Role
            </option>

            <option>
              Admin
            </option>

            <option>
              HR
            </option>

            <option>
              Employee
            </option>

          </select>

        </div>

        {/* BUTTON */}

        <button
          onClick={addRole}
          className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-xl font-bold text-lg mt-6"
        >

          Assign Role

        </button>

      </div>

      {/* USERS TABLE */}

      <div className="bg-[#1e293b] rounded-3xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#334155]">

            <tr>

              <th className="p-4 text-left">

                Username

              </th>

              <th className="p-4 text-left">

                Role

              </th>

              <th className="p-4 text-left">

                Access Level

              </th>

              <th className="p-4 text-left">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-b border-slate-700"
              >

                {/* USERNAME */}

                <td className="p-4">

                  {user.username}

                </td>

                {/* ROLE */}

                <td className="p-4">

                  <span
                    className={`px-4 py-2 rounded-xl

                    ${
                      user.role === "Admin"
                        ? "bg-red-500"
                        : user.role === "HR"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                  >

                    {user.role}

                  </span>

                </td>

                {/* ACCESS */}

                <td className="p-4">

                  {user.role === "Admin"
                    ? "Full System Access"
                    : user.role === "HR"
                    ? "Employee & Payroll Access"
                    : "Limited Access"}

                </td>

                {/* DELETE */}

                <td className="p-4">

                  <button
                    onClick={() =>
                      deleteUser(user.id)
                    }
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
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

export default RoleManagement;