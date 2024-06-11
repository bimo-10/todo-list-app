"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getTodos } from "@/lib/fetchTodo";
import AddTodoDialog from "./AddTodoDialog";
import DeleteTodoDialog from "./DeleteTodoDialog";
import { LoaderCircle } from "lucide-react";

export default function TableTodoSection() {
  const {
    data: todos,
    error,
    isFetching: isFetchingGetTodos,
    isPending,
    isLoading: isLoadingGetTodos,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    placeholderData: keepPreviousData,
  });

  if (isFetchingGetTodos) {
    return (
      <div>
        <LoaderCircle size={42} className="animate-spin " />
      </div>
    );
  }

  return (
    <section className="w-[60%] ">
      <AddTodoDialog />
      <Table className="my-4">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Todo</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {todos.data?.map((todo) => (
            <TableRow>
              <TableCell>{todo.todo}</TableCell>
              <TableCell className="text-center">
                <DeleteTodoDialog todoId={todo.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
