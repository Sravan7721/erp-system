import { useState, useEffect } from "react";

function Profile() {

  const [isEditing, setIsEditing] = useState(true);

  const [profile, setProfile] = useState({
    fullname: "",
    email: "",
    mobile: "",
    address: "",
    role: "",
    gender: "",
    dob: ""
  });

  useEffect(() => {

    const savedProfile =
      JSON.parse(localStorage.getItem("profile"));

    if (savedProfile) {

      setProfile(savedProfile);

      setIsEditing(false);
    }

  }, []);

  const handleSave = () => {

    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );

    alert("Profile Saved");

    setIsEditing(false);
  };

  const handleEdit = () => {

    setIsEditing(true);
  };

  return (

    <div className="min-h-screen bg-[#020b3f] flex justify-center items-center p-6">

      <div className="bg-[#1e293b] w-[500px] rounded-3xl p-8 shadow-2xl">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold text-white">
            My Profile
          </h1>

          {!isEditing && (

            <button
              onClick={handleEdit}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-xl font-semibold"
            >
              Edit
            </button>

          )}

        </div>

        {/* FULL NAME */}

        <div className="mb-5">

          <label className="text-gray-300">
            Full Name
          </label>

          <input
            type="text"
            disabled={!isEditing}
            value={profile.fullname}
            onChange={(e) =>
              setProfile({
                ...profile,
                fullname: e.target.value
              })
            }
            className="w-full mt-2 p-4 rounded-xl bg-[#334155] outline-none"
          />

        </div>

        {/* EMAIL */}

        <div className="mb-5">

          <label className="text-gray-300">
            Email
          </label>

          <input
            type="email"
            disabled={!isEditing}
            value={profile.email}
            onChange={(e) =>
              setProfile({
                ...profile,
                email: e.target.value
              })
            }
            className="w-full mt-2 p-4 rounded-xl bg-[#334155] outline-none"
          />

        </div>

        {/* MOBILE */}

        <div className="mb-5">

          <label className="text-gray-300">
            Mobile Number
          </label>

          <input
            type="text"
            disabled={!isEditing}
            value={profile.mobile}
            onChange={(e) =>
              setProfile({
                ...profile,
                mobile: e.target.value
              })
            }
            className="w-full mt-2 p-4 rounded-xl bg-[#334155] outline-none"
          />

        </div>

        {/* ADDRESS */}

        <div className="mb-5">

          <label className="text-gray-300">
            Address
          </label>

          <textarea
            disabled={!isEditing}
            value={profile.address}
            onChange={(e) =>
              setProfile({
                ...profile,
                address: e.target.value
              })
            }
            className="w-full mt-2 p-4 rounded-xl bg-[#334155] outline-none h-[100px]"
          />

        </div>

        {/* JOB ROLE */}

        <div className="mb-5">

          <label className="text-gray-300">
            Job Role
          </label>

          <input
            type="text"
            disabled={!isEditing}
            value={profile.role}
            onChange={(e) =>
              setProfile({
                ...profile,
                role: e.target.value
              })
            }
            className="w-full mt-2 p-4 rounded-xl bg-[#334155] outline-none"
          />

        </div>

        {/* GENDER */}

        <div className="mb-5">

          <label className="text-gray-300">
            Gender
          </label>

          <select
            disabled={!isEditing}
            value={profile.gender}
            onChange={(e) =>
              setProfile({
                ...profile,
                gender: e.target.value
              })
            }
            className="w-full mt-2 p-4 rounded-xl bg-[#334155] outline-none"
          >
            <option value="">
              Select Gender
            </option>

            <option>
              Male
            </option>

            <option>
              Female
            </option>

            <option>
              Other
            </option>

          </select>

        </div>

        {/* DOB */}

        <div className="mb-8">

          <label className="text-gray-300">
            Date of Birth
          </label>

          <input
            type="date"
            disabled={!isEditing}
            value={profile.dob}
            onChange={(e) =>
              setProfile({
                ...profile,
                dob: e.target.value
              })
            }
            className="w-full mt-2 p-4 rounded-xl bg-[#334155] outline-none"
          />

        </div>

        {/* SAVE BUTTON */}

        {isEditing && (

          <button
            onClick={handleSave}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-xl text-lg"
          >
            Save Profile
          </button>

        )}

      </div>

    </div>
  );
}

export default Profile;