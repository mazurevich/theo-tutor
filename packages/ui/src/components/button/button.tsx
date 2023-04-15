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
  icon: "icon",
} as const;

type Size = (typeof Sizes)[keyof typeof Sizes];

const Variants = {
  primary: "primary",
  secondary: "secondary",
  transparent: "transparent",
  link: "link",
} as const;

type Variant = (typeof Variants)[keyof typeof Variants];

export type ButtonProps = {
  children?: ReactNode;
  size?: Size;
  variant?: Variant;
} & HTMLAttributes<HTMLButtonElement>;

const SizeClasses: Record<Size, string> = {
  [Sizes.small]: "px-2 py-1 text-sm rounded-md",
  [Sizes.medium]: "px-4 py-2 text-base rounded-lg",
  [Sizes.large]: "px-6 py-3 text-lg rounded-xl",
  [Sizes.icon]: "px-1 py-1 text-base ",
};

const ColorClasses: Record<Variant, string> = {
  [Variants.primary]:
    "bg-primary text-secondary hover:bg-primary-hover active:bg-primary-active",
  [Variants.secondary]:
    "bg-secondary text-primary hover:bg-secondary-hover active:bg-secondary-active border border-primary",
  [Variants.transparent]:
    "bg-transparent text-primary hover:text-primary-hover active:text-primary-active",
  [Variants.link]:
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
      variant = "primary",
      ...htmlButtonProps
    },
    ref
  ) => {
    const sizeClasses = SizeClasses[size];
    const typeClasses = ColorClasses[variant];

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
