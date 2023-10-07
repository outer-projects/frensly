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
      const response = await fetch(
        `https://frensly.adev.co/api/v1/eauth/${address}`,
        {
          credentials: "include",
        }
      );
      return await response.text();
    },

    createMessage: ({ nonce, address, chainId }) => {
      const hexMsg = web3?.utils.utf8ToHex(
        `For login to the site, I sign this random data: ${nonce}`
      ) as string;
      const f = async () => {
        return web3?.eth?.personal.sign(hexMsg, address, nonce);
      };
      return f;
    },

    getMessageBody: ({ message }) => {
      return message.toString();
    },
    //@ts-ignore
    verify: async ({ message, signature }) => {
      message().then(async (res) => {
        const verifyRes = await fetch(
          `https://frensly.adev.co/api/v1/eauth/${res}/${signature}`,
          {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        console.log(verifyRes);
        return Boolean(verifyRes.ok);
      });
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
