"use client";
import { Select } from "@radix-ui/themes";
import { Status } from "../generated/prisma";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: String; value: Status | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onChange = (status: string) => {
    status = status === "ALL" ? "" : status;

    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (searchParams.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);

    const query = params.size ? `?${params.toString()}` : "";
    router.push(`/issues${query}`);
  };

  return (
    <Select.Root
      onValueChange={onChange}
      defaultValue={searchParams.get("status") || "ALL"}
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
