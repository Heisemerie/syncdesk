import prisma from "@/prisma/prisma";
import IssueActions from "./IssueActions";
import IssueTable from "./IssueTable";
import { Issue, Status } from "../generated/prisma";

interface Props {
  searchParams: Promise<{ status: Status, orderBy: keyof Issue }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const searchparams = await searchParams;

  const statuses = Object.values(Status);
  const status = statuses.includes(searchparams.status)
    ? searchparams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
  });

  return (
    <div>
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchparams} />
    </div>
  );
};

export default IssuesPage;
