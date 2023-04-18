import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
  useState,
} from "react";
import clsx from "clsx";
import { UserCircle } from "../../icons";

type UserAvatarProps<T extends ElementType> = {
  name?: string | null;
  src?: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "alt">;

const DEFAULT_ELEMENT = "img";

const getInitials = (name: string) => {
  const [firstName = "", lastName = ""] = name.split(" ");
  return `${firstName[0]}${lastName ? lastName[0] : ""}`;
};

const avatarClasses = "rounded-full border-2 border-secondary";
export const UserAvatar = <T extends ElementType = typeof DEFAULT_ELEMENT>({
  name,
  size = 48,
  className,
  style,
  as,
  src,
  ...rest
}: UserAvatarProps<T>): JSX.Element => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const defaultStyle = {
    width: size,
    height: size,
    ...style,
  };

  if (!name && !src) {
    return <UserCircle className={className} style={defaultStyle} />;
  }

  const initials = getInitials(name || "");
  const Component = as || DEFAULT_ELEMENT;

  return (
    <div className="relative">
      <div
        className={clsx(
          "flex items-center justify-center font-bold text-secondary rounded-full " +
            "border-2 border-secondary bg-primary rounded-full select-none",
          className
        )}
        style={defaultStyle}
      >
        {initials}
      </div>
      {!imageError && src && (
        <Component
          src={src}
          className={clsx(
            avatarClasses,
            "absolute top-0 left-0 transition-opacity duration-150 ease-in-out select-none",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          style={defaultStyle}
          alt={`${name} avatar`}
          onError={() => setImageError(true)}
          onLoad={() => setImageLoaded(true)}
          {...rest}
        />
      )}
    </div>
  );
};
