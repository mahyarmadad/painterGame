import {socketDraw, socketStartDraw, socketStopDraw} from "@Hooks/socketServer";
import {Send} from "@mui/icons-material";
import {IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {useRouter} from "next/router";
import {useCallback, useEffect, useRef, useState} from "react";
import {useRecoilValue} from "recoil";
import {onlineUsersRecoil, userRecoil} from "../../recoil/user";

function getMousePos(canvas, x, y) {
  let rect = canvas.getBoundingClientRect(),
    scaleX = canvas.width / rect.width,
    scaleY = canvas.height / rect.height;
  return {
    x: (x - rect.left) * scaleX,
    y: (y - rect.top) * scaleY,
  };
}

export default function AppPage() {
  const [color, setColor] = useState("#ffffff");
  const [isDrawing, setIsDrawing] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const user = useRecoilValue(userRecoil);
  const onlineUsers = useRecoilValue(onlineUsersRecoil);

  const router = useRouter();
  const canvasRef = useRef();

  useEffect(() => {
    if (!user) router.push("/");
  }, [router, user]);

  useEffect(() => {
    console.log("onlineUsers", onlineUsers);
  }, [onlineUsers]);

  const startDraw = useCallback(({x, y}) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let context = canvas.getContext("2d");
    console.log({context});
    context.beginPath();
    let cor = getMousePos(canvas, x, y);
    context.moveTo(cor.x, cor.y);
    console.log("startDraw", {x: cor.x, y: cor.y});
  }, []);

  const draw = useCallback(({x, y, lineColor = "black"}) => {
    console.log("drawing", {x, y});
    const canvas = canvasRef.current;
    if (!canvas) return;
    let context = canvas.getContext("2d");
    let cor = getMousePos(canvas, x, y);
    context.lineTo(cor.x, cor.y);
    context.strokeStyle = lineColor;
    context.lineWidth = "1";
    context.lineJoin = "round";
    context.lineCap = "round";
    context.stroke();
  }, []);

  const stopDraw = useCallback(() => {
    console.log("stopDraw");
    const canvas = canvasRef.current;
    if (!canvas) return;
    let context = canvas.getContext("2d");
    context.stroke();
    context.closePath();
  }, []);

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      setIsDrawing(true);
      const cordinate = {x: e.clientX, y: e.clientY};
      startDraw(cordinate);
      socketStartDraw({...cordinate, color});
    },
    [color, startDraw],
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (isDrawing) {
        const cordinate = {x: e.clientX, y: e.clientY};
        draw({
          ...cordinate,
          lineColor: color,
        });
        socketDraw({
          ...cordinate,
          color,
        });
      }
    },
    [color, draw, isDrawing],
  );

  const handleMouseUp = useCallback(
    (e) => {
      if (isDrawing) {
        e.preventDefault();
        setIsDrawing(false);
        stopDraw();
        socketStopDraw();
      }
    },
    [isDrawing, stopDraw],
  );

  const onSendMsg = useCallback((e) => {
    setChatMsg("");
  }, []);

  return (
    <div className="h-screen flex justify-center">
      <div className="w-full max-w-5xl py-10 flex gap-32	">
        <div className="w-full flex flex-col">
          <div className="flex items-center mb-2">
            <Typography className="mr-4">Need Another user</Typography>
            <TextField
              type="color"
              size="small"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-16"
            />
          </div>
          <div className="flex-grow">
            <canvas
              ref={canvasRef}
              className="bg-neutral-800 rounded-lg w-full h-full"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseOut={handleMouseUp}
            />
          </div>
        </div>

        <div className="flex flex-col	w-4/12">
          <Typography className="mb-5">Players</Typography>
          <div className="flex items-center gap-2">
            {/* {onlineUsers.map((player) => (
              <div
                key={player}
                className="flex items-center bg-neutral-600 py-2 px-6 gap-1 rounded-3xl">
                <Typography className="truncate w-20">{player}</Typography>:
                <Typography fontWeight={500} className="text-blue-500">
                  0
                </Typography>
              </div>
            ))} */}
          </div>

          <div className="mt-4 flex-1 overflow-auto rounded-lg bg-neutral-900 relative p-2">
            <div className="absolute bottom-2 inset-x-2">
              <TextField
                placeholder="Write "
                name="chatMsg"
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
                multiline
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={onSendMsg}>
                        <Send />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
