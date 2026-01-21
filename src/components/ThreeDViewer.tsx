import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Rotate3D, Move, ZoomIn } from "lucide-react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Face {
  vertices: number[];
  color: string;
}

const ThreeDViewer = () => {
  const ref = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [shape, setShape] = useState<"cube" | "pyramid" | "octahedron">("cube");

  // Define shapes
  const shapes = {
    cube: {
      vertices: [
        { x: -1, y: -1, z: -1 },
        { x: 1, y: -1, z: -1 },
        { x: 1, y: 1, z: -1 },
        { x: -1, y: 1, z: -1 },
        { x: -1, y: -1, z: 1 },
        { x: 1, y: -1, z: 1 },
        { x: 1, y: 1, z: 1 },
        { x: -1, y: 1, z: 1 },
      ],
      faces: [
        { vertices: [0, 1, 2, 3], color: "hsl(357, 83%, 47%)" },
        { vertices: [4, 5, 6, 7], color: "hsl(357, 83%, 40%)" },
        { vertices: [0, 1, 5, 4], color: "hsl(357, 83%, 35%)" },
        { vertices: [2, 3, 7, 6], color: "hsl(357, 83%, 45%)" },
        { vertices: [0, 3, 7, 4], color: "hsl(357, 83%, 30%)" },
        { vertices: [1, 2, 6, 5], color: "hsl(357, 83%, 50%)" },
      ],
    },
    pyramid: {
      vertices: [
        { x: 0, y: -1.5, z: 0 },
        { x: -1, y: 1, z: -1 },
        { x: 1, y: 1, z: -1 },
        { x: 1, y: 1, z: 1 },
        { x: -1, y: 1, z: 1 },
      ],
      faces: [
        { vertices: [0, 1, 2], color: "hsl(357, 83%, 47%)" },
        { vertices: [0, 2, 3], color: "hsl(357, 83%, 40%)" },
        { vertices: [0, 3, 4], color: "hsl(357, 83%, 35%)" },
        { vertices: [0, 4, 1], color: "hsl(357, 83%, 45%)" },
        { vertices: [1, 2, 3, 4], color: "hsl(357, 83%, 30%)" },
      ],
    },
    octahedron: {
      vertices: [
        { x: 0, y: -1.5, z: 0 },
        { x: 0, y: 1.5, z: 0 },
        { x: -1, y: 0, z: -1 },
        { x: 1, y: 0, z: -1 },
        { x: 1, y: 0, z: 1 },
        { x: -1, y: 0, z: 1 },
      ],
      faces: [
        { vertices: [0, 2, 3], color: "hsl(357, 83%, 47%)" },
        { vertices: [0, 3, 4], color: "hsl(357, 83%, 40%)" },
        { vertices: [0, 4, 5], color: "hsl(357, 83%, 35%)" },
        { vertices: [0, 5, 2], color: "hsl(357, 83%, 45%)" },
        { vertices: [1, 3, 2], color: "hsl(357, 83%, 50%)" },
        { vertices: [1, 4, 3], color: "hsl(357, 83%, 42%)" },
        { vertices: [1, 5, 4], color: "hsl(357, 83%, 38%)" },
        { vertices: [1, 2, 5], color: "hsl(357, 83%, 48%)" },
      ],
    },
  };

  // Rotate point
  const rotatePoint = (point: Point3D, angleX: number, angleY: number): Point3D => {
    // Rotate around Y axis
    let x = point.x * Math.cos(angleY) - point.z * Math.sin(angleY);
    let z = point.x * Math.sin(angleY) + point.z * Math.cos(angleY);
    
    // Rotate around X axis
    let y = point.y * Math.cos(angleX) - z * Math.sin(angleX);
    z = point.y * Math.sin(angleX) + z * Math.cos(angleX);
    
    return { x, y, z };
  };

  // Project 3D to 2D
  const project = (point: Point3D, width: number, height: number): { x: number; y: number } => {
    const scale = 80;
    const distance = 4;
    const z = point.z + distance;
    
    return {
      x: (point.x * scale) / z + width / 2,
      y: (point.y * scale) / z + height / 2,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let autoRotation = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);

      const currentShape = shapes[shape];
      const angleX = rotation.x + (isAutoRotate ? autoRotation * 0.3 : 0);
      const angleY = rotation.y + (isAutoRotate ? autoRotation : 0);

      // Transform vertices
      const transformedVertices = currentShape.vertices.map((v) =>
        rotatePoint(v, angleX, angleY)
      );

      // Sort faces by average Z (painter's algorithm)
      const sortedFaces = [...currentShape.faces]
        .map((face, index) => {
          const avgZ = face.vertices.reduce(
            (sum, vi) => sum + transformedVertices[vi].z,
            0
          ) / face.vertices.length;
          return { ...face, avgZ, index };
        })
        .sort((a, b) => a.avgZ - b.avgZ);

      // Draw faces
      sortedFaces.forEach((face) => {
        const projectedPoints = face.vertices.map((vi) =>
          project(transformedVertices[vi], width, height)
        );

        ctx.beginPath();
        ctx.moveTo(projectedPoints[0].x, projectedPoints[0].y);
        projectedPoints.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
        ctx.closePath();

        ctx.fillStyle = face.color;
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      if (isAutoRotate) {
        autoRotation += 0.01;
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [rotation, isAutoRotate, shape]);

  // Handle mouse drag
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.buttons !== 1) return;
    setIsAutoRotate(false);
    setRotation((prev) => ({
      x: prev.x + e.movementY * 0.01,
      y: prev.y + e.movementX * 0.01,
    }));
  };

  return (
    <section id="3d-viewer" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Rotate3D className="w-8 h-8 text-primary" />
            <h2 className="font-display text-4xl md:text-5xl">
              3D <span className="gradient-text-red text-glow">VIEWER</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interactive 3D shapes - drag to rotate, click shapes to switch
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            className="rounded-2xl overflow-hidden p-4"
            style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}
          >
            {/* Shape Selector */}
            <div className="flex justify-center gap-2 mb-4">
              {(["cube", "pyramid", "octahedron"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setShape(s)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    shape === s
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>

            {/* Canvas */}
            <canvas
              ref={canvasRef}
              width={400}
              height={300}
              className="w-full rounded-lg cursor-grab active:cursor-grabbing"
              style={{ background: "hsl(var(--background))" }}
              onMouseMove={handleMouseMove}
              onMouseDown={() => setIsAutoRotate(false)}
            />

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
              <button
                onClick={() => setIsAutoRotate(!isAutoRotate)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                  isAutoRotate ? "bg-primary/20 text-primary" : "bg-muted"
                }`}
              >
                <Rotate3D className="w-4 h-4" />
                Auto Rotate
              </button>
              <div className="flex items-center gap-2">
                <Move className="w-4 h-4" />
                Drag to rotate
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ThreeDViewer;
