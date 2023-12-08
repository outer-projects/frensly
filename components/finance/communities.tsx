import classNames from "classnames";
import style from "./finance.module.scss";
import { useRouter } from "next/router";
import Sidebar from "./sidebar";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import Web3Store from "../../stores/Web3Store";
import { useEffect, useMemo, useState } from "react";
import { UserStore } from "../../stores/UserStore";
import header from "../layout/header.module.scss";
import TypesList from "../common/typesList";
import { types } from "./invite";
import User from "./user";
import CommunityRow from "./communityRowFinance";

const Communities = observer(() => {
  const [active, setActive] = useState(4);
  const [activeComm, setActiveComm] = useState(0);
  const commtypes = ["Created", "Holding"];
  const [communitiesReady, setCommunitiesReady] = useState(false);
  const [contractPondId,setContractPondId] = useState<number|null>(null);
  const { user, community, web3, address, getBalance } = useInjection(Web3Store);
  const { getMyCommunities, myCommunities, getMyHoldings, myHoldings } =
    useInjection(UserStore);
  const router = useRouter();
  const current = useMemo(() => {
    if (activeComm == 0) {
      return myCommunities;
    } else {
      return myHoldings;
    }
  }, [activeComm, myCommunities, myHoldings]);
  useEffect(() => {
    if(contractPondId){
      router.push("/communities/update/"+contractPondId);
    }
  },[contractPondId])

  useEffect(() => {
    if (active == 0) {
      router.push("/dashboard/finance");
    }
    if (active == 1) {
      router.push("/dashboard/invite");
    }
    if (active == 2) {
      router.push("/dashboard/airdrop");
    }
    if (active == 3) {
      router.push("/dashboard/rankings");
    }
  }, [active]);
  console.log(current);
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
      setContractPondId(Number(transaction?.pondId));
    } catch (e) {

      console.log(e);
    }
  };
  const createPresale = () => {
    router.push("/communities/create-presale");
  };
  useEffect(() => {
    if (user && !communitiesReady) {
      setCommunitiesReady(true);
      getMyCommunities(user.account._id);
      getMyHoldings(user.account._id);
    }
  }, [user]);
  return (
    <div className={style.finance__page}>
      <Sidebar />
      <div className={style.communities__container}>
        <div className={style.finance__container}>
          <div className={style.finance__links}>
            <TypesList active={active} setActive={setActive} types={types} />
          </div>
          <div className={style.finance}>
            <User stage="airdrop" />

            <>
              <div className={style.finance__invite}>Your community</div>
              <div
                className={style.finance__invite__text}
                style={{ marginBottom: "0px" }}
              >
                List of communities you created
              </div>
            </>
          </div>
          <div className={style.finance__types}>
            <TypesList
              active={activeComm}
              setActive={setActiveComm}
              types={commtypes}
            />
          </div>
          <div className={style.finance__communities}>
            {current?.map((el, i) => {
              return (
                <CommunityRow
                  key={el?.pond?._id ? el?.pond?._id : el?._id}
                  el={el.pond ? el.pond : el}
                  amount={el.amount ? el.amount : el.supply}
                />
              );
            })}
            {/* <CommunityRow el /> */}
          </div>
          <div className={style.finance}>
            <>
              <div className={style.finance__invite}>Create new community</div>
              <div
                className={style.finance__invite__text}
                style={{ marginBottom: "0px" }}
              >
                You can choose between standard community or pre-sale with
                launch date and whitelist
              </div>
            </>
            <div
              className={classNames(style.invite__code)}
              style={{ marginTop: "24px" }}
            >
              <div>
                <div>Community pond</div>
              </div>
              <div>
                <div className={style.finance__comm__button} onClick={create}>
                  Create community
                </div>
              </div>
            </div>
            <div className={classNames(style.invite__code)}>
              <div>
                <div>Pre-sale community</div>
              </div>

              <div className={style.finance__comm__button} onClick={createPresale}>Create pre-sale</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Communities;
