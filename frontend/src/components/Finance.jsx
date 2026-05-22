import { useState, useEffect } from "react";
import axios from "axios";

function Finance() {

  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [finance, setFinance] = useState([]);

  useEffect(() => {
    fetchFinance();
  }, []);

  const fetchFinance = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/finance"
      );

      setFinance(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // ADD TRANSACTION

  const addFinance = async () => {

    if (
      !type ||
      !amount ||
      !description
    ) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      type,
      amount,
      description
    };

    try {

      await axios.post(
        "http://localhost:8080/api/finance",
        newTransaction
      );

      setType("");
      setAmount("");
      setDescription("");

      fetchFinance();

    } catch (error) {
      console.log(error);
    }
  };

  // DELETE

  const deleteFinance = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8080/api/finance/${id}`
      );

      fetchFinance();

    } catch (error) {
      console.log(error);
    }
  };

  // TOTALS

  const totalRevenue =
    finance
      .filter(item => item.type === "Revenue")
      .reduce((a, b) => a + b.amount, 0);

  const totalExpense =
    finance
      .filter(item => item.type === "Expense")
      .reduce((a, b) => a + b.amount, 0);

  const profit =
    totalRevenue - totalExpense;

  return (

    <div className="bg-[#081028] min-h-screen text-white p-8">

      <h1 className="text-5xl font-bold mb-10">

        Finance Management

      </h1>

      {/* CARDS */}

      <div className="grid grid-cols-3 gap-6 mb-10">

        <div className="bg-green-500 p-6 rounded-3xl">

          <h1 className="text-2xl">

            Revenue

          </h1>

          <h1 className="text-4xl font-bold mt-3">

            ₹{totalRevenue}

          </h1>

        </div>

        <div className="bg-red-500 p-6 rounded-3xl">

          <h1 className="text-2xl">

            Expenses

          </h1>

          <h1 className="text-4xl font-bold mt-3">

            ₹{totalExpense}

          </h1>

        </div>

        <div className="bg-blue-500 p-6 rounded-3xl">

          <h1 className="text-2xl">

            Profit

          </h1>

          <h1 className="text-4xl font-bold mt-3">

            ₹{profit}

          </h1>

        </div>

      </div>

      {/* FORM */}

      <div className="bg-[#111c44] p-6 rounded-3xl mb-10">

        <div className="grid grid-cols-3 gap-4">

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          >

            <option value="">
              Select Type
            </option>

            <option>
              Revenue
            </option>

            <option>
              Expense
            </option>

          </select>

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          />

        </div>

        <button
          onClick={addFinance}
          className="bg-green-500 px-6 py-3 rounded-xl mt-6 hover:bg-green-600"
        >
          Add Transaction
        </button>

      </div>

      {/* TABLE */}

      <div className="bg-[#111c44] rounded-3xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#1e293b]">

            <tr>

              <th className="text-left p-5">
                ID
              </th>

              <th className="text-left p-5">
                Type
              </th>

              <th className="text-left p-5">
                Amount
              </th>

              <th className="text-left p-5">
                Description
              </th>

              <th className="text-left p-5">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {finance.map((item) => (

              <tr
                key={item.id}
                className="border-b border-slate-700"
              >

                <td className="p-5">
                  {item.id}
                </td>

                <td className="p-5">

                  <span
                    className={`
                    px-3 py-1 rounded-lg

                    ${
                      item.type === "Revenue"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }
                    `}
                  >
                    {item.type}
                  </span>

                </td>

                <td className="p-5">
                  ₹{item.amount}
                </td>

                <td className="p-5">
                  {item.description}
                </td>

                <td className="p-5">

                  <button
                    onClick={() =>
                      deleteFinance(item.id)
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

export default Finance;