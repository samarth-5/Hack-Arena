import Image from "next/image";
import localFont from "next/font/local";
import Navbar from "@/Components/Navbar";
import AuthModal from "@/Components/Modals/AuthModal";
import { useRecoilValue } from "recoil";
import { authModalState } from "@/Atoms/authModalAtom";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {

  const authModal = useRecoilValue(authModalState);
  
  return (
      <main>
        <Navbar />
        Home Page
        {authModal.isOpen && <AuthModal />}
      </main>
  );
}
