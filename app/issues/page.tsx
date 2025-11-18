import prisma from "@/prisma/prisma";
import IssueActions from "./IssueActions";
import IssueTable from "./IssueTable";
import { Status } from "../generated/prisma";

interface Props {
  searchParams: Promise<{ status: Status }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const { status } = await searchParams;

  const statuses = Object.values(Status);
  const validStatus = statuses.includes(status) ? status : undefined;
  
  const issues = await prisma.issue.findMany({
    where: {
      status: validStatus,
    },
  });

  return (
    <div>
      <IssueActions />
      <IssueTable issues={issues} />
    </div>
  );
};

export default IssuesPage;
