import { iconsMap } from './icons-map';

type BankAccountTypeIconProps = {
  type: keyof typeof iconsMap;
  size?: number;
}

export function BankAccountTypeIcon({ type, size }: BankAccountTypeIconProps) {
  const Icon = iconsMap[type];
  const currentSize = size ? size : 44;

  return <Icon size={currentSize} />;
}
