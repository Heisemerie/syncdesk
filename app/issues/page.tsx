import prisma from "@/prisma/prisma";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import Pagination from "../components/Pagination";
import { Status } from "../generated/prisma";
import IssueActions from "./IssueActions";
import IssueTable, { columns, IssueQuery } from "./IssueTable";

interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const searchparams = await searchParams;

  const statuses = Object.values(Status);
  const status = statuses.includes(searchparams.status)
    ? searchparams.status
    : undefined;
  const where = { status };

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchparams.orderBy)
    ? { [searchparams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchparams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction={"column"} gap={"3"}>
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchparams} />
      <Pagination
        currentPage={page}
        itemCount={issueCount}
        pageSize={pageSize}
      />
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "Syncdesk - Issue List",
  description: "View all project issues",
};

export default IssuesPage;
