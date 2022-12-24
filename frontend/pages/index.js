import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {userRecoil} from "../recoil/user";
import {useRouter} from "next/router";
import {Button, TextField, Typography} from "@mui/material";
import {useCallback} from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useRecoilState(userRecoil);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/app");
  }, [user, router]);

  const onEnterClick = useCallback(() => {
    setUser(username);
  }, [setUser, username]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-4 py-8 rounded-lg	bg-neutral-800">
        <Typography variant="h5" className="mb-4 text-center">
          Log In
        </Typography>
        <TextField
          name="username"
          fullWidth
          onChange={(e) => setUsername(e.target.value.trim())}
          value={username}
        />
        <Button
          variant="contained"
          fullWidth
          color="primary"
          className="mt-4"
          size="large"
          onClick={onEnterClick}>
          Enter
        </Button>
      </div>
    </div>
  );
}
