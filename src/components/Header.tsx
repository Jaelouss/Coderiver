import { HeaderWrapper } from "@styles";
import Logo from "@assets/logo.svg?react";
import { NavMenu } from "./NavMenu";
import { HeaderProps } from "@types";

export const Header = ({ menuList }: HeaderProps) => {
  return (
    <HeaderWrapper>
      <div style={{ overflow: "hidden" }}>
        <Logo
          width={156}
          height={22}
          className="header-logo"
          style={{ display: "block", transform: "translateY(100%)" }}
        />
      </div>
      <NavMenu menuList={menuList} />
    </HeaderWrapper>
  );
};