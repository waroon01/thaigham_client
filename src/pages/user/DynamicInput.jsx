import { useState } from "react";

const DynamicInput = () => {
  const [inputFields, setInputFields] = useState([
    { col1: "", col2: "", col3: "" },
  ]);

  const handleValueChange = (index, field, event) => {
    const values = [...inputFields];
    values[index][field] = event.target.value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { col1: "", col2: "", col3: "" }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputFields);
  };

  const handleReset = () => {
    setInputFields([{ col1: "", col2: "", col3: "" }]);
  };

  return (
    <div className="container">
      <div className="w-lg bg-white rounded-md flex flex-col mx-8 p-8 justify-center gap-4">
        <h1 className="text-center">Dynamic input Fields</h1>
        <form onSubmit={handleSubmit}>
          {inputFields.map((inputField, index) => (
            <div className="flex gap-4 mb-3" key={index}>
              <input
                type="text"
                className="w-full border px-4 py-3 rounded-2xl"
                placeholder="ช่องที่ 1"
                onChange={(e) => handleValueChange(index, "col1", e)}
                value={inputField.col1}
              />
              <input
                type="text"
                className="w-full border px-4 py-3 rounded-2xl"
                placeholder="ช่องที่ 2"
                onChange={(e) => handleValueChange(index, "col2", e)}
                value={inputField.col2}
              />
              <input
                type="text"
                className="w-full border px-4 py-3 rounded-2xl"
                placeholder="ช่องที่ 3"
                onChange={(e) => handleValueChange(index, "col3", e)}
                value={inputField.col3}
              />
              <button
                onClick={() => handleRemoveFields(index)}
                className="bg-red-400 rounded-2xl cursor-pointer text-white px-3 py-2"
              >
                delete
              </button>
            </div>
          ))}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-3 w-50 cursor-pointer bg-blue-300 text-white hover:bg-blue-400 hover:text-blue-100 rounded-2xl mb-4"
            >
              Reset
            </button>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleAddFields}
              className="px-5 py-3 w-50 cursor-pointer bg-blue-300 text-white hover:bg-blue-400 hover:text-blue-100 rounded-2xl"
            >
              + Add Field
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="px-5 py-3 w-50 cursor-pointer bg-green-300 text-white hover:bg-green-400 hover:text-green-100 rounded-2xl"
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicInput;
