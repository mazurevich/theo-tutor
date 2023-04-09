import {
  type HTMLAttributes,
  type PropsWithChildren,
  forwardRef,
  type ReactNode,
} from "react";
import clsx from "clsx";

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
  children?: ReactNode;
  size?: Size;
  type?: Type;
} & Omit<HTMLAttributes<HTMLButtonElement>, "type">;

const SizeClasses: Record<Size, string> = {
  [Sizes.small]: "px-2 py-1 text-sm rounded-md",
  [Sizes.medium]: "px-4 py-2 text-base rounded-lg",
  [Sizes.large]: "px-6 py-3 text-lg rounded-xl",
};

const ColorClasses: Record<Type, string> = {
  [Types.primary]:
    "bg-primary text-secondary hover:bg-primary-hover active:bg-primary-active",
  [Types.secondary]:
    "bg-secondary text-primary hover:bg-secondary-hover active:bg-secondary-active border border-primary",
  [Types.transparent]:
    "bg-transparent text-primary hover:text-primary-hover active:text-primary-active",
  [Types.link]:
    "bg-transparent text-blue-700 hover:text-blue-800 active:text-blue-900 hover:underline",
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
