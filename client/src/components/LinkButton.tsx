import { Link, LinkProps } from "react-router-dom";
import Button, { ButtonProps } from "@mui/material/Button";

import styled from '@emotion/styled'

interface LinkButtonProps extends ButtonProps {
  to: LinkProps['to'];
}


export default function LinkButton({ to, children, sx, size, endIcon, variant, color, disabled,
  startIcon
}: LinkButtonProps) {

  const LinkBtn = styled(Button)<LinkProps>(() => ({ ...sx }));
  return (
    <LinkBtn
      startIcon={startIcon}
      disabled={disabled}
      LinkComponent={Link} size={size} sx={sx}
      to={to} variant={variant} color={color} endIcon={endIcon}>{children}
    </LinkBtn>
  )
}