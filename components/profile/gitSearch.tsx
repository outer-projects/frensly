import classNames from "classnames";
import explore from "../explore/explore.module.scss";
import style from "./profile.module.scss";
import { useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";
import { ChatStore } from "../../stores/ChatStore";
import { observer } from "mobx-react";
const GifSearch = observer(
  ({ reverse, setGif }: { reverse: boolean; setGif: (s: string) => void }) => {
    const [outline, setOutline] = useState(false);
    const [search, setSearch] = useState("");
    const [tt, updateTimeout] = useState<any>(undefined);
    const { getGifs, availabeGifs, updateGifs } = useInjection(ChatStore);
    const listInnerRef = useRef() as any;

    const onScroll = () => {
      if (listInnerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight;

        if (isNearBottom) {
          console.log("Reached bottom");
          updateGifs(search);
        }
      }
    };
    const saveInput = () => {
      getGifs(search);
    };
    const searchDeb = (fn: any, ms: number) => {
      const clear = () => {
        clearTimeout(tt);
        updateTimeout(setTimeout(fn, ms));
      };
      return clear();
    };
    useEffect(() => {
      if (search.length !== 0) {
        searchDeb(saveInput, 1000);
      }
    }, [search]);
    return (
      <div className={classNames(style.gif__menu, reverse && style.gif__menu__reverse)}>
        <div
          className={classNames(
            explore.explore__search,
            outline && explore.explore__search__active
          )}
        >
          <img src="../icons/Search.svg" />
          <input
            placeholder="Search gifs on tenor"
            onBlur={() => {
              setOutline(false);
            }}
            onFocus={() => {
              setOutline(true);
            }}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className={style.gif__list} ref={listInnerRef} onScroll={onScroll}>
          {availabeGifs?.map((el, i) => {
            return (
              <div
                key={i + el.id}
                className={style.gif__one}
                onClick={() => {
                  setGif(el.media_formats.mediumgif.url);
                }}
              >
                <img src={el.media_formats.nanogif.url} />
              </div>
            );
          })}
          {availabeGifs.length == 0 && (
            <div className={style.gif__empty}>Gif list is empty</div>
          )}
        </div>
      </div>
    );
  }
);
export default GifSearch;
