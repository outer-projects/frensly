import {
  RainbowKitAuthenticationProvider,
  createAuthenticationAdapter,
} from "@rainbow-me/rainbowkit";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { useState } from "react";
import { SiweMessage } from "siwe";
import Web3Store from "../../stores/Web3Store";

const AuthProvider = observer(({ children }: any) => {
  const { address, authStatus, web3 } = useInjection(Web3Store);
  const authenticationAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      return "";
    },

    createMessage: () => {
      return "";
    },

    getMessageBody: () => {
      return "";
    },

    verify: async () => {
      const res = await fetch(
        `https://frensly.adev.co/api/v1/eauth/${address}`,
        {
          credentials: "include",
        }
      );
      const text = await res.text();

      const sign = await web3?.eth.personal.sign(
        web3?.utils.utf8ToHex(
          `For login to the site, I sign this random data: ${text}`
        ) as string,
        address as string,
        text
      );
      const verifyRes = await fetch(
        `https://frensly.adev.co/api/v1/eauth/${text}/${sign}`,
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      console.log(verifyRes);
      return Boolean(verifyRes.ok);
    },
    signOut: async () => {},
  });
  return (
    <RainbowKitAuthenticationProvider
      adapter={authenticationAdapter}
      status={authStatus}
    >
      {children}
    </RainbowKitAuthenticationProvider>
  );
});
export default AuthProvider;
