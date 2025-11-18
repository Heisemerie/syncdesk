import prisma from "@/prisma/prisma";
import IssueActions from "./IssueActions";
import IssueTable, { columns } from "./IssueTable";
import { Issue, Status } from "../generated/prisma";

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const searchparams = await searchParams;

  const statuses = Object.values(Status);
  const status = statuses.includes(searchparams.status)
    ? searchparams.status
    : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchparams.orderBy)
    ? { [searchparams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy,
  });

  return (
    <div>
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchparams} />
    </div>
  );
};

export default IssuesPage;
