import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import StoreProvider from "@/store/StoreProvider";
import Script from "next/script";
import Keedbackuser from "@/components/Feedback";
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata = {
  title: "FresheResume",
  description:
    "Fresheresume offers a user-friendly platform tailored for fresh graduates and entry-level professionals to create standout resumes. Our expert guidance helps users structure their resumes effectively, emphasizing key skills and achievements. With a focus on ATS-friendly formatting, Fresheresume maximizes visibility to potential employers. Whether you're new to the workforce or seeking career advancement, our platform equips you with the tools to craft a professional resume. Join Fresheresume today and take the first step towards landing your dream job!",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5829928756137003"
            crossorigin="anonymous"
          ></script>
        </head>
        <GoogleAnalytics />

        <body className={(inter.className, poppins.variable)}>
          <StoreProvider>
            <Navbar></Navbar>
            {children}
            <Keedbackuser></Keedbackuser>
            <Footer></Footer>
          </StoreProvider>
        </body>
      </html>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
}
