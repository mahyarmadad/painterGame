import {useSocket} from "@Hooks/socketServer";
import {Fragment} from "react";

export default function MiddleApp({children, ...props}) {
  useSocket();

  return <Fragment {...props}>{children}</Fragment>;
}
