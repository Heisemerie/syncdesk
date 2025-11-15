import { Button } from "@radix-ui/themes";
import Link from "next/link";

const DeleteIssueButton = ({ id }: { id: string }) => {
  return (
    <Button color="red">
      <Link href={`/issues/${id}/edit`}>Delete Issue</Link>
    </Button>
  );
};

export default DeleteIssueButton;
