"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import IssueSchema, { IssueData } from "@/app/validationSchemas";
import { ErrorMessage } from "@/app/components";
import { Issue } from "@/app/generated/prisma";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface Props {
  issue?: Issue;
}
const IssueForm = ({ issue }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueData>({
    resolver: zodResolver(IssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState<string>();

  const onSubmit = async (data: IssueData) => {
    try {
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <FaInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button loading={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
