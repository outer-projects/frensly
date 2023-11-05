const PointsIcon = ({ color }: { color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="27"
    height="27"
    viewBox="0 0 27 28"
    fill="none"
  >
    <g clip-path="url(#clip0_1267_24867)">
      <path
        d="M13.5 2.77246C7.30121 2.77246 2.27246 7.80121 2.27246 14C2.27246 20.1987 7.30121 25.2275 13.5 25.2275C19.6987 25.2275 24.7275 20.1987 24.7275 14C24.7275 7.80121 19.6987 2.77246 13.5 2.77246ZM12.915 23V15.9575H8.99996L14.625 4.99996V12.0425H18.3937L12.915 23Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_1267_24867">
        <rect
          width="27"
          height="27"
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
);
export default PointsIcon;
