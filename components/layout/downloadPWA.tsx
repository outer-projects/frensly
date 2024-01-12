import classNames from "classnames";
import * as React from "react";
import { socials } from "../socials/socials";
import socialsCss from "../socials/socials.module.scss";
import style from "../authBanner/authBanner.module.scss"
function DownloadPWA() {
  return (
    <>
      <div className="div">
        <div className="span">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/660149e7163201c9964ba74bf8088d6ac27f31fe9ebb4cceb04594424afc0d47?"
            className="img"
          />
          <div className="div-2">Frensly</div>
        </div>
        <div className="span-2">
          <div className="div-3">Add to Home Screen</div>
          <div className="div-4">
            To install application add this website to your home screen
          </div>
          <span className="span-3">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b4e2c72f7a0f03f8bad0bc56582cb05d391a96b5b8909c014c6f1c5583f86b4?"
              className="img-2"
            />
            <div className="div-5">
              In your browser menu tap{" "}
              <span style={{ fontWeight: 700 }}>share icon</span>
            </div>
          </span>
          <span className="span-4">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/989fc65ead6c74b3ea5237ba601ab1b19d8a584320c15ac102af9f6515032092?"
              className="img-3"
            />
            <div className="div-5">
              Choose <span style={{ fontWeight: 700 }}>'Add to Home Screen'</span>{" "}
              in the options.
            </div>
          </span>
          <div className="div-7">Then open application on your home screen</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c67555d325c77d547f6102267d25962759bd3840b29a65a25048c692e606025?"
            className="img-4"
          />
          <div
              className={classNames(style.banner__join, style.banner__bottom)}
            >
              Follow us to keep up with the news
            </div>
            <div className={style.banner__whitelist}>
              <div className={socialsCss.airdrop__socials}>
                {socials.map((el, i) => {
                  return (
                    <a
                      href={el.link}
                      target="_blank"
                      className={socialsCss.airdrop__media}
                      key={i}
                    >
                      {el.logo}
                    </a>
                  );
                })}
              </div>{" "}
            </div>
        </div>
      </div>
      <style jsx>{`
        .div {
          background-color: #fff;
          display: flex;
          max-width: 480px;
          width: 100%;
          flex-direction: column;
          align-items: center;
          margin: 0 auto;
          padding: 23px 0;
          height: 100vh
        }
        .span {
          align-items: center;
          display: flex;
          gap: 8px;
          padding: 0 20px;
        }
        .img {
          aspect-ratio: 2.5;
          object-fit: contain;
          object-position: center;
          width: 40px;
          overflow: hidden;
          max-width: 100%;
          margin: auto 0;
        }
        .div-2 {
          color: #151614;
          text-align: center;
          letter-spacing: -0.4px;
          align-self: stretch;
          flex-grow: 1;
          white-space: nowrap;
          font: 700 20px/140% Syne, sans-serif;
        }
        .span-2 {
          align-self: stretch;
          display: flex;
          margin-top: 50px;
          width: 100%;
          flex-direction: column;
          padding: 0 13px 0 20px;
        }
        .div-3 {
          color: var(--Black, #151614);
          text-align: center;
          letter-spacing: -0.48px;
          white-space: nowrap;
          font: 700 24px/133% Syne, sans-serif;
        }
        .div-4 {
          color: var(--Black-65, #676766);
          text-align: center;
          letter-spacing: -0.16px;
          margin-top: 4px;
          font: 400 16px/24px DM Sans, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .span-3 {
          border-radius: 16px;
          background-color: var(--Black-3, #f8f8f8);
          display: flex;
          margin-top: 49px;
          justify-content: space-between;
          gap: 10px;
          padding: 13px 17px;
        }
        .img-2 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 31px;
          overflow: hidden;
          max-width: 100%;
        }
        .div-5 {
          color: var(--Black, #151614);
          letter-spacing: -0.16px;
          align-self: center;
          flex-grow: 1;
          white-space: nowrap;
          margin: auto 0;
          font: 400 16px/24px DM Sans, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .span-4 {
          justify-content: space-between;
          align-items: start;
          border-radius: 16px;
          background-color: var(--Black-3, #f8f8f8);
          display: flex;
          margin-top: 12px;
          gap: 5px;
          padding: 10px 14px;
        }
        .img-3 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 31px;
          overflow: hidden;
          max-width: 100%;
        }
        .div-6 {
          color: var(--Black, #151614);
          letter-spacing: -0.16px;
          margin-top: 4px;
          flex-grow: 1;
          flex-basis: auto;
          font: 400 16px/24px DM Sans, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-7 {
          color: var(--Black-65, #676766);
          text-align: center;
          letter-spacing: -0.16px;
          align-self: center;
          margin-top: 43px;
          width: 327px;
          font: 700 16px/24px DM Sans, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .img-4 {
          aspect-ratio: 1.37;
          object-fit: contain;
          object-position: center;
          width: 122px;
          overflow: hidden;
          align-self: center;
          margin-top: 152px;
          max-width: 100%;
        }
        .div-8 {
          color: var(--Black-65, #676766);
          letter-spacing: -0.16px;
          align-self: center;
          margin-top: 24px;
          white-space: nowrap;
          font: 400 16px/150% DM Sans, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-9 {
          align-self: center;
          display: flex;
          margin-top: 16px;
          width: 184px;
          max-width: 100%;
          gap: 8px;
        }
        .img-5 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 100%;
          overflow: hidden;
          flex: 1;
        }
        .img-6 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 100%;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          flex: 1;
        }
        .img-7 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 100%;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          flex: 1;
        }
        .img-8 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 100%;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          flex: 1;
        }
      `}</style>
    </>
  );
}

export default DownloadPWA;
