import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const IconSupport = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={96}
    height={96}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={6.857}
        d="M20.57 48V29.966A26.949 26.949 0 0 1 48 3.429a26.948 26.948 0 0 1 27.428 26.537V48M61.713 84a13.714 13.714 0 0 0 13.715-13.714V54.857M61.713 84a8.571 8.571 0 0 1-8.571 8.572H42.856a8.571 8.571 0 0 1 0-17.143h10.286A8.571 8.571 0 0 1 61.713 84ZM10.285 37.714h6.857a3.429 3.429 0 0 1 3.429 3.429v20.571a3.428 3.428 0 0 1-3.429 3.429h-6.857a6.857 6.857 0 0 1-6.857-6.857V44.57a6.857 6.857 0 0 1 6.857-6.857Zm75.428 27.429h-6.857a3.429 3.429 0 0 1-3.428-3.429V41.143a3.429 3.429 0 0 1 3.428-3.429h6.857a6.857 6.857 0 0 1 6.858 6.858v13.714a6.857 6.857 0 0 1-6.858 6.857Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h96v96H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default IconSupport;
