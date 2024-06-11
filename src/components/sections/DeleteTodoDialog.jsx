import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DeleteTodoDialog({ todoId }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutateAsync: deleteTodoMutation, isLoading: isLoadingDeleteTodo } =
    useMutation({
      mutationFn: async (id) => {
        const response = await axios.delete(
          `http://localhost:3000/api/todo/delete/${id}`
        );

        return response;
      },
      onSuccess: () => {
        router.refresh();
        router.push("/");
        queryClient.invalidateQueries(["todos"]);
        setIsOpen(false);
      },
    });

  const handleDeleteTodo = () => {
    deleteTodoMutation(todoId);
  };
  return (
    <div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Remove</Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Todo</AlertDialogTitle>
            <AlertDialogDescription>Are you sure?</AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={() => handleDeleteTodo()}>Delete</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
