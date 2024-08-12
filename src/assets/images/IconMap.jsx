import * as React from "react";
import Svg, { Path } from "react-native-svg";

const IconMap = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#5E1BBC"
      fillRule="evenodd"
      d="M12 10.2a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Zm0-3.6A1.2 1.2 0 1 1 12 9a1.2 1.2 0 0 1 0-2.4Z"
      clipRule="evenodd"
    />
    <Path
      fill="#5E1BBC"
      fillRule="evenodd"
      d="M6.6 7.543c0 3.208 3.183 8.657 5.4 8.657 2.217 0 5.4-5.45 5.4-8.657C17.4 4.38 14.99 1.8 12 1.8c-2.992 0-5.4 2.58-5.4 5.743Zm9.6 0C16.2 10.175 13.382 15 12 15c-1.382 0-4.2-4.824-4.2-7.457C7.8 5.024 9.69 3 12 3c2.31 0 4.2 2.024 4.2 4.543Z"
      clipRule="evenodd"
    />
    <Path
      fill="#5E1BBC"
      d="M16.122 10.968a.6.6 0 0 1 .442-1.115 3.6 3.6 0 0 1 2.088 2.208l1.601 4.8a3.6 3.6 0 0 1-3.418 4.739H7.165a3.6 3.6 0 0 1-3.416-4.74l1.6-4.8a3.6 3.6 0 0 1 2.14-2.227.6.6 0 0 1 .426 1.121 2.4 2.4 0 0 0-1.428 1.487l-1.6 4.8A2.4 2.4 0 0 0 7.164 20.4h9.674a2.4 2.4 0 0 0 2.276-3.16l-1.598-4.8a2.399 2.399 0 0 0-1.392-1.471"
    />
  </Svg>
)
export default IconMap;
