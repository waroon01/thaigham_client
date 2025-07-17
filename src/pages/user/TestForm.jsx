import { useState } from "react";
import { validatedError } from "../../utils/validated";
import FabricCanvas from "../../components/app/FabricCanvas";

const TestForm = () => {
  const initialData = {
    idstd: "",
    namestd: "",
  };

  const [error, setError] = useState({
    idstd: "",
    namestd: "",
  });

  const [form, setForm] = useState(initialData);


  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatedError({setError, form})) {
      console.log("✅ success submit form");
      console.log(form);
    }
  };

  return (
    <div className="justify-center flex items-center min-h-[calc(100vh-90px)] bg-red-200">
      <div className="bg-white rounded-md shadow w-md p-10">
        <h1 className="text-2xl font-bold mb-4">Form</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <input
              onChange={handleChange}
              name="idstd"
              type="text"
              placeholder="รหัสนักเรียน"
              className="border border-gray-300 rounded-md p-3 focus:border-amber-200 focus:ring-amber-200 focus:outline-none focus:ring-2 mb-2 w-full"
            />
            {error.idstd && (
              <p className="text-red-500 text-sm mt-1">{error.idstd}</p>
            )}
          </div>
          <div>
            <input
              onChange={handleChange}
              name="namestd"
              type="text"
              placeholder="ชื่อนักเรียน"
              className="border border-gray-300 rounded-md p-3 focus:border-amber-200 focus:ring-amber-200 focus:outline-none focus:ring-2 mb-2 w-full"
            />
            {error.namestd && (
              <p className="text-red-500 text-sm mt-1">{error.namestd}</p>
            )}
          </div>
          <button className="p-3 bg-yellow-300 w-full rounded-2xl text-2xl text-white hover:bg-yellow-400 hover:text-3xl mt-4">
            Submit
          </button>
        </form>
            <FabricCanvas/>

      </div>
    </div>
  );
};
export default TestForm;
