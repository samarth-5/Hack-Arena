import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <>
				<title>Hack Arena</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
				<meta
					name='description'
					content='Web application that contains leetcode problems and video solutions'
				/>
			</>
      <Component {...pageProps} />
    </>
  );
}
