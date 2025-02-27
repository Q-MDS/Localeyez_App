import * as React from "react";
import Svg, { Path } from "react-native-svg";

const PaywallTickPlain = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      fill="#612bc1"
      fillRule="evenodd"
      d="M27.4 8.38c.62.548.678 1.496.13 2.12l-11.5 13a1.5 1.5 0 0 1-2.148.102l-7.5-7a1.5 1.5 0 0 1 2.046-2.194l6.38 5.94 10.48-11.84a1.5 1.5 0 0 1 2.12-.128H27.4Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default PaywallTickPlain;
