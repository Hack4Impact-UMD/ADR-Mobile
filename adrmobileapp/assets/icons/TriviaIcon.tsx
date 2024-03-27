import React from 'react';
import {Svg, Path} from 'react-native-svg';

interface MySvgIconProps {
  width: number;
  height: number;
  color: string;
}

const TriviaIcon: React.FC<MySvgIconProps> = ({width, height, color}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 52 52" fill="none">
      <Path
        d="M43.3334 26V41.5C43.3334 43.3856 43.3334 44.3284 42.7476 44.9142C42.1618 45.5 41.219 45.5 39.3334 45.5H14.0834C11.8176 45.5 10.6847 45.5 9.89276 44.9193C9.64596 44.7384 9.42831 44.5207 9.24735 44.2739C8.66669 43.482 8.66669 42.3491 8.66669 40.0833V40.0833C8.66669 37.8176 8.66669 36.6847 9.24735 35.8927C9.42831 35.6459 9.64596 35.4283 9.89276 35.2473C10.6847 34.6667 11.8176 34.6667 14.0834 34.6667H39.3334C41.219 34.6667 42.1618 34.6667 42.7476 34.0809C43.3334 33.4951 43.3334 32.5523 43.3334 30.6667V10.5C43.3334 8.61438 43.3334 7.67157 42.7476 7.08579C42.1618 6.5 41.219 6.5 39.3334 6.5H12.6667C10.7811 6.5 9.83826 6.5 9.25247 7.08579C8.66669 7.67157 8.66669 8.61438 8.66669 10.5V40.0833"
        stroke={color}
        strokeWidth="2"
      />
      <Path
        d="M19.5 21.6666L23.1262 25.2929C23.5168 25.6834 24.1499 25.6834 24.5404 25.2929L32.5 17.3333"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default TriviaIcon;
