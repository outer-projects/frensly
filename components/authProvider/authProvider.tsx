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
      const res = await fetch(
        `https://frensly.adev.co/api/v1/eauth/${address}`,
        {
          credentials: "include",
        }
      );
      const text = await res.text();
      return text;
    },

    createMessage: ({ nonce, address, chainId }) => {
      return new SiweMessage({
        domain: window.location.host,
        address,
        statement: `For login to the site, I sign this random data: ${nonce}`,
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce,
      });
    },

    getMessageBody: ({ message }) => {
      return message.prepareMessage();
    },

    verify: async ({ message, signature }) => {
      console.log(message, signature);
      const verifyRes = await fetch(
        `https://frensly.adev.co/api/v1/eauth/${message.nonce}/${signature}`,
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
