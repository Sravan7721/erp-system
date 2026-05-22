import { useRef } from "react";

import html2canvas from "html2canvas";

function EmployeeIDCard() {

  const employees =
    JSON.parse(localStorage.getItem("employees")) || [];

  const cardRefs = useRef({});

  // DOWNLOAD CARD

  const downloadCard = async (id, name) => {

    const card =
      cardRefs.current[id];

    const canvas =
      await html2canvas(card);

    const image =
      canvas.toDataURL("image/png");

    const link =
      document.createElement("a");

    link.href = image;

    link.download = `${name}_ID_Card.png`;

    link.click();
  };

  return (

    <div className="min-h-screen bg-[#081028] text-white p-10">

      {/* TITLE */}

      <h1 className="text-5xl font-bold mb-10">

        Employee ID Cards

      </h1>

      {/* CARDS */}

      <div className="grid grid-cols-3 gap-8">

        {employees.map((emp) => (

          <div
            key={emp.id}
            className="bg-[#1e293b] p-6 rounded-3xl shadow-xl"
          >

            {/* ID CARD */}

            <div
              ref={(el) =>
                (cardRefs.current[emp.id] = el)
              }
              className="bg-gradient-to-br from-green-500 to-blue-500 rounded-3xl p-6 text-black"
            >

              {/* COMPANY */}

              <h1 className="text-2xl font-bold text-center">

                ERP PRO

              </h1>

              <p className="text-center text-sm mb-5">

                Employee Identity Card

              </p>

              {/* PHOTO */}

              <div className="flex justify-center">

                <img
                  src={
                    emp.photo ||
                    "https://via.placeholder.com/120"
                  }
                  alt="Employee"
                  className="w-28 h-28 rounded-full border-4 border-white object-cover"
                />

              </div>

              {/* DETAILS */}

              <div className="mt-6 text-center">

                <h2 className="text-2xl font-bold">

                  {emp.name}

                </h2>

                <p className="mt-2">

                  {emp.department}

                </p>

                <p className="mt-2 font-semibold">

                  Salary: ₹{emp.salary}

                </p>

                <p className="mt-4 text-sm">

                  Employee ID:
                  {" "}
                  {emp.id}

                </p>

              </div>

            </div>

            {/* DOWNLOAD BUTTON */}

            <button
              onClick={() =>
                downloadCard(
                  emp.id,
                  emp.name
                )
              }
              className="w-full bg-green-500 hover:bg-green-600 mt-5 py-3 rounded-xl font-bold"
            >

              Download ID Card

            </button>

          </div>

        ))}

      </div>

    </div>

  );
}

export default EmployeeIDCard;