import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Rotate3D, Move, Sparkles, Box, Pyramid, Hexagon } from "lucide-react";

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
  const [hoverIntensity, setHoverIntensity] = useState(0);

  // Define shapes with enhanced colors
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
        { vertices: [0, 1, 2], color: "hsl(45, 100%, 50%)" },
        { vertices: [0, 2, 3], color: "hsl(45, 100%, 40%)" },
        { vertices: [0, 3, 4], color: "hsl(45, 100%, 35%)" },
        { vertices: [0, 4, 1], color: "hsl(45, 100%, 45%)" },
        { vertices: [1, 2, 3, 4], color: "hsl(45, 100%, 30%)" },
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
        { vertices: [0, 2, 3], color: "hsl(200, 100%, 50%)" },
        { vertices: [0, 3, 4], color: "hsl(200, 100%, 40%)" },
        { vertices: [0, 4, 5], color: "hsl(200, 100%, 35%)" },
        { vertices: [0, 5, 2], color: "hsl(200, 100%, 45%)" },
        { vertices: [1, 3, 2], color: "hsl(200, 100%, 55%)" },
        { vertices: [1, 4, 3], color: "hsl(200, 100%, 42%)" },
        { vertices: [1, 5, 4], color: "hsl(200, 100%, 38%)" },
        { vertices: [1, 2, 5], color: "hsl(200, 100%, 48%)" },
      ],
    },
  };

  const shapeIcons = {
    cube: Box,
    pyramid: Pyramid,
    octahedron: Hexagon,
  };

  // Rotate point
  const rotatePoint = (point: Point3D, angleX: number, angleY: number): Point3D => {
    let x = point.x * Math.cos(angleY) - point.z * Math.sin(angleY);
    let z = point.x * Math.sin(angleY) + point.z * Math.cos(angleY);
    
    let y = point.y * Math.cos(angleX) - z * Math.sin(angleX);
    z = point.y * Math.sin(angleX) + z * Math.cos(angleX);
    
    return { x, y, z };
  };

  // Project 3D to 2D
  const project = (point: Point3D, width: number, height: number): { x: number; y: number } => {
    const scale = 100 + hoverIntensity * 20;
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

      // Draw glow effect
      ctx.shadowBlur = 20 + hoverIntensity * 10;
      ctx.shadowColor = shape === "cube" ? "hsl(357, 83%, 47%)" : 
                        shape === "pyramid" ? "hsl(45, 100%, 50%)" : "hsl(200, 100%, 50%)";

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
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Reset shadow
      ctx.shadowBlur = 0;

      if (isAutoRotate) {
        autoRotation += 0.015;
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [rotation, isAutoRotate, shape, hoverIntensity]);

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
    <section id="3d-viewer" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center justify-center gap-3 mb-4"
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-primary" />
            <Rotate3D className="w-10 h-10 text-primary" />
            <Sparkles className="w-6 h-6 text-primary" />
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            3D <span className="gradient-text-red text-glow">EXPERIENCE</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interactive 3D shapes - drag to rotate, click shapes to switch
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.9, rotateX: -20 }}
          animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
        >
          <motion.div
            className="rounded-2xl overflow-hidden p-6 relative"
            style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}
            onMouseEnter={() => setHoverIntensity(1)}
            onMouseLeave={() => setHoverIntensity(0)}
            whileHover={{ boxShadow: "0 0 40px hsl(357 83% 47% / 0.3)" }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            
            {/* Shape Selector */}
            <div className="flex justify-center gap-3 mb-6">
              {(["cube", "pyramid", "octahedron"] as const).map((s) => {
                const Icon = shapeIcons[s];
                return (
                  <motion.button
                    key={s}
                    onClick={() => setShape(s)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                      shape === s
                        ? "bg-primary text-white shadow-lg"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </motion.button>
                );
              })}
            </div>

            {/* Canvas */}
            <motion.canvas
              ref={canvasRef}
              width={400}
              height={350}
              className="w-full rounded-xl cursor-grab active:cursor-grabbing"
              style={{ background: "hsl(var(--background))" }}
              onMouseMove={handleMouseMove}
              onMouseDown={() => setIsAutoRotate(false)}
              whileHover={{ scale: 1.02 }}
            />

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
              <motion.button
                onClick={() => setIsAutoRotate(!isAutoRotate)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                  isAutoRotate ? "bg-primary/20 text-primary" : "bg-muted hover:bg-muted/80"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={isAutoRotate ? { rotate: 360 } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Rotate3D className="w-4 h-4" />
                </motion.div>
                Auto Rotate
              </motion.button>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50">
                <Move className="w-4 h-4" />
                Drag to rotate
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ThreeDViewer;