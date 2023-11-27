import { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Logo } from "../../../../components/logo";
import { DropdownMenu } from "./dropdown-menu";
import { Container } from "./styles";
import { UserAvatar } from "./user-avatar";

export function Header() {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const triggerRef = useRef<TouchableOpacity>(null);

  return (
    <>
      <DropdownMenu
        isOpen={isOpenDropdown}
        triggerRef={triggerRef}
        onClose={() => setIsOpenDropdown(false)}
      />

      <Container>
        <Logo />

        <UserAvatar
          ref={triggerRef}
          onPress={() => setIsOpenDropdown(true)}
        />
      </Container>
    </>
  )
}
