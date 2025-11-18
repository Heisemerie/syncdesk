"use client";
import { Issue, User } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import axios from "axios";

interface Props {
  issue: Issue;
  users: User[];
}

const AssigneeSelect = ({ issue, users }: Props) => {
  return (
    <Select.Root
      onValueChange={(userId) => {
        axios.patch(`/api/issues/${issue.id}`, {
          assignedToUserId: userId === "unassigned" ? null : userId,
        });
      }}
      defaultValue={issue.assignedToUserId || "unassigned"}
    >
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
