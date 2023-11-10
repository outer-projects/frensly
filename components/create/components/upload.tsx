import { useState } from "react";
import style from "../create.module.scss";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <>
      {file ? (
        <div className={style.upload}>
          <input
            type="file"
            className={style.upload__input__active}
            onChange={(e) => e.target.files && setFile(e?.target?.files[0])}
          />
          <img src="../icons/upload.svg" className={style.upload__icon} />
          <img className={style.upload__show} src={URL.createObjectURL(file)} />
        </div>
      ) : (
        <div className={style.upload}>
          <input
            type="file"
            className={style.upload__input}
            onChange={(e) => e.target.files && setFile(e?.target?.files[0])}
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
