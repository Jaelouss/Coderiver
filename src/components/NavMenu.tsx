import { MainNav, NavList } from "@styles"
import { ScrambleText } from "./ScrambleText"
import { navMenuListType } from "@types"

export const NavMenu = ({ menuList }: { menuList: navMenuListType[] }) => {
	return (
		<MainNav>
			<NavList>
				{menuList.map((item) => (
					<li key={item.label}>
						<a href={item.href}>
							<ScrambleText>{item.label}</ScrambleText>
						</a>
					</li>
				))}
			</NavList>
		</MainNav>
	)
}