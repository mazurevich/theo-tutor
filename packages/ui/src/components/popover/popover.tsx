import { type FC, type ReactNode, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Button } from "../button";
import clsx from "clsx";

export type MenuItem = {
  id: string;
  label: string;
  onClick?: (id: string) => void;
  disabled?: boolean;
  active?: boolean;
  icon?: ReactNode;
};

const Alignments = {
  left: "left",
  right: "right",
  center: "center",
} as const;
type Alignment = (typeof Alignments)[keyof typeof Alignments];

export type PopoverProps = {
  items: MenuItem[];
  menuButton: ReactNode;
  alignment?: Alignment;
};

const alignmentClasses = {
  [Alignments.left]: "left-0",
  [Alignments.right]: "right-0",
  [Alignments.center]: "left-1/2 -translate-x-1/2",
};

export const PopoverMenu: FC<PopoverProps> = ({
  items,
  menuButton,
  alignment = "left",
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>{menuButton}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className={clsx(
            "absolute mt-2 w-56 origin-top-right divide-y left" +
              "divide-gray-700 rounded-md bg-secondary shadow-lg ring-1 ring-primary ring-opacity-0" +
              "focus:outline-none transform opacity-100 scale-100",
            alignmentClasses[alignment]
          )}
        >
          {items.map(({ icon, onClick, id, disabled, label }) => (
            <Menu.Item key={id} as="li" className="p-1">
              {() => (
                <Button
                  type="transparent"
                  className="w-full flex hover:bg-primary-hover hover:text-secondary ui-active:bg-primary ui-active:text-secondary active:bg-primary"
                  onClick={() => onClick?.(id)}
                >
                  {icon && <span className="mr-2">{icon}</span>}
                  {label}
                </Button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
