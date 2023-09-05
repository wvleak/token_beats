"use client";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import {
  walletConnect,
  metamaskWallet,
  coinbaseWallet,
} from "@thirdweb-dev/react";
import Navbar from "@components/Navbar/Navbar";
import { StateContextProvider } from "../context";
import "@styles/globals.css";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ThirdwebProvider
          supportedWallets={[
            metamaskWallet(),
            coinbaseWallet(),
            walletConnect(),
          ]}
          activeChain={Sepolia}
        >
          <StateContextProvider>
            <main className="app">
              <Navbar />
              {children}
            </main>
          </StateContextProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
};

export default RootLayout;
