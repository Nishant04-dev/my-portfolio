import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, X, Trophy, RotateCcw, Play, Pause } from "lucide-react";

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const CELL_SIZE = 15;
const INITIAL_SPEED = 150;

const MiniGame = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem("snake_high_score");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  // Generate random food position
  const generateFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some((s) => s.x === newFood.x && s.y === newFood.y));
    return newFood;
  }, [snake]);

  // Handle keyboard input
  useEffect(() => {
    if (!isOpen || !isPlaying || gameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "s":
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "a":
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "d":
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isPlaying, gameOver, direction]);

  // Game loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    gameLoopRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
          y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
        };

        // Check collision with self
        if (prevSnake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
          setGameOver(true);
          setIsPlaying(false);
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("snake_high_score", score.toString());
          }
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check if food eaten
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, INITIAL_SPEED - Math.min(score, 100));

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, gameOver, direction, food, generateFood, score, highScore]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  const toggleGame = () => {
    if (gameOver) {
      resetGame();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Game Button */}
      <motion.button
        className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-card border border-border hover:border-primary transition-colors"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Play Snake Game"
      >
        <Gamepad2 className="w-5 h-5 text-foreground" />
      </motion.button>

      {/* Game Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="rounded-2xl p-6 max-w-md w-full"
              style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-6 h-6 text-primary" />
                  <h3 className="font-display text-2xl">SNAKE GAME</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-destructive/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Score */}
              <div className="flex justify-between mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Score:</span>
                  <span className="font-bold text-primary">{score}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="text-muted-foreground">Best:</span>
                  <span className="font-bold">{highScore}</span>
                </div>
              </div>

              {/* Game Board */}
              <div
                className="relative mx-auto rounded-lg overflow-hidden mb-4"
                style={{
                  width: GRID_SIZE * CELL_SIZE,
                  height: GRID_SIZE * CELL_SIZE,
                  background: "hsl(var(--muted))",
                }}
              >
                {/* Grid */}
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute border border-border/20"
                    style={{
                      width: CELL_SIZE,
                      height: CELL_SIZE,
                      left: (i % GRID_SIZE) * CELL_SIZE,
                      top: Math.floor(i / GRID_SIZE) * CELL_SIZE,
                    }}
                  />
                ))}

                {/* Snake */}
                {snake.map((segment, index) => (
                  <motion.div
                    key={index}
                    className="absolute rounded-sm"
                    style={{
                      width: CELL_SIZE - 2,
                      height: CELL_SIZE - 2,
                      left: segment.x * CELL_SIZE + 1,
                      top: segment.y * CELL_SIZE + 1,
                      background: index === 0 ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.7)",
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  />
                ))}

                {/* Food */}
                <motion.div
                  className="absolute rounded-full bg-green-500"
                  style={{
                    width: CELL_SIZE - 2,
                    height: CELL_SIZE - 2,
                    left: food.x * CELL_SIZE + 1,
                    top: food.y * CELL_SIZE + 1,
                  }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                />

                {/* Game Over Overlay */}
                {gameOver && (
                  <motion.div
                    className="absolute inset-0 bg-black/70 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-center">
                      <p className="font-display text-2xl text-primary mb-2">GAME OVER</p>
                      <p className="text-sm text-muted-foreground">Score: {score}</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={toggleGame}
                  className="btn-primary px-6 py-2 flex items-center gap-2"
                >
                  {gameOver ? (
                    <>
                      <RotateCcw className="w-4 h-4" />
                      Play Again
                    </>
                  ) : isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      {score > 0 ? "Resume" : "Start"}
                    </>
                  )}
                </button>
                <button
                  onClick={resetGame}
                  className="btn-secondary px-4 py-2"
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Instructions */}
              <p className="text-center text-xs text-muted-foreground mt-4">
                Use Arrow Keys or WASD to move
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MiniGame;
