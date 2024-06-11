import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const id = params.id;

  try {
    const deleteTodo = await prisma.todo.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      status: 200,
      message: "success deleted",
      data: deleteTodo,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
