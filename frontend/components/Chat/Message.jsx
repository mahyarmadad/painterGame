import {Typography} from "@mui/material";
import styles from "./chat.module.scss";

export default function Message({content, username, date, isUser}) {
  return (
    <div className={`${styles.message} ${isUser ? styles.userMessage : styles.friendMessage}`}>
      <Typography variant="caption">{content}</Typography>

      <Typography variant="caption" color="textSecondary" className={`${styles.date}`}>
        {new Date(date).toLocaleTimeString()}
      </Typography>
    </div>
  );
}
