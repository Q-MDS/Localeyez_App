import * as React from "react";
import Svg, { Path } from "react-native-svg";

const IconGeo = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#612BC1"
      fillRule="evenodd"
      d="M7.758 5.768A5.98 5.98 0 0 1 12 4a5.98 5.98 0 0 1 4.241 1.768A6.06 6.06 0 0 1 18 10.037c0 2.764-1.532 5.264-3.128 7.111A20.692 20.692 0 0 1 12 19.876a20.697 20.697 0 0 1-2.872-2.727C7.532 15.302 6 12.801 6 10.039a6.06 6.06 0 0 1 1.758-4.271Zm3.954 15.14L12 20.5l.288.409a.5.5 0 0 1-.576 0Zm0 0L12 20.5l.288.409.002-.002.005-.003.015-.012.059-.042.215-.162a21.702 21.702 0 0 0 3.044-2.885C17.282 15.89 19 13.16 19 10.038a7.059 7.059 0 0 0-2.049-4.975 6.98 6.98 0 0 0-7.633-1.526A6.98 6.98 0 0 0 7.05 5.063 7.06 7.06 0 0 0 5 10.038c0 3.121 1.718 5.851 3.372 7.764a21.7 21.7 0 0 0 3.044 2.885c.09.07.181.138.274.205l.016.011.004.003.002.002ZM10 10a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default IconGeo;
