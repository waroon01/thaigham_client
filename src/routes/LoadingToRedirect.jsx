import { useEffect, useState } from "react";
import { Navigate } from "react-router";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => {
        if (currentCount === 1) {
          clearInterval(interval);
          setRedirect(true);
        }
        return currentCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white via-gray-50 to-gray-200 px-4">
      <div className="flex flex-col items-center space-y-6">
        {/* วงล้อหมุน */}
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>

        {/* ข้อความ */}
        <div className="text-center">
          <p className="text-gray-700 text-lg font-medium">
            กำลังเปลี่ยนเส้นทาง...
          </p>
          <p className="text-gray-500 text-sm">
            จะนำคุณไปยังหน้าล็อกอินในอีก{" "}
            <span className="font-semibold text-blue-600">{count}</span>{" "}
            วินาที
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingToRedirect;
