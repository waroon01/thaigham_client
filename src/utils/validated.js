  export const validatedError = ({setError, form}) => {
    let valid = true;

    if (!form.idstd.trim()) {
      setError((prevError) => ({
        ...prevError,
        idstd: "รหัสนักเรียนต้องไม่เป็นค่าว่าง",
      }));
      valid = false;
    } else {
      setError((prevError) => ({
        ...prevError,
        idstd: "",
      }));
    }

    if (!form.namestd.trim()) {
      setError((prevError) => ({
        ...prevError,
        namestd: "ชื่อของนักเรียนต้องไม่เป็นค่าว่าง",
      }));
      valid = false;
    } else {
      setError((prevError) => ({
        ...prevError,
        namestd: "",
      }));
    }

    return valid;
  };