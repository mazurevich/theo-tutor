import clsx from "clsx";
import type { FC, ReactNode } from "react";
import { Button, type ButtonProps } from "../button";

type IconButtonProps = Omit<ButtonProps, "variant" | "size"> & {
  icon?: ReactNode;
  type?: "button" | "submit" | "reset";
  iconClassName?: string;
};
export const IconButton: FC<IconButtonProps> = ({
  className,
  children,
  icon,
  ...rest
}) => {
  return (
    <Button
      variant="transparent"
      size="icon"
      className={clsx("w-8 h-8", className)}
      {...rest}
    >
      {icon}
      {children}
    </Button>
  );
};
