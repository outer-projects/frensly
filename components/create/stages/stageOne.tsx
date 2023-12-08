import { observer } from "mobx-react";
import style from "../create.module.scss";
import Web3Store from "../../../stores/Web3Store";
import { useInjection } from "inversify-react";
import Upload from "../components/upload";
import TextareaAutosize from "react-textarea-autosize";
import { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import header from "../../layout/header.module.scss";
import { useRouter } from "next/router";
import axios from "axios";
import { prefix } from "../../../utils/config";
import { CommunityStore } from "../../../stores/CommunityStore";
import { toast } from "react-toastify";
import StageHeader from "./stageHeader";
import { SocketContext, socket } from "../../../utils/socket";

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
  cover?: File | null;
  setImage?: (img: File | null) => void;
  setCover?: (img: File | null) => void;
  backendPondId?: number | null;
}
const StageOne = observer((stage: IStageOne) => {
  const { address } = useInjection(Web3Store);
  const { updateCommunity } = useInjection(CommunityStore);
  const router = useRouter();
  const { id } = router.query;

  const [isAvailable, setIsAvailable] = useState(false); // [true, false, false
  const [block, setBlock] = useState(false);
  const socket = useContext(SocketContext);
  const checkHandle = async () => {
    try {
      const res = await axios.get(prefix + `pond/check/` + stage.handle);
      console.log(res);
      setIsAvailable(res.data.available);
    } catch (e) {
      console.log(e);
    }
  };
  const [tt, updateTimeout] = useState<any>(undefined);
  const searchDeb = (fn: any, ms: number) => {
    const clear = () => {
      clearTimeout(tt);
      updateTimeout(setTimeout(fn, ms));
    };
    return clear();
  };
  useEffect(() => {
    if (stage.handle.length !== 0) {
      searchDeb(checkHandle, 700);
    }
  }, [stage.handle]);
  // useEffect(() => {
  //   if (stage.backendPondId) {
  //     createPond();
  //   }
  // }, [stage.backendPondId]);
  const createPond = async () => {
    if(!address) {
      return toast.error("Connect wallet")
    }
    if (stage.name == "" || stage.handle == "") {
      return toast.error("Fill name and handle fields");
    }
    if (stage.image == null) {
      return toast.error("Upload image");
    }
    if (stage.image.size >= 50000000) {
      return toast.error("Image size must be less than 50mb");
    }
    if (stage?.cover && stage?.cover.size >= 50000000) {
      return toast.error("Banner size must be less than 50mb");
    }
    if (!isAvailable) {
      return toast.error("Handle is taken by another user");
    }
    if (stage.handle.includes(" ")) {
      return toast.error("Handle can't contain spaces");
    }
    if (id) {
      updateCommunity({
        pondId: Number(id),
        twitter: stage.twitter,
        description: stage.description,
        url: stage.webSite,
        name: stage.name,
        handle: stage.handle as string,
        telegram: stage.tg,
        file: stage.image,
        cover: stage.cover,
        discord: stage.discord,
      }).then((res) => {
        if (res) {
          setBlock(false);
          router.push("/explore/community");
        } else {
          setBlock(false);
          toast.error("Error");
        }
      });
    }
  };
  
  return (
    <div className={style.stage__one}>
      <StageHeader stage={stage} />
      <div className={style.stage__row}>
        <Upload
          image={stage.image}
          setImage={stage.setImage}
          text={"Upload avatar"}
        />
        <Upload
          image={stage.cover}
          setImage={stage.setCover}
          text={"Upload cover"}
        />
      </div>
      <div className={style.stage__one__col}>
        <input
          placeholder="Display name"
          value={stage.name}
          style={{ marginBottom: "16px" }}
          onChange={(e) => stage.setName && stage.setName(e.target.value)}
        />
        <input
          placeholder="Uniq name"
          value={stage.handle}
          maxLength={15}
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
            style.stage__one__button,
            block && style.stage__one__button__disabled
          )}
          disabled={block}
          onClick={createPond}
        >
          Create
        </button>
        <button
          className={classNames(
            header.connect__button,
            style.stage__one__button,
            block && style.stage__one__button__disabled
          )}
          // onClick={() => stage.setStep && stage.setStep(1)}
          disabled={block}
        >
          Create pre-sale
        </button>
      </div>
    </div>
  );
});
export default StageOne;
