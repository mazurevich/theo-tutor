import type {
  CSSProperties,
  FC,
  HTMLAttributes,
  PropsWithChildren,
} from "react";
import clsx from "clsx";
import { forwardRef } from "react";

const Sizes = {
  small: "small",
  medium: "medium",
  large: "large",
} as const;

type Size = (typeof Sizes)[keyof typeof Sizes];

const Types = {
  primary: "primary",
  secondary: "secondary",
  transparent: "transparent",
  link: "link",
} as const;

type Type = (typeof Types)[keyof typeof Types];

export type ButtonProps = {
  children?: string;
  size?: Size;
  type?: Type;
} & HTMLAttributes<HTMLButtonElement>;

type CssClass = HTMLAttributes<HTMLButtonElement>["className"];

const SizeClasses: Record<Size, CssClass> = {
  [Sizes.small]: "px-2 py-1 text-sm rounded-md",
  [Sizes.medium]: "px-4 py-2 text-base rounded-lg",
  [Sizes.large]: "px-6 py-3 text-lg rounded-xl",
};

const ColorClasses: Record<Type, CssClass> = {
  [Types.primary]:
    "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
  [Types.secondary]:
    "bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700",
  [Types.transparent]:
    "bg-transparent text-gray-500 hover:text-gray-600 active:text-gray-700",
  [Types.link]:
    "bg-transparent text-blue-500 hover:text-blue-600 active:text-blue-700 hover:underline",
};

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(
  (
    {
      children,
      style,
      className,
      size = "medium",
      type = "primary",
      ...htmlButtonProps
    },
    ref
  ) => {
    const sizeClasses = SizeClasses[size];
    const typeClasses = ColorClasses[type];

    return (
      <button
        ref={ref}
        type="button"
        style={style}
        className={clsx(
          sizeClasses,
          typeClasses,
          "transition-colors duration-300",
          className
        )}
        {...htmlButtonProps}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
