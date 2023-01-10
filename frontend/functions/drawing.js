export const startDraw = ({x, y}) => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  let context = canvas.getContext("2d");
  context.beginPath();
  let cor = getMousePos(canvas, x, y);
  context.moveTo(cor.x, cor.y);
};

export const draw = ({x, y, lineColor = "black"}) => {
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
};

export const stopDraw = () => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  let context = canvas.getContext("2d");
  context.stroke();
  context.closePath();
};
