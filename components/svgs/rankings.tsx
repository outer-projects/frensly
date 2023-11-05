import useDarkMode from "use-dark-mode";

const AchivementsSvg = () => {
  const darkMode = useDarkMode();
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      style={{filter: `invert(${darkMode ? '1' : '0'})`}}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="26" height="26" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_1041_33077" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_1041_33077"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADc0lEQVR4nO2cTYhOURjHf2N85KOwwEaJxGqUj3zNUDQ2UzSRWY1EYmFjZ2FjKSR2LESsKExNWZCP0Z0JmTLIZ0pKskDyWZijW0e9vb1f97733ufce55fPdt7zvn/7zn3nvM894KiKIqiKIqiKEp0jOchjvE8xDGehzjG8xDHeB7ijDogghGMFjUANUD6LjQ6A9xdY40uQWpAqvxN+Q5zfQaMQRg1QBg1QBg1QBg1QJg/nj+EWxFGDRBGDRBGDRBGDRCmHej38CEcABtxiLSMaJbCC5+2Ec3ijfDlrAVuJDDwfmBZjPYXA30JtD8ArCfHJDUjrgPLG2ivDbiYQKo0d3e8tBFtKryMEW0qvOwzYtT3Nd71fYTxZY3PixGBCi9jRKDCy8yIQIWXMSJQ4WWMCFR4GSMCFV5mHzHg+3u8JB3ABulO+Mwt4L4LNfo+0lmy/ndJd8ZH7pQYMKyzIFu6KrwFdWfcB6+5V8GAxy6UivtAd41NWI9054pOC/CwhgEvgLHSnSwyPQ0cRfRKd7KotAJPGzDglc6CdOiNcBK6I6U+eH33P49gwBtgvHSni8TOGPmAPdKdLgrjgNcxDHgHTJTufF6ZAay06/7ZJtKR54FtwCp7TaWE6cBSYCuwHzhlkyqfmxC8Xvy0sylM6BwCdttDvXlF3kV32PX4MHAZGAG+pyiyiRk/gEfAFeCI7XOY9Mk964CvDghsIsavIh3whTWcHx0Q1TQY3+zSVCjCev0PDohr6sQn+wJQSBYCbx0Q2VSJ98AiCs4c4KUDYpsKu+f5eMKsOsfKJuN4BszGM6YBQw6IP+zzJm0ycE1Q/DCxPxXPmQBcEhD/KjBJevAuHTefyVD8Pmu8UpbvPZ6B+Oc0Y1b7wWxSjpk12veeNRkYoJXUNdibgQH7vL/Na3AyAwNOqwHVGczAgLCcXanyFvQlo8SL+J8OXWRuBuL/jwXSg3WRTRkasEV6sC5yIIaQN2OeJR2UHqyLXIgg4GBZynB1xI+5w+IApYxGCm+H6vzhpL3BX+CEBbxKCeHB2O8agt2N+BF2h12eql0v/OH4lAjXKzxLqgg1Ygu34n6GGhpxu8q1VyQ8hlyzvcL3Xs0IX06n3YCVtrEroWsXgqNWlCcJC1/JiAe2rRMptZFLjlnhs6jPDM3drAYoiqIoiqIoioIQ/wBxZWuYr2a0uwAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};

export default AchivementsSvg;
