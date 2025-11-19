import { authOptions } from "@/app/api/auth/authOptions";
import prisma from "@/prisma/prisma";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  const users = await prisma.user.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"3"}>
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction={"column"} gap={"4"}>
            <AssigneeSelect issue={issue} users={users} />
            <EditIssueButton id={id} />
            <DeleteIssueButton id={id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetedata({ params }: Props) {
  const { id } = await params;

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  return { title: issue?.title, description: `Details of issue ${issue?.id}` };
}

export default IssueDetailPage;
