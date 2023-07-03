"use client";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import {
  walletConnect,
  metamaskWallet,
  coinbaseWallet,
} from "@thirdweb-dev/react";
import Navbar from "@components/Navbar";
import { StateContextProvider } from "../context";
import "@styles/globals.css";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {/* <div className="main">
          <div className="gradient" />
        </div> */}
        <ThirdwebProvider
          supportedWallets={[
            metamaskWallet(),
            coinbaseWallet(),
            walletConnect(),
          ]}
          activeChain={Sepolia}
        >
          <StateContextProvider>
            {/* <div className="w-full h-full absolute inset-0 bg-black"> */}
            <main className="app">
              <Navbar />
              {children}
            </main>
            {/* </div> */}
          </StateContextProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
};

export default RootLayout;
