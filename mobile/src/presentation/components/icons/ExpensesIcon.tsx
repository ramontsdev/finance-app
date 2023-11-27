import { Path, Svg } from "react-native-svg";

type Props = {
  color?: string;
  size?: number;
}
export function ExpensesIcon({ color, size }: Props) {
  const currentColor = color ? color : '#212529';
  const currentSize = size ? size : 24;

  return (
    <Svg
      width={currentSize}
      height={currentSize}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M13.259 18.3478H6.4217C4.53397 18.3478 3.35986 17.0159 3.35986 15.1309V8.02841C3.35986 6.14349 4.53397 4.81152 6.42076 4.81152H17.579C19.4601 4.81152 20.6399 6.14349 20.6399 8.02841V9.94693M16.5376 15.5514L18.5887 13.5002M18.5887 13.5002L20.639 15.5514M18.5887 13.5002L18.589 18.348M6.44409 8.17334H7.791M9.80261 11.5806C9.80261 10.3673 10.7862 9.38467 11.9986 9.38467C13.2119 9.38467 14.1954 10.3673 14.1954 11.5806C14.1954 12.7939 13.2119 13.7766 11.9986 13.7766C10.7862 13.7766 9.80261 12.7939 9.80261 11.5806Z"
        stroke={currentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function _ExpensesIcon({ color, size }: Props) {
  const currentColor = color ? color : '#212529';
  const currentSize = size ? size : 24;

  return (
    <Svg
      width={currentSize}
      height={currentSize}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M13.259 18.3478H6.4217C4.53397 18.3478 3.35986 17.0159 3.35986 15.1309V8.02841C3.35986 6.14349 4.53397 4.81152 6.42076 4.81152H17.579C19.4601 4.81152 20.6399 6.14349 20.6399 8.02841V9.94693M6.44409 8.17151H7.791M16.5376 16.2978L18.5887 18.349M18.5887 18.349L20.639 16.2978M18.5887 18.349L18.5887 13.5002M9.80444 11.5806C9.80444 10.3673 10.788 9.38467 12.0004 9.38467C13.2137 9.38467 14.1973 10.3673 14.1973 11.5806C14.1973 12.7939 13.2137 13.7766 12.0004 13.7766C10.788 13.7766 9.80444 12.7939 9.80444 11.5806Z"
        stroke={currentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
