import {sendMessage} from "@Hooks/socketServer";
import {Send} from "@mui/icons-material";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {chatHistoryRecoil} from "@Recoil/chat";
import {userRecoil} from "@Recoil/user";
import {useCallback, useState} from "react";
import {useRecoilValue} from "recoil";
import Message from "./Message";

export default function ChatContainer() {
  const [chatMsg, setChatMsg] = useState("");

  const user = useRecoilValue(userRecoil);
  const chatHistory = useRecoilValue(chatHistoryRecoil);

  const onSendMsg = useCallback(() => {
    sendMessage({
      user,
      text: chatMsg,
    });
    setChatMsg("");
  }, [chatMsg, user]);

  return (
    <div className="mt-4 flex-1 overflow-auto rounded-lg bg-neutral-900 relative p-2">
      {chatHistory?.map((chat) => (
        <Message
          key={chat.id}
          content={chat.content}
          date={chat.date}
          username={chat.username}
          isUser={chat.username === user}
        />
      ))}

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
  );
}
