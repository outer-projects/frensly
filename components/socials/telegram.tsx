import { useState } from "react";

const Telegram = () => {
  const [hover, setHover] = useState(false)
  return (
    <svg
      width="17"
      height="16"
      onMouseLeave={()=>setHover(false)}
      onMouseEnter={()=>setHover(true)}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.546537 7.80673L4.33247 9.17432L13.3207 3.32975C13.451 3.24499 13.5845 3.43321 13.4721 3.54323L6.66735 10.2052L6.4143 13.9348C6.39503 14.2186 6.71636 14.3765 6.90706 14.1771L9.00224 11.9857L12.8324 15.0697C13.2453 15.4021 13.8431 15.1678 13.9544 14.6299L16.6214 1.7501C16.7735 1.01534 16.0967 0.395331 15.436 0.664407L0.527274 6.73657C0.0595899 6.92707 0.0723283 7.63546 0.546537 7.80673Z"
        fill={hover ? "none" : "#BBBEC7"}
        stroke={hover ?  "#151614" : "none"}
      />
    </svg>
  );
};
export default Telegram;
