import { Link, LinkProps } from "react-router-dom";
import Button, { ButtonProps } from "@mui/material/Button";

import {styled} from "@mui/material/styles";

interface LinkButtonProps extends ButtonProps {
  to: LinkProps['to'];
}


export default function LinkButton({ to, children, sx, size, endIcon, variant, color}: LinkButtonProps) {
  
  const LinkBtn = styled(Button)<LinkProps>(() => ({...sx}));
  return (

        <LinkBtn 
        LinkComponent={Link} size={size} sx={sx}
        to={to} variant={variant} color={color} endIcon={endIcon}>{children}</LinkBtn>
  )
}