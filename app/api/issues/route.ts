import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { IssueSchema, IssueData } from "../../validationSchemas";
import { auth } from "@/auth.config";
import { Session } from "next-auth";

export const POST = auth(async (request: NextRequest & { auth: Session | null }) => {
  if (!request.auth) return NextResponse.json({}, { status: 401 });

  const body: IssueData = await request.json();

  const result = IssueSchema.safeParse(body);
  if (!result.success)
    return NextResponse.json(result.error.issues[0].message, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
});
