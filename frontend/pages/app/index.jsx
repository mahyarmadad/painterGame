import {Send} from "@mui/icons-material";
import {IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {useRouter} from "next/router";
import {useCallback, useEffect, useRef, useState} from "react";
import {useRecoilValue} from "recoil";
import {userRecoil} from "../../recoil/user";

export default function AppPage() {
  const [players, setPlayers] = useState([]);
  const [chatMsg, setChatMsg] = useState("");
  const user = useRecoilValue(userRecoil);
  const router = useRouter();

  const canvasRef = useRef();

  useEffect(() => {
    if (!user) return router.push("/");
    setPlayers((prev) => {
      let cache = [...prev];
      let exist = cache.find((v) => v === user);
      if (!exist) cache.push(user);
      return cache;
    });
  }, [router, user]);

  const onSendMsg = useCallback(() => {
    setChatMsg("");
  }, []);

  return (
    <div className="h-screen flex justify-center">
      <div className="w-full max-w-5xl py-10 flex gap-32	">
        <div className="w-full flex flex-col">
          <Typography className="mb-2">Need Another user</Typography>
          <div className="flex-grow">
            <canvas ref={canvasRef} className="bg-neutral-800 rounded-lg w-full h-full" />
          </div>
        </div>

        <div className="flex flex-col	w-4/12">
          <Typography className="mb-5">Players</Typography>
          <div className="flex align-center gap-2">
            {players.map((player) => (
              <div
                key={player}
                className="flex align-center bg-neutral-600 py-2 px-6 gap-1 rounded-3xl">
                <Typography className="truncate w-20">{player}</Typography>:
                <Typography fontWeight={500} className="text-blue-500">
                  0
                </Typography>
              </div>
            ))}
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
