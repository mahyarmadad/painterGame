import Header from "@Components/Header";
import {RecoilRoot} from "recoil";
import "../styles/globals.css";
import createEmotionCache from "../functions/createEmotionCache";
import theme from "../styles/theme";
import {CacheProvider} from "@emotion/react";
import {CssBaseline, ThemeProvider} from "@mui/material";
import MiddleApp from "@Components/MiddleApp";
const clientSideEmotionCache = createEmotionCache();
export default function App(props) {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

  return (
    <RecoilRoot>
      <CacheProvider value={emotionCache}>
        <Header />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MiddleApp />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </RecoilRoot>
  );
}
