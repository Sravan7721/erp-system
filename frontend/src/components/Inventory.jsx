import { useState, useEffect } from "react";
import axios from "axios";

function Inventory() {

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplier, setSupplier] = useState("");

  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/inventory"
      );

      setInventory(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // ADD ITEM

  const addInventory = async () => {

    if (
      !productName ||
      !category ||
      !quantity ||
      !supplier
    ) {
      alert("Please fill all fields");
      return;
    }

    const newItem = {
      productName,
      category,
      quantity,
      supplier
    };

    try {

      await axios.post(
        "http://localhost:8080/api/inventory",
        newItem
      );

      setProductName("");
      setCategory("");
      setQuantity("");
      setSupplier("");

      fetchInventory();

    } catch (error) {
      console.log(error);
    }
  };

  // DELETE

  const deleteItem = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8080/api/inventory/${id}`
      );

      fetchInventory();

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="bg-[#081028] min-h-screen text-white p-8">

      <h1 className="text-5xl font-bold mb-10">

        Inventory Management

      </h1>

      {/* FORM */}

      <div className="bg-[#111c44] p-6 rounded-3xl mb-10">

        <div className="grid grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) =>
              setProductName(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          />

          <input
            type="text"
            placeholder="Supplier"
            value={supplier}
            onChange={(e) =>
              setSupplier(e.target.value)
            }
            className="bg-[#334155] p-4 rounded-xl outline-none"
          />

        </div>

        <button
          onClick={addInventory}
          className="bg-green-500 px-6 py-3 rounded-xl mt-6 hover:bg-green-600"
        >
          Add Inventory
        </button>

      </div>

      {/* TABLE */}

      <div className="bg-[#111c44] rounded-3xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#1e293b]">

            <tr>

              <th className="text-left p-5">ID</th>

              <th className="text-left p-5">
                Product
              </th>

              <th className="text-left p-5">
                Category
              </th>

              <th className="text-left p-5">
                Quantity
              </th>

              <th className="text-left p-5">
                Supplier
              </th>

              <th className="text-left p-5">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {inventory.map((item) => (

              <tr
                key={item.id}
                className="border-b border-slate-700"
              >

                <td className="p-5">
                  {item.id}
                </td>

                <td className="p-5">
                  {item.productName}
                </td>

                <td className="p-5">
                  {item.category}
                </td>

                <td className="p-5">

                  <span className="bg-cyan-500 px-3 py-1 rounded-lg">

                    {item.quantity}

                  </span>

                </td>

                <td className="p-5">
                  {item.supplier}
                </td>

                <td className="p-5">

                  <button
                    onClick={() =>
                      deleteItem(item.id)
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

export default Inventory;