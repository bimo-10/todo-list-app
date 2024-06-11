"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTodo } from "@/lib/fetchTodo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";

const formSchema = z.object({
  todo: z.string().min(1, { message: "Todo is required" }),
  completed: z.boolean(),
});

export default function AddTodoDialog() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: "",
      completed: false,
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutateAsync: addTodoMutation, isLoading: isLoadingAddTodo } =
    useMutation({
      mutationFn: async () => {
        const response = await axios.post(
          "http://localhost:3000/api/todo/create",
          {
            todo: form.getValues("todo"),
            completed: form.getValues("completed"),
          }
        );

        return response;
      },
      onSuccess: () => {
        form.reset({
          todo: "",
          completed: false,
        });
        router.refresh();
        router.push("/");
        queryClient.invalidateQueries(["todos"]);
        setIsOpen(false);
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const onSubmitTodo = (data) => {
    addTodoMutation(data);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="bg-sky-600 text-white hover:bg-sky-500">
            Add Todo
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Todo</DialogTitle>
            <DialogDescription>Add a new Todo</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmitTodo)}
              >
                <FormField
                  control={form.control}
                  name="todo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Todo</FormLabel>
                      <FormControl>
                        <Input placeholder="Todo" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit">
                  {isLoadingAddTodo ? "Loading..." : "Add Todo"}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
