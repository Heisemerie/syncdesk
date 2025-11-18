"use client";
import { Select } from "@radix-ui/themes";
import { Status } from "../generated/prisma";
import { useRouter } from "next/navigation";

const IssueStatusFilter = () => {
  const router = useRouter();
  const statuses: { label: String; value: Status | "ALL" }[] = [
    { label: "All", value: "ALL" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  return (
    <Select.Root
      onValueChange={(status) => {
        status = status === "ALL" ? "" : status;
        const query = status ? `?status=${status}` : "";
        router.push(`/issues${query}`);
      }}
      defaultValue="ALL"
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status, index) => (
          <Select.Item key={index} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
