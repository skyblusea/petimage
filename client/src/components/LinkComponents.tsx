import { LinkProps } from "react-router-dom";
import Button, { ButtonProps } from "@mui/material/Button";
import Box, { BoxProps } from "@mui/material/Box";
import ListItemButton, {ListItemButtonOwnProps} from '@mui/material/ListItemButton';
import MenuItem, {MenuItemProps} from '@mui/material/MenuItem';
import styled from '@emotion/styled'



interface LinkButtonProps extends ButtonProps {
  to: LinkProps['to'];
}

export const LinkButton = styled(Button)<LinkButtonProps>(() => ({}));


interface ListItemButtonProps extends ListItemButtonOwnProps {
  to: LinkProps['to'];
}

export const LinkListItemButton = styled(ListItemButton)<ListItemButtonProps>(() => ({}))

interface LinkMenuItemProps extends MenuItemProps {
  //@ts-ignore
  component?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined
  to: LinkProps['to'];
}

export const LinkMenuItem = styled(MenuItem)<LinkMenuItemProps>(() => ({}))

interface LinkBoxProps extends BoxProps {
  to?: LinkProps['to'];
}

export const LinkBox = styled(Box)<LinkBoxProps>(() => ({}))


// export function LinkBox ({
//   to,
//   children,
//   ...props
// }:{
//   to: LinkProps['to'];
//   children?: React.ReactNode;
//   props?: BoxProps;
// }) {
//   return (
//     <Box component={Link} to={to} {...props}>
//       {children}
//     </Box>
//   )
// }
