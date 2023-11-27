import { Path, Rect, Svg } from "react-native-svg";

type Props = {
  color?: string;
  size?: number;
}
export function Clothes({ color, size }: Props) {
  const currentColor = color ? color : '#339AF0';

  return (
    <Svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    >
      <Rect
        x="1"
        y="1"
        width="42"
        height="42"
        rx="21"
        fill="#E7F5FF"
      />
      <Path
        d="M24.0549 22.0479L29.5853 24.3373C30.4415 24.6914 31 25.5272 31 26.4535C31 27.7193 29.9745 28.7448 28.7096 28.7448H15.2904C14.0255 28.7448 13 27.7193 13 26.4535V26.3669C13 25.4474 13.5507 24.6165 14.3982 24.2575C14.3982 24.2575 22.3843 19.8373 22.8241 19.5726C23.764 19.0073 24.4519 18.0966 24.0812 16.8016C23.8769 16.0874 23.3408 15.5212 22.6227 15.3305C21.1535 14.9413 19.8293 16.1234 19.8293 17.5303"
        stroke={currentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect
        x="1"
        y="1"
        width="42"
        height="42"
        rx="21"
        stroke="white"
        strokeWidth="2"
      />
    </Svg>
  );
}
