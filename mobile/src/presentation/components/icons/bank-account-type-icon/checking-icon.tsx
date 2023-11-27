import { Path, Rect, Svg } from "react-native-svg";

type Props = {
  color?: string;
  size?: number;
}
export function CheckingIcon({ color, size }: Props) {
  const currentColor = color ? color : '#495057';
  const currentSize = size ? size : 44;

  return (
    <Svg
      width={currentSize}
      height={currentSize}
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
        fill="#E9ECEF"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.0351 14.5391H16.9639C14.5276 14.5391 13 16.2641 13 18.7053V25.2933C13 27.7355 14.5198 29.4596 16.9639 29.4596H27.0342C29.4792 29.4596 31 27.7355 31 25.2933V18.7053C31 16.2641 29.4792 14.5391 27.0351 14.5391Z"
        stroke={currentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13 19.8341H31"
        stroke={currentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.1768 25.1701H20.1453"
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
