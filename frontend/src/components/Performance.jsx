import { useState, useEffect } from "react";
import axios from "axios";

function Performance() {

  const [employee, setEmployee] = useState("");
  const [department, setDepartment] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  const [performances, setPerformances] = useState([]);

  useEffect(() => {
    fetchPerformance();
  }, []);

  const fetchPerformance = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/performance"
      );

      setPerformances(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // ADD PERFORMANCE

  const addPerformance = async () => {

    if (
      !employee ||
      !department ||
      !rating ||
      !review
    ) {
      alert("Please fill all fields");
      return;
    }

    const newPerformance = {
      employee,
      department,
      rating,
      review
    };

    try {

      await axios.post(
        "http://localhost:8080/api/performance",
        newPerformance
      );

      setEmployee("");
      setDepartment("");
      setRating("");
      setReview("");

      fetchPerformance();

    } catch (error) {
      console.log(error);
    }
  };

  // DELETE

  const deletePerformance = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8080/api/performance/${id}`
      );

      fetchPerformance();

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="bg-[#081028] min-h-screen text-white p-8">

      <h1 className="text-5xl font-bold mb-10">

        Performance Management

      </h1>

      {/* FORM */}

      <div className="bg-[#111c44] p-6 rounded-3xl mb-10">

        <div className="grid grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Employee Name"
            value={employee}
            onChange={(e) =>
              setEmployee(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          />

          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          />

          <select
            value={rating}
            onChange={(e) =>
              setRating(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          >
            <option value="">
              Select Rating
            </option>

            <option>Excellent</option>
            <option>Good</option>
            <option>Average</option>
            <option>Poor</option>

          </select>

          <input
            type="text"
            placeholder="Review"
            value={review}
            onChange={(e) =>
              setReview(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          />

        </div>

        <button
          onClick={addPerformance}
          className="bg-green-500 px-6 py-3 rounded-xl mt-6 hover:bg-green-600"
        >
          Save Review
        </button>

      </div>

      {/* TABLE */}

      <div className="bg-[#111c44] rounded-3xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#1e293b]">

            <tr>

              <th className="text-left p-5">ID</th>

              <th className="text-left p-5">Employee</th>

              <th className="text-left p-5">Department</th>

              <th className="text-left p-5">Rating</th>

              <th className="text-left p-5">Review</th>

              <th className="text-left p-5">Action</th>

            </tr>

          </thead>

          <tbody>

            {performances.map((item) => (

              <tr
                key={item.id}
                className="border-b border-slate-700"
              >

                <td className="p-5">{item.id}</td>

                <td className="p-5">
                  {item.employee}
                </td>

                <td className="p-5">
                  {item.department}
                </td>

                <td className="p-5">

                  <span
                    className={`
                    px-3 py-1 rounded-lg

                    ${
                      item.rating === "Excellent"
                        ? "bg-green-500"

                        : item.rating === "Good"
                        ? "bg-blue-500"

                        : item.rating === "Average"
                        ? "bg-yellow-500"

                        : "bg-red-500"
                    }
                    `}
                  >
                    {item.rating}
                  </span>

                </td>

                <td className="p-5">
                  {item.review}
                </td>

                <td className="p-5">

                  <button
                    onClick={() =>
                      deletePerformance(item.id)
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

export default Performance;