const Swap = ({ isActive }: { isActive: boolean }) => (
  <svg
    width="22"
    height="17"
    viewBox="0 0 22 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 1.49979L7 4.49979M4 1.49979L1 4.49979M4 1.49979L4 16.4998L9 16.5"
      stroke={isActive ? "#DC0000" : "#B4B4B3"}
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M18 16.5002L15 13.5002M18 16.5002L21 13.5002M18 16.5002L18 1.50021L13 1.5"
      stroke={isActive ? "#DC0000" : "#B4B4B3"}
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
export default Swap;
