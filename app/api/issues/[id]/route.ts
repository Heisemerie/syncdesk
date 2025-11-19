import { patchIssueData, patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/prisma";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = auth(
  async (
    request: NextRequest & { auth: Session | null },
    { params }: { params: Promise<{ id: string }> }
  ) => {
    if (!request.auth) return NextResponse.json({}, { status: 401 });

    const { id } = await params;
    const body: patchIssueData = await request.json();

    const result = patchIssueSchema.safeParse(body);
    if (!result.success)
      return NextResponse.json(result.error.issues[0].message, { status: 400 });

    const { title, description, assignedToUserId } = body;

    if (assignedToUserId) {
      const user = await prisma.user.findUnique({
        where: { id: assignedToUserId },
      });

      if (!user)
        return NextResponse.json({ error: "Invalid user" }, { status: 400 });
    }

    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(id) },
    });
    if (!issue)
      return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

    const updatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: {
        title,
        description,
        assignedToUserId,
      },
    });

    return NextResponse.json(updatedIssue);
  }
);

export const DELETE = auth(
  async (
    request: NextRequest & { auth: Session | null },
    { params }: { params: Promise<{ id: string }> }
  ) => {
    if (!request.auth) return NextResponse.json({}, { status: 401 });

    const { id } = await params;

    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(id) },
    });
    if (!issue)
      return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

    await prisma.issue.delete({
      where: { id: issue.id },
    });

    return NextResponse.json({});
  }
);
