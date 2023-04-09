import { UserAvatar } from "./user-avatar";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/UserAvatar",
  component: UserAvatar,
  tags: ["autodocs"],
} satisfies Meta<typeof UserAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {},
};

export const WithName: Story = {
  args: {
    name: "John Doe",
  },
};

export const WithProfilePicture: Story = {
  args: {
    name: "John Doe",
    profilePicture: "https://i.pravatar.cc/300",
  },
};
