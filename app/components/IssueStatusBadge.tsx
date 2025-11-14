import { Badge } from "@radix-ui/themes";
import { Status } from "../generated/prisma";

interface Props {
  status: Status;
}

const statuspMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statuspMap[status].color}>{statuspMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
