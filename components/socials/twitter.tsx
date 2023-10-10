import { useState } from "react";

const Twitter = ({ color }: { color?: string }) => {
  const [hover, setHover] = useState(false)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="20"
      viewBox="0 0 22 20"
      onMouseLeave={()=>setHover(false)}
      onMouseEnter={()=>setHover(true)}
      fill="none"
    >
      <path
        d="M1.78384 19.958H0L18.426 0.0209961H20.2938L1.78384 19.958Z"
        fill={"#D9D9D9"}
      />
      <path
        d="M15.1525 19.5803L0.835976 0.437948L6.12841 0.420423L20.4832 19.5803H15.1525Z"
        fill={"none"}
        stroke={"#D9D9D9"}
        strokeWidth={"1"}
      />
    </svg>
  );
};
export default Twitter;
