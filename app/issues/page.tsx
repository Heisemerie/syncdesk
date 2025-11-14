import prisma from "@/prisma/prisma";
import IssueActions from "./IssueActions";
import IssueTable from "./IssueTable";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <IssueActions />
      <IssueTable issues={issues} />
    </div>
  );
};

export default IssuesPage;
