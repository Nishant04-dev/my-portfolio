import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, X, Trophy, RotateCcw, Play, Pause } from "lucide-react";

interface Pos { x: number; y: number; }

const GRID  = 20;
const CELL  = 15;
const SIZE  = GRID * CELL; // 300px

const MiniGame = () => {
  const [isOpen,    setIsOpen]    = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score,     setScore]     = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver,  setGameOver]  = useState(false);

  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const stateRef   = useRef({
    snake:     [{ x: 10, y: 10 }] as Pos[],
    food:      { x: 15, y: 15 } as Pos,
    dir:       { x: 1, y: 0 } as Pos,
    nextDir:   { x: 1, y: 0 } as Pos,
    score:     0,
    gameOver:  false,
    loopId:    null as ReturnType<typeof setInterval> | null,
  });

  useEffect(() => {
    const saved = localStorage.getItem("snake_hs");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = stateRef.current;

    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, SIZE, SIZE);

    // Grid lines
    ctx.strokeStyle = "rgba(0,255,136,0.04)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, SIZE); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(SIZE, i * CELL); ctx.stroke();
    }

    // Food
    ctx.fillStyle = "#ff3366";
    ctx.shadowColor = "#ff3366";
    ctx.shadowBlur = 8;
    ctx.fillRect(s.food.x * CELL + 2, s.food.y * CELL + 2, CELL - 4, CELL - 4);
    ctx.shadowBlur = 0;

    // Snake
    s.snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? "#00ff88" : `rgba(0,255,136,${0.7 - i * 0.02})`;
      ctx.shadowColor = i === 0 ? "#00ff88" : "transparent";
      ctx.shadowBlur  = i === 0 ? 6 : 0;
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
    });
    ctx.shadowBlur = 0;

    // Game over overlay
    if (s.gameOver) {
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.fillStyle = "#00ff88";
      ctx.font = "bold 18px 'Orbitron', monospace";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", SIZE / 2, SIZE / 2 - 10);
      ctx.fillStyle = "#6b7280";
      ctx.font = "12px 'JetBrains Mono', monospace";
      ctx.fillText(`Score: ${s.score}`, SIZE / 2, SIZE / 2 + 14);
    }
  }, []);

  const tick = useCallback(() => {
    const s = stateRef.current;
    if (s.gameOver) return;

    s.dir = s.nextDir;
    const head = s.snake[0];
    const newHead = {
      x: (head.x + s.dir.x + GRID) % GRID,
      y: (head.y + s.dir.y + GRID) % GRID,
    };

    if (s.snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
      s.gameOver = true;
      setGameOver(true);
      setIsPlaying(false);
      if (s.score > highScore) {
        setHighScore(s.score);
        localStorage.setItem("snake_hs", String(s.score));
      }
      draw();
      return;
    }

    const newSnake = [newHead, ...s.snake];
    if (newHead.x === s.food.x && newHead.y === s.food.y) {
      s.score += 10;
      setScore(s.score);
      let f: Pos;
      do { f = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) }; }
      while (newSnake.some(seg => seg.x === f.x && seg.y === f.y));
      s.food = f;
    } else {
      newSnake.pop();
    }
    s.snake = newSnake;
    draw();
  }, [draw, highScore]);

  const startLoop = useCallback(() => {
    const s = stateRef.current;
    if (s.loopId) clearInterval(s.loopId);
    const speed = Math.max(80, 150 - Math.floor(s.score / 50) * 10);
    s.loopId = setInterval(tick, speed);
  }, [tick]);

  const stopLoop = useCallback(() => {
    const s = stateRef.current;
    if (s.loopId) { clearInterval(s.loopId); s.loopId = null; }
  }, []);

  const reset = useCallback(() => {
    stopLoop();
    const s = stateRef.current;
    s.snake   = [{ x: 10, y: 10 }];
    s.food    = { x: 15, y: 15 };
    s.dir     = { x: 1, y: 0 };
    s.nextDir = { x: 1, y: 0 };
    s.score   = 0;
    s.gameOver = false;
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    draw();
    startLoop();
  }, [draw, startLoop, stopLoop]);

  useEffect(() => {
    if (!isOpen || !isPlaying || gameOver) return;
    const onKey = (e: KeyboardEvent) => {
      const s = stateRef.current;
      const d = s.dir;
      if ((e.key === "ArrowUp"    || e.key === "w") && d.y !== 1)  s.nextDir = { x: 0, y: -1 };
      if ((e.key === "ArrowDown"  || e.key === "s") && d.y !== -1) s.nextDir = { x: 0, y: 1 };
      if ((e.key === "ArrowLeft"  || e.key === "a") && d.x !== 1)  s.nextDir = { x: -1, y: 0 };
      if ((e.key === "ArrowRight" || e.key === "d") && d.x !== -1) s.nextDir = { x: 1, y: 0 };
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, isPlaying, gameOver]);

  useEffect(() => {
    if (isPlaying && !gameOver) { startLoop(); }
    else { stopLoop(); }
    return stopLoop;
  }, [isPlaying, gameOver, startLoop, stopLoop]);

  // Draw initial state when modal opens
  useEffect(() => {
    if (isOpen) { setTimeout(draw, 50); }
    else { stopLoop(); }
  }, [isOpen, draw, stopLoop]);

  return (
    <>
      <motion.button
        className="fixed bottom-24 left-8 z-[60] w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all duration-150"
        style={{ clipPath: "polygon(0 6px, 6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px))" }}
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.7 }}
        whileHover={{ boxShadow: "0 0 10px #00ff88, 0 0 20px #00ff8860" }}
        title="Play Snake"
      >
        <Gamepad2 className="w-4 h-4" strokeWidth={1.5} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setIsOpen(false); stopLoop(); }}
          >
            <motion.div
              className="cyber-card p-6 max-w-sm w-full"
              style={{ borderColor: "#00ff8840" }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  <span className="font-display text-lg tracking-widest">SNAKE</span>
                </div>
                <button
                  onClick={() => { setIsOpen(false); stopLoop(); }}
                  className="w-7 h-7 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex justify-between font-mono text-xs text-muted-foreground mb-3">
                <span>Score: <span className="text-primary">{score}</span></span>
                <span className="flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-[#ffcc00]" />
                  Best: <span className="text-[#ffcc00]">{highScore}</span>
                </span>
              </div>

              <canvas
                ref={canvasRef}
                width={SIZE}
                height={SIZE}
                className="w-full border border-border mb-4"
                style={{ imageRendering: "pixelated" }}
              />

              <div className="flex gap-2 justify-center">
                <button
                  onClick={gameOver ? reset : () => setIsPlaying(p => !p)}
                  className="btn-cyber text-xs px-5 py-2 flex items-center gap-1.5"
                >
                  {gameOver ? <><RotateCcw className="w-3.5 h-3.5" />Play Again</>
                    : isPlaying ? <><Pause className="w-3.5 h-3.5" />Pause</>
                    : <><Play className="w-3.5 h-3.5" />{score > 0 ? "Resume" : "Start"}</>}
                </button>
                <button
                  onClick={reset}
                  className="btn-cyber-ghost text-xs px-3 py-2"
                  title="Reset"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="font-mono text-[10px] text-muted-foreground text-center mt-3 uppercase tracking-wider">
                Arrow keys / WASD to move
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MiniGame;
