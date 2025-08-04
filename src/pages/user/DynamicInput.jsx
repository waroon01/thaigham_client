import { useState } from "react";
import DropdownTeacher from "../../components/app/DropdownTeacher";

const DynamicInput = () => {
  const [inputFields, setInputFields] = useState([
    { docname: "", title: "", note: "" },
  ]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formValues, setFormValues] = useState({
    date_accept: new Date().toISOString().split("T")[0],
    time_accept: new Date().toTimeString().slice(0, 5),
    receiver: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleValueChange = (index, field, event) => {
    const values = [...inputFields];
    values[index][field] = event.target.value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { docname: "", title: "", note: "" }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.receiver.trim()) {
      newErrors.receiver = "กรุณากรอกชื่อผู้รับเอกสาร";
    }

    if (!selectedTeacher) {
      newErrors.teacher = "กรุณาเลือกครูผู้รับฝาก";
    }

    const fieldErrors = inputFields.map((field) => {
      const err = {};
      if (!field.docname.trim()) err.docname = "กรุณากรอกชื่อเอกสาร";
      if (!field.title.trim()) err.title = "กรุณากรอกเรื่อง";
      if (!field.note.trim()) err.note = "กรุณากรอกหมายเหตุ";
      return err;
    });

    const hasFieldErrors = fieldErrors.some((f) => Object.keys(f).length > 0);
    if (hasFieldErrors) {
      newErrors.inputFields = fieldErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = {
      ...formValues,
      teacher: selectedTeacher?.fullName || "",
      inputFields,
    };

    console.log("✅ Submitted:", formData);
    alert("ส่งข้อมูลเรียบร้อย!");
  };

  const handleReset = () => {
    setInputFields([{ docname: "", title: "", note: "" }]);
    setFormValues({
      date_accept: new Date().toISOString().split("T")[0],
      time_accept: new Date().toTimeString().slice(0, 5),
      receiver: "",
    });
    setSelectedTeacher(null);
    setErrors({});
  };

  return (
    <div className="container mx-auto">
      <div className="w-full bg-white shadow-xl rounded-xl flex flex-col mx-4 md:mx-8 p-8 gap-6 border border-gray-200">
        <h1 className="text-center text-xl font-semibold text-gray-700">📄 ฟอร์มฝากเอกสาร</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-amber-200 px-6 py-4 rounded-2xl bg-amber-50">
            <div>
              <label htmlFor="date_accept" className="text-sm font-medium text-gray-600">วันที่ :</label>
              <input
                type="date"
                name="date_accept"
                className="w-full border px-4 py-3 mt-2 rounded-xl focus:outline-amber-400 transition"
                value={formValues.date_accept}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="time_accept" className="text-sm font-medium text-gray-600">เวลา :</label>
              <input
                type="time"
                name="time_accept"
                className="w-full border px-4 py-3 mt-2 rounded-xl focus:outline-amber-400 transition"
                value={formValues.time_accept}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <DropdownTeacher onSelect={setSelectedTeacher} />
              {errors.teacher && <p className="text-red-500 text-sm mt-1">{errors.teacher}</p>}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="receiver" className="text-sm font-medium text-gray-600">ชื่อผู้รับเอกสาร :</label>
              <input
                type="text"
                name="receiver"
                placeholder="ผู้รับฝาก"
                className="w-full border px-4 py-3 mt-2 rounded-xl focus:outline-amber-400 transition"
                value={formValues.receiver}
                onChange={handleChange}
              />
              {errors.receiver && <p className="text-red-500 text-sm mt-1">{errors.receiver}</p>}
            </div>
          </div>

          <div className="mt-6">
            {inputFields.map((inputField, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="ชื่อเอกสาร"
                    className="w-full border px-4 py-3 rounded-xl focus:outline-blue-400"
                    value={inputField.docname}
                    onChange={(e) => handleValueChange(index, "docname", e)}
                  />
                  {errors.inputFields?.[index]?.docname && (
                    <p className="text-red-500 text-sm mt-1">{errors.inputFields[index].docname}</p>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="เรื่อง"
                    className="w-full border px-4 py-3 rounded-xl focus:outline-blue-400"
                    value={inputField.title}
                    onChange={(e) => handleValueChange(index, "title", e)}
                  />
                  {errors.inputFields?.[index]?.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.inputFields[index].title}</p>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="หมายเหตุ"
                    className="w-full border px-4 py-3 rounded-xl focus:outline-blue-400"
                    value={inputField.note}
                    onChange={(e) => handleValueChange(index, "note", e)}
                  />
                  {errors.inputFields?.[index]?.note && (
                    <p className="text-red-500 text-sm mt-1">{errors.inputFields[index].note}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl self-center mt-2 md:mt-0"
                >
                  ลบ
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-xl"
            >
              🔄 รีเซต
            </button>
            <button
              type="button"
              onClick={handleAddFields}
              className="px-5 py-3 bg-blue-400 hover:bg-blue-500 text-white rounded-xl"
            >
              ➕ เพิ่มรายการ
            </button>
            <button
              type="submit"
              className="px-5 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl"
            >
              ✅ ส่งข้อมูล
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicInput;
