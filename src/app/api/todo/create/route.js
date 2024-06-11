import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  try {
    const todo = await prisma.todo.create({
      data: body,
    });

    return NextResponse.json({
      status: 200,
      message: "success created",
      data: todo,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
