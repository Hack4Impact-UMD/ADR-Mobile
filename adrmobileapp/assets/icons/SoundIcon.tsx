import React from 'react';
import {Svg, Path} from 'react-native-svg';

interface SoundIconProps {
  width: number;
  height: number;
  color: string;
}

const SoundIcon: React.FC<SoundIconProps> = ({width, height, color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 52 52" fill="none">
      <Path
        d="M9.00982 30.183C7.46498 27.6083 7.46498 24.3917 9.00982 21.817C9.48124 21.0313 10.2622 20.4809 11.1607 20.3012L14.8289 19.5675C15.0475 19.5238 15.2445 19.4066 15.3872 19.2354L23.1708 9.89498C24.3534 8.47592 24.9447 7.76638 25.4723 7.95742C26 8.14846 26 9.07207 26 10.9193L26 41.0807C26 42.9279 26 43.8515 25.4723 44.0426C24.9447 44.2336 24.3534 43.5241 23.1708 42.105L15.3872 32.7646C15.2445 32.5934 15.0475 32.4762 14.8289 32.4325L11.1607 31.6988C10.2622 31.5191 9.48124 30.9687 9.00982 30.183Z"
        fill={color}
      />
      <Path
        d="M31.4937 18.3397C33.5148 20.3609 34.6553 23.099 34.6666 25.9573C34.6778 28.8157 33.559 31.5627 31.5538 33.5998"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M40.4232 13.7435C43.6571 16.9774 45.4818 21.3583 45.4998 25.9317C45.5179 30.5051 43.7277 34.9003 40.5193 38.1596"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default SoundIcon;
