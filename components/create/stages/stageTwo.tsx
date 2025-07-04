import { observer } from "mobx-react";
import style from "../create.module.scss";
import Web3Store from "../../../stores/Web3Store";
import { useInjection } from "inversify-react";
import { useContext, useEffect, useState } from "react";
import finance from "../../finance/finance.module.scss";
import header from "../../layout/header.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";
import { toast } from "react-toastify";;
import { fromWeiToEth, toBNJS } from "../../../utils/utilities";
import { SocketContext } from "../../../utils/socket";

const StageTwo = observer(() => {
  const { user, community, address, web3, communityNotConnected } = useInjection(Web3Store);
  const [supply, setSupply] = useState("");
  const [block, setBlock] = useState(false);
  const [maxAllocation, setMaxAllocation] = useState("");
  const [ratio, setRatio] = useState("");
  const [price, setPrice] = useState(0);
  const [contractPondId, setContractPondId] = useState<number | null>(null);
  const [timeStart, setTimeStart] = useState("");
  const [timeFinish, setTimeFinish] = useState("");
  const router = useRouter();
  const socket = useContext(SocketContext);
  useEffect(() => {
    if (contractPondId) {
      router.push("/communities/update/" + contractPondId);
    }
  }, [contractPondId]);
  console.log(contractPondId);

  const getPrice = async () => {
    try {
      const res = await communityNotConnected.methods
        .calculatePresalePrice(Number(supply) * 10 ** 6)
        .call();
      console.log(res);
      setPrice(
        fromWeiToEth(
          toBNJS(res as string).multipliedBy(10 ** 6)
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
    if(!address) {
      return toast.error("Connect wallet")
    }
    if (Number(maxAllocation) >= Number(supply)) {
      return toast.error("Max allocation can't be higher than supply");
    }
    if (new Date(timeStart).getTime() > new Date(timeFinish).getTime()) {
      return toast.error("Start time can't be higher than end time");
    }
    if (new Date(timeStart).getTime() < new Date().getTime()) {
      return toast.error("Start time can't be lower than current time");
    }
    try {
      socket.emit("pondMonitor");
      setBlock(true);
      let tt = setTimeout(() => {
        setBlock(false);
        toast.error(
          "Transaction takes too long, please change rpc provider and try again"
        );
      }, 15000);
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
      // console.log(transaction)
      localStorage.setItem("type", "presale");
      setContractPondId(Number(transaction?.pondId));
      clearTimeout(tt);
      
    } catch (e) {
      setBlock(false);
      console.log(e);
    }
  };
  return (
    <>
      <div className={style.stage__one}>
        {/* <StageHeader stage={stage} /> */}
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
                {Number(
                  (
                    price * Number(supply) +
                    ((price * Number(supply)) / 100) * Number(ratio)
                  ).toFixed(8)
                )}{" "}
                ETH
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
              <div className={finance.finance__stat__value}>
                {Number((price + (price / 100) * Number(ratio)).toFixed(8))} ETH
              </div>
            </div>
          </div>
        </div>
        <div className={style.stage__one__buttons}>
          <button
            className={classNames(
              header.connect__button,
              style.stage__one__button,
              block && style.stage__one__button__disabled
            )}
            onClick={createPresale}
            disabled={block}
          >
            Create pre-sale
          </button>
        </div>
      </div>
    </>
  );
});
export default StageTwo;
