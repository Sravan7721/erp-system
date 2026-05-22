import { useState, useEffect } from "react";
import axios from "axios";

function Recruitment() {

  const [candidateName, setCandidateName] = useState("");
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("");
  const [status, setStatus] = useState("");

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/recruitment"
      );

      setCandidates(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // ADD CANDIDATE

  const addCandidate = async () => {

    if (
      !candidateName ||
      !position ||
      !experience ||
      !status
    ) {
      alert("Please fill all fields");
      return;
    }

    const newCandidate = {
      candidateName,
      position,
      experience,
      status
    };

    try {

      await axios.post(
        "http://localhost:8080/api/recruitment",
        newCandidate
      );

      setCandidateName("");
      setPosition("");
      setExperience("");
      setStatus("");

      fetchCandidates();

    } catch (error) {
      console.log(error);
    }
  };

  // DELETE

  const deleteCandidate = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8080/api/recruitment/${id}`
      );

      fetchCandidates();

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="bg-[#081028] min-h-screen text-white p-8">

      <h1 className="text-5xl font-bold mb-10">

        Recruitment Management

      </h1>

      {/* FORM */}

      <div className="bg-[#111c44] p-6 rounded-3xl mb-10">

        <div className="grid grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Candidate Name"
            value={candidateName}
            onChange={(e) =>
              setCandidateName(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          />

          <input
            type="text"
            placeholder="Job Position"
            value={position}
            onChange={(e) =>
              setPosition(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          />

          <input
            type="text"
            placeholder="Experience"
            value={experience}
            onChange={(e) =>
              setExperience(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          >
            <option value="">
              Select Status
            </option>

            <option>Applied</option>
            <option>Interview</option>
            <option>Selected</option>
            <option>Rejected</option>

          </select>

        </div>

        <button
          onClick={addCandidate}
          className="bg-green-500 px-6 py-3 rounded-xl mt-6 hover:bg-green-600"
        >
          Add Candidate
        </button>

      </div>

      {/* TABLE */}

      <div className="bg-[#111c44] rounded-3xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#1e293b]">

            <tr>

              <th className="text-left p-5">ID</th>

              <th className="text-left p-5">
                Candidate
              </th>

              <th className="text-left p-5">
                Position
              </th>

              <th className="text-left p-5">
                Experience
              </th>

              <th className="text-left p-5">
                Status
              </th>

              <th className="text-left p-5">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {candidates.map((item) => (

              <tr
                key={item.id}
                className="border-b border-slate-700"
              >

                <td className="p-5">
                  {item.id}
                </td>

                <td className="p-5">
                  {item.candidateName}
                </td>

                <td className="p-5">
                  {item.position}
                </td>

                <td className="p-5">
                  {item.experience}
                </td>

                <td className="p-5">

                  <span
                    className={`
                    px-3 py-1 rounded-lg

                    ${
                      item.status === "Selected"
                        ? "bg-green-500"

                        : item.status === "Rejected"
                        ? "bg-red-500"

                        : item.status === "Interview"
                        ? "bg-yellow-500"

                        : "bg-blue-500"
                    }
                    `}
                  >
                    {item.status}
                  </span>

                </td>

                <td className="p-5">

                  <button
                    onClick={() =>
                      deleteCandidate(item.id)
                    }
                    className="bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600"
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

export default Recruitment;