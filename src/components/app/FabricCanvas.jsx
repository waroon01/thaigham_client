import { useEffect, useRef } from "react";
import * as fabric from "fabric"; // <- กรณี default import ไม่ได้


const FabricCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);

    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "red",
      width: 100,
      height: 100,
    });

    canvas.add(rect);

    return () => {
      canvas.dispose(); // cleanup
    };
  }, []);

  return <canvas ref={canvasRef} width={500} height={400} />;
};

export default FabricCanvas;
