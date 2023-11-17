import { useState } from "react";
import style from "../create.module.scss";

const Upload = ({image, setImage}:{image?:File|null,setImage?:any}) => {
  
  return (
    <>
      {image ? (
        <div className={style.upload}>
          <input
            type="file"
            className={style.upload__input__active}
            onChange={(e) => e.target.files && setImage && setImage(e?.target?.files[0])}
          />
          <img src="../icons/upload.svg" className={style.upload__icon} />
          <img className={style.upload__show} src={URL.createObjectURL(image)} />
        </div>
      ) : (
        <div className={style.upload}>
          <input
            type="file"
            className={style.upload__input}
            onChange={(e) => e.target.files && setImage && setImage(e?.target?.files[0])}
          />
          <button className={style.upload__button}>
            <img src="../icons/upload.svg" style={{ marginRight: "8px" }} />
            Upload image
          </button>
        </div>
      )}
    </>
  );
};
export default Upload;
