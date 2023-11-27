import 'styled-components/native';
import { defaultTheme } from './default-theme';

type CustomTheme = typeof defaultTheme;

declare module 'styled-components/native' {
  export interface DefaultTheme extends CustomTheme {}
}
