import { NextRequest, NextResponse } from "next/server";
import IssueSchema, { IssueData } from "../../validationSchemas";
import prisma from "@/prisma/prisma";
import { authOptions } from "../auth/authOptions";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body: IssueData = await request.json();

  const result = IssueSchema.safeParse(body);
  if (!result.success)
    return NextResponse.json(result.error.issues[0].message, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
