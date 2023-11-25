import { observer } from "mobx-react";
import style from "../create.module.scss";
import Web3Store from "../../../stores/Web3Store";
import { useInjection } from "inversify-react";
import { useEffect, useState } from "react";
import finance from "../../finance/finance.module.scss";
import header from "../../layout/header.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";
import { CommunityStore } from "../../../stores/CommunityStore";
import { IStageOne } from "./stageOne";
import { toast } from "react-toastify";
import useDarkMode from "use-dark-mode";
import { fromWeiToEth, toBNJS } from "../../../utils/utilities";
const StageTwo = observer((stage: IStageOne) => {
  const { user, community, address, web3 } = useInjection(Web3Store);
  const { updateCommunity } = useInjection(CommunityStore);
  const [supply, setSupply] = useState("");
  const [maxAllocation, setMaxAllocation] = useState("");
  const [ratio, setRatio] = useState("");
  const [price, setPrice] = useState(0);
  const darkMode = useDarkMode();
  const [timeStart, setTimeStart] = useState("");
  const [timeFinish, setTimeFinish] = useState("");
  const router = useRouter();
  console.log(timeFinish, timeStart);
  const getPrice = async () => {
    try {
      const res = await community.methods
        .calculatePresalePrice(Number(supply) * 10 ** 6)
        .call();
      console.log(res);
      setPrice(
        fromWeiToEth(
          toBNJS(res as string)
            .multipliedBy(10 ** 6)
            // .toFixed(2)
        )
      );
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (supply != "") {
      getPrice();
    }
  }, [supply]);
  console.log(price);
  const createPresale = async () => {
    if (stage.name == "" || stage.handle == "") {
      return toast.error("Fill name and handle fields");
    }
    if (stage.image == null) {
      return toast.error("Upload image");
    }
    if (stage.handle.includes(" ")) {
      return toast.error("Handle can't contain spaces");
    }
    if (maxAllocation >= supply) {
      return toast.error("Max allocation can't be higher than supply");
    }
    if (new Date(timeStart).getTime() > new Date(timeFinish).getTime()) {
      return toast.error("Start time can't be higher than end time");
    }
    if (new Date(timeStart).getTime() < new Date().getTime()) {
      return toast.error("Start time can't be lower than current time");
    }
    try {
      const res = await community.methods
        .initPondPresale(
          true,
          new Date(timeStart).getTime() / 1000,
          new Date(timeFinish).getTime() / 1000,
          Number(supply) * 10 ** 6,
          Number(maxAllocation) * 10 ** 6,
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
            router.push("/explore/launchpad");
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
      <div className={style.stage__title}>
        <img
          style={{
            filter: `invert(${darkMode.value ? "1" : "0"})`,
          }}
          onClick={() => {
            stage.setStep && stage.setStep(0);
          }}
          src="../icons/arrow_back.svg"
        />
        Presale configurator for
      </div>
      <div className={style.stage__one}>
        <div className={style.stage__one__user}>
          <img className={style.stage__one__user__avatar} src={user?.avatar} />
          <div className={style.stage__one__user__name}>
            {user?.twitterName}
          </div>
        </div>
        <div className={finance.finance__title__second}>Pre-sale settings </div>
        <div
          className={classNames(
            finance.finance__subtitle,
            finance.finance__fees
          )}
        >
          Choose max supply of shares you want to issue Liquidity ratio is fee
          you get after presale (for example 30%)
        </div>
        <div className={style.stage__one__col}>
          <input
            placeholder="Presale supply (shares)"
            value={supply}
            type="text"
            style={{ marginTop: "24px" }}
            // onChange={(e) => setSupply(Number(e.target.value))}
            onChange={(e) => {
              if (!isNaN(Number(e.target.value)) || e.target.value == ".") {
                setSupply(e.target.value);
              } else if (e.target.value == "") {
                setSupply("");
              }
            }}
          />
          <input
            placeholder="Liquidity ratio"
            value={ratio}
            type="text"
            style={{ marginTop: "16px" }}
            onChange={(e) => {
              if (!isNaN(Number(e.target.value)) || e.target.value == ".") {
                setRatio(e.target.value);
              } else if (e.target.value == "") {
                setRatio("");
              }
            }}
          />
        </div>
        <div className={style.stage__one__col}>
          <input
            placeholder="Max allocation"
            value={maxAllocation}
            type="text"
            onChange={(e) => {
              if (!isNaN(Number(e.target.value)) || e.target.value == ".") {
                setMaxAllocation(e.target.value);
              } else if (e.target.value == "") {
                setMaxAllocation("");
              }
            }}
            style={{ marginTop: "24px" }}
            // onChange={(e) => setMaxAllocation(Number(e.target.value))}
          />
        </div>
        <div className={finance.finance__title__second}>Time </div>
        <div
          className={classNames(
            finance.finance__subtitle,
            finance.finance__fees
          )}
        >
          Set the start and end time of your presale <br />
          <span>Max duration of pre-sale is 3 days</span>
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
        <div className={classNames(style.stage__one__row, style.stage__values)}>
          <div
            className={finance.finance__stat}
            style={{ width: "49%", marginBottom: "0px" }}
          >
            <img src="../icons/Ethereum__grey.svg" />
            <div>
              <div className={finance.finance__stat__name}>Hardcap</div>
              <div className={finance.finance__stat__value}>
                {price * Number(supply)}
              </div>
            </div>
          </div>
          <div
            className={finance.finance__stat}
            style={{ width: "49%", marginBottom: "0px" }}
          >
            <img src="../icons/Ethereum__grey.svg" />
            <div>
              <div className={finance.finance__stat__name}>Presale price</div>
              <div className={finance.finance__stat__value}>{price} ETH</div>
            </div>
          </div>
        </div>
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
