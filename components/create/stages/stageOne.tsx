import { observer } from "mobx-react";
import style from "../create.module.scss";
import Web3Store from "../../../stores/Web3Store";
import { useInjection } from "inversify-react";
import Upload from "../components/upload";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import classNames from "classnames";
import header from "../../layout/header.module.scss";
import { useRouter } from "next/router";
import axios from "axios";
import { prefix } from "../../../utils/config";
import { CommunityStore } from "../../../stores/CommunityStore";
export interface IStageOne {
  setStep?: (step: number) => void;
  name: string;
  setName?: (name: string) => void;
  handle: string;
  setHandle?: (name: string) => void;
  description: string;
  setDescription?: (description: string) => void;
  twitter: string;
  setTwitter?: (twitter: string) => void;
  webSite: string;
  setWebSite?: (webSite: string) => void;
  tg: string;
  setTg?: (tg: string) => void;
  discord: string;
  setDiscord?: (discord: string) => void;
  image?: File | null;
  setImage?: (img: File | null) => void;

}
const StageOne = observer((stage: IStageOne) => {
  const { user, community, address, web3 } = useInjection(Web3Store);
  const { updateCommunity } = useInjection(CommunityStore);
  const router = useRouter();

  const create = async () => {
    try {
      const res = await community.methods.initPond().send({
        from: address,
      });
      console.log(res);
      let transaction = web3?.eth.abi.decodeLog(
        [
          {
            indexed: true,
            internalType: "uint256",
            name: "pondId",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "isPresale",
            type: "bool",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "isRestricted",
            type: "bool",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "presaleStart",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "presaleEnd",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "presaleGoal",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "maxAllocation",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "presalePrice",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "liquidityFee",
            type: "uint256",
          },
        ],
        res.logs[0].data,
        [res.logs[0].topics[0], res.logs[0].topics[1], res.logs[0].topics[2]]
      );
      console.log(transaction);
      setTimeout(() => {
        updateCommunity({
          pondId: Number(transaction?.pondId),
          twitter: stage.twitter,
          description: stage.description,
          url: stage.webSite,
          name: stage.name,
          handle: stage.handle as string,
          telegram: stage.tg,
          file: stage.image,
          discord: stage.discord,
        }).then((res) => {
          if (res) {
            router.push("/community");
          }
        });
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={style.stage__one}>
      <div className={style.stage__one__user}>
        <img className={style.stage__one__user__avatar} src={user?.avatar} />
        <div className={style.stage__one__user__name}>{user?.twitterName}</div>
      </div>
      <Upload image={stage.image} setImage={stage.setImage}/>
      <div className={style.stage__one__col}>
        <input
          placeholder="Display name"
          value={stage.name}
          onChange={(e) => stage.setName && stage.setName(e.target.value)}
        />
         <input
          placeholder="Uniq name"
          value={stage.handle}
          onChange={(e) => stage.setHandle && stage.setHandle(e.target.value)}
        />
        <TextareaAutosize
          className={style.stage__one__description}
          placeholder="Description"
          minRows={1}
          value={stage.description}
          onChange={(e) =>
            stage.setDescription && stage.setDescription(e.target.value)
          }
        ></TextareaAutosize>
      </div>
      <div className={style.stage__one__row}>
        <div className={style.stage__one__social}>
          <img src="../../icons/X.svg" />
          <input
            placeholder="Twitter"
            value={stage.twitter}
            onChange={(e) =>
              stage.setTwitter && stage.setTwitter(e.target.value)
            }
          />
        </div>
        <div className={style.stage__one__social}>
          <img src="../../icons/web.svg" />
          <input
            placeholder="Web site"
            value={stage.webSite}
            onChange={(e) =>
              stage.setWebSite && stage.setWebSite(e.target.value)
            }
          />
        </div>
      </div>
      <div className={style.stage__one__row}>
        <div className={style.stage__one__social}>
          <img src="../../icons/telegram.svg" />
          <input
            placeholder="Tg"
            value={stage.tg}
            onChange={(e) => stage.setTg && stage.setTg(e.target.value)}
          />
        </div>
        <div className={style.stage__one__social}>
          <img src="../../icons/discord.svg" />
          <input
            placeholder="Discord"
            value={stage.discord}
            onChange={(e) =>
              stage.setDiscord && stage.setDiscord(e.target.value)
            }
          />
        </div>
      </div>
      {/* <div className={style.stage__one__fee}>
        Fee
        <div className={style.stage__one__fee__row}>
          <div className={style.stage__one__fee__check}>
            <input
              type="radio"
              checked={stage?.fee == 0}
              onChange={(e) => {
                if (e.target.checked) {
                  stage.setFee && stage.setFee(0);
                }
              }}
            />
            5%
          </div>
          <div className={style.stage__one__fee__check}>
            <input
              type="radio"
              checked={stage.fee == 1}
              onChange={(e) => {
                if (e.target.checked) {
                  stage.setFee(1);
                }
              }}
            />
            10%
          </div>
        </div>
      </div> */}
      {/* <div className={style.stage__one__fee}>
        Pricing model
        <div className={style.stage__one__fee__row}>
          <div className={style.stage__one__fee__check}>
            <input
              type="radio"
              checked={stage.pricingModel == 0}
              onChange={(e) => {
                if (e.target.checked) {
                  stage.setPricingModel(0);
                }
              }}
            />
            Exponential
          </div>
          <div className={style.stage__one__fee__check}>
            <input
              type="radio"
              checked={stage.pricingModel == 1}
              onChange={(e) => {
                if (e.target.checked) {
                  stage.setPricingModel(1);
                }
              }}
            />
            Linear
          </div>
        </div>
      </div> */}
      <div className={style.stage__one__buttons}>
        <button
          className={classNames(
            header.connect__button,
            style.stage__one__button
          )}
          onClick={create}
        >
          Create
        </button>
        <button
          className={classNames(
            header.connect__button,
            style.stage__one__button
          )}
          onClick={() => stage.setStep && stage.setStep(1)}
        >
          Create pre-sale
        </button>
      </div>
    </div>
  );
});
export default StageOne;
