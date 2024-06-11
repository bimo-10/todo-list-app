import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const id = params.id;
  const body = await request.json();

  try {
    const response = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        completed: body.completed,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "success updated",
      data: response,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
