import { useState } from "react";
import style from "../create.module.scss";

const Upload = ({
  image,
  setImage,
  text,
}: {
  text: string;
  image?: File | null;
  setImage?: any;
}) => {
  return (
    <>
      {
        <div className={style.upload}>
          <input
            type="file"
            className={style.upload__input}
            onChange={(e) =>
              e.target.files && setImage && setImage(e?.target?.files[0])
            }
          />
          <button className={style.upload__button}>
            <img src="../../icons/upload.svg" style={{ marginRight: "8px" }} />
            {text}{" "}
          </button>
        </div>
      }
    </>
  );
};
export default Upload;
