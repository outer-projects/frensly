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

    createMessage: async ({ nonce, address, chainId }) => {
      const hexMsg = web3?.utils.utf8ToHex(
        `For login to the site, I sign this random data: ${nonce}`
      ) as string;

      return { hexMsg: hexMsg, address: address, nonce: nonce };
    },

    getMessageBody: ({ message }) => {
      return message?.toString();
    },
    //@ts-ignore
    verify: async ({ message, signature }) => {
      message
        .then((result: any) => {
          return web3?.eth.personal
            ?.sign(result.hexMsg, result.address, result.nonce)
            .then(async (res) => {
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
        })
        .catch((err) => {});
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
