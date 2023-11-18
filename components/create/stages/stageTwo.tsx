import { observer } from "mobx-react";
import style from "../create.module.scss";
import Web3Store from "../../../stores/Web3Store";
import { useInjection } from "inversify-react";
import { useState } from "react";
import finance from "../../finance/finance.module.scss";
import header from "../../layout/header.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";
import { CommunityStore } from "../../../stores/CommunityStore";
import { IStageOne } from "./stageOne";
const StageTwo = observer((stage: IStageOne) => {
  const { user, community, address, web3 } = useInjection(Web3Store);
  const { updateCommunity } = useInjection(CommunityStore);
  const [supply, setSupply] = useState(0);
  const [maxAllocation, setMaxAllocation] = useState(0);
  const [ratio, setRatio] = useState(0);
  const [isRestricted, setIsRestricted] = useState(true);
  const [timeStart, setTimeStart] = useState("");
  const [timeFinish, setTimeFinish] = useState("");
  const router = useRouter();
  console.log(timeFinish, timeStart);
  const createPresale = async () => {
    try {
      const res = await community.methods
        .initPondPresale(
          isRestricted,
          new Date(timeStart).getTime() / 1000,
          new Date(timeFinish).getTime() / 1000,
          supply * 10 ** 6,
          maxAllocation * 10 ** 6,
          ratio
        )
        .send({
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
            internalType: "string",
            name: "name",
            type: "string",
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
      // router.push("/presale/123");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className={style.stage__title}>Presale configurator for</div>
      <div className={style.stage__one}>
        <div className={style.stage__one__user}>
          <img className={style.stage__one__user__avatar} src={user?.avatar} />
          <div className={style.stage__one__user__name}>
            {user?.twitterName}
          </div>
        </div>
        <div className={style.stage__one__col}>
          <input
            placeholder="Presale supply (shares)"
            value={supply}
            type="number"
            style={{ marginTop: "24px" }}
            onChange={(e) => setSupply(Number(e.target.value))}
          />
          <input
            placeholder="Liquidity ratio"
            value={ratio}
            type="number"
            style={{ marginTop: "16px" }}
            onChange={(e) => setRatio(Number(e.target.value))}
          />
        </div>
        <div className={style.stage__one__col}>
          <input
            placeholder="Max allocation"
            value={maxAllocation}
            type="number"
            style={{ marginTop: "24px" }}
            onChange={(e) => setMaxAllocation(Number(e.target.value))}
          />
        </div>
        <div className={style.stage__one__row}>
          <div className={style.stage__one__social}>
            <div className={style.stage__date__title}>Start time </div>
            <input
              type="datetime-local"
              value={timeStart}
              style={{ paddingTop: "15px", paddingLeft: "16px" }}
              onChange={(e) => setTimeStart(e.target.value)}
            />
          </div>
          <div className={style.stage__one__social}>
            <div className={style.stage__date__title}>End time </div>
            <input
              type="datetime-local"
              value={timeFinish}
              style={{ paddingTop: "15px", paddingLeft: "16px" }}
              onChange={(e) => setTimeFinish(e.target.value)}
            />
          </div>
        </div>
        {/* <div className={classNames(style.stage__one__row, style.stage__values)}>
          <div
            className={finance.finance__stat}
            style={{ width: "49%", marginBottom: "0px" }}
          >
            <img src="../icons/Ethereum__grey.svg" />
            <div>
              <div className={finance.finance__stat__name}>Portfolio value</div>
              <div className={finance.finance__stat__value}>0 ETH</div>
            </div>
          </div>
          <div
            className={finance.finance__stat}
            style={{ width: "49%", marginBottom: "0px" }}
          >
            <img src="../icons/Ethereum__grey.svg" />
            <div>
              <div className={finance.finance__stat__name}>Portfolio value</div>
              <div className={finance.finance__stat__value}>0 ETH</div>
            </div>
          </div>
        </div> */}
        <div className={style.stage__one__buttons}>
          <button
            className={classNames(
              header.connect__button,
              style.stage__one__button
            )}
            onClick={() => createPresale()}
          >
            Create pre-sale
          </button>
        </div>
      </div>
    </>
  );
});
export default StageTwo;
