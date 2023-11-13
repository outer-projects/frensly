import { observer } from "mobx-react";
import style from "../create.module.scss";
import Web3Store from "../../../stores/Web3Store";
import { useInjection } from "inversify-react";
import Upload from "../components/upload";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import classNames from "classnames";
import header from "../../layout/header.module.scss";
const StageOne = observer(({ setStep }: { setStep: (s: number) => void }) => {
  const { user } = useInjection(Web3Store);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [twitter, setTwitter] = useState("");
  const [webSite, setWebSite] = useState("");
  const [tg, setTg] = useState("");
  const [discord, setDiscord] = useState("");
  const [fee, setFee] = useState(0);
  const [pricingModel, setPricingModel] = useState(0);
  return (
    <div className={style.stage__one}>
      <div className={style.stage__one__user}>
        <img className={style.stage__one__user__avatar} src={user?.avatar} />
        <div className={style.stage__one__user__name}>{user?.twitterName}</div>
      </div>
      <Upload />
      <div className={style.stage__one__col}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextareaAutosize
          className={style.stage__one__description}
          placeholder="Description"
          minRows={1}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></TextareaAutosize>
      </div>
      <div className={style.stage__one__row}>
        <div className={style.stage__one__social}>
          <img src="../../icons/X.svg" />
          <input
            placeholder="Twitter"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </div>
        <div className={style.stage__one__social}>
          <img src="../../icons/web.svg" />
          <input
            placeholder="Web site"
            value={webSite}
            onChange={(e) => setWebSite(e.target.value)}
          />
        </div>
      </div>
      <div className={style.stage__one__row}>
        <div className={style.stage__one__social}>
          <img src="../../icons/telegram.svg" />
          <input
            placeholder="Tg"
            value={tg}
            onChange={(e) => setTg(e.target.value)}
          />
        </div>
        <div className={style.stage__one__social}>
          <img src="../../icons/discord.svg" />
          <input
            placeholder="Discord"
            value={discord}
            onChange={(e) => setDiscord(e.target.value)}
          />
        </div>
      </div>
      <div className={style.stage__one__fee}>
        Fee
        <div className={style.stage__one__fee__row}>
          <div className={style.stage__one__fee__check}>
            <input
              type="radio"
              checked={fee == 0}
              onChange={(e) => {
                if (e.target.checked) {
                  setFee(0);
                }
              }}
            />
            5%
          </div>
          <div className={style.stage__one__fee__check}>
            <input
              type="radio"
              checked={fee == 1}
              onChange={(e) => {
                if (e.target.checked) {
                  setFee(1);
                }
              }}
            />
            10%
          </div>
        </div>
      </div>
      <div className={style.stage__one__fee}>
        Pricing model
        <div className={style.stage__one__fee__row}>
          <div className={style.stage__one__fee__check}>
            <input
              type="radio"
              checked={pricingModel == 0}
              onChange={(e) => {
                if (e.target.checked) {
                  setPricingModel(0);
                }
              }}
            />
            Exponential
          </div>
          <div className={style.stage__one__fee__check}>
            <input
              type="radio"
              checked={pricingModel == 1}
              onChange={(e) => {
                if (e.target.checked) {
                  setPricingModel(1);
                }
              }}
            />
            Linear
          </div>
        </div>
      </div>
      <div className={style.stage__one__buttons}>
        <button
          className={classNames(
            header.connect__button,
            style.stage__one__button
          )}
          onClick={() => setStep(1)}
        >
          Create
        </button>
        <button
          className={classNames(
            header.connect__button,
            style.stage__one__button
          )}
          onClick={() => setStep(1)}
        >
          Conduct a pre-sale
        </button>
      </div>
    </div>
  );
});
export default StageOne;
