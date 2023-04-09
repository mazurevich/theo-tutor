import { PopoverMenu } from "./popover";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import { UserCircle } from "../../icons";

const meta = {
  title: "Components/PopoverMenu",
  component: PopoverMenu,
  tags: ["autodocs"],
} satisfies Meta<typeof PopoverMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    items: [
      {
        id: "1",
        label: "Item 1",
        icon: <UserCircle />,
        // eslint-disable-next-line no-console
        onClick: (id: string) => console.log(id),
      },
      {
        id: "2",
        label: "Item 2",
        // eslint-disable-next-line no-console
        onClick: (id: string) => console.log(id),
      },
    ],
    menuButton: <Button type="primary">Menu</Button>,
  },
};

export const UserAvatar: Story = {
  args: {
    items: [
      {
        id: "logout",
        label: "Logout",
        // eslint-disable-next-line no-console
        onClick: () => console.log("loggin out"),
      },
    ],
    menuButton: <UserCircle className="w-12 h-12" />,
    alignment: "center",
  },
  render: ({ ...args }) => (
    <div className="text-center">
      <PopoverMenu {...args} />
    </div>
  ),
};
