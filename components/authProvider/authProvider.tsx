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
  const getnonce = async () => {
    const res = await fetch(`https://frensly.adev.co/api/v1/eauth/${address}`, {
      credentials: "include",
    });
    const text = await res.text();
    return text;
  };
  const { address, authStatus, web3 } = useInjection(Web3Store);
  const authenticationAdapter = createAuthenticationAdapter({
    getNonce: getnonce,

    createMessage: ({nonce}) => {
      return `For login to the site, I sign this random data: ${nonce}`
    },

    getMessageBody: ({ message }) => {
      return message.toString();
    },

    verify: async ({ message, signature }) => {
      console.log(message, signature);
      const n = await getnonce()
      const verifyRes = await fetch(
        `https://frensly.adev.co/api/v1/eauth/${n}/${signature}`,
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
