import Navbar from "@components/Navbar";
import "@styles/globals.css";

export const metadata = {
  title: "",
  description: "",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="w-full h-full absolute inset-0 bg-black">
          <main className="app">
            <Navbar />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
