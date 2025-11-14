import { NextRequest, NextResponse } from "next/server";
import schema, { IssueData } from "./schema";
import prisma from "@/prisma/prisma";

export async function POST(request: NextRequest) {
  const body: IssueData = await request.json();

  const result = schema.safeParse(body);
  if (!result.success)
    return NextResponse.json(result.error.issues[0].message, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
