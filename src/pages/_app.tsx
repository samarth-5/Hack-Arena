import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <>
		  <title>Hacker's Arena</title>
		  <meta name='viewport' content='width=device-width, initial-scale=1' />
		  <link rel='icon' href='/favicon.ico' />
		  <meta name='description'
			  	  content='Web application that contains leetcode problems and video solutions'	/>
	    </>
      <ToastContainer />
      <Component {...pageProps} />
    </RecoilRoot> 
  );
}
