import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { Loader2 } from "lucide-react"; // optional icon

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
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
      <div className="flex items-center gap-3 text-gray-600 text-lg">
        <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
        <span>กำลังเปลี่ยนเส้นทาง...</span>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        จะนำคุณไปยังหน้าล็อกอินในอีก <span className="font-bold">{count}</span> วินาที
      </p>
    </div>
  );
};

export default LoadingToRedirect;
