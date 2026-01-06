"use client";

import { useCreateTodo } from "@/hooks/user-create-todo";
import { createTodoSchema } from "@/validations/todo-validations";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "./ui/select";

import { zodResolver } from "@hookform/resolvers/zod";

const ToDoForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const createTodoMutation = useCreateTodo();

  const form = useForm({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await createTodoMutation.mutateAsync(data);
      if (result.success) {
        toast.success("Todo created successfully");
        form.reset();
        setIsOpen(false);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to create todo");
      throw error;
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className=" w-full mb-6"
        size="lg"
      >
        Add New Todo
      </Button>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Create New Todo</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
          <div>
            <Label htlmfor="title">Title *</Label>
            <Input
              id="title"
              className="mt-2"
              {...form.register("title")}
              placeholder="Enter todo title..."
            />
            {form.formState.errors.title && (
              <p className=" text-sm text-destructive mt-1">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label htlmfor="description">Description</Label>
            <Textarea
              id="description"
              className="mt-2"
              {...form.register("description")}
              placeholder="Enter description (optional)"
              rows={3}
            />
            {form.formState.errors.description && (
              <p className=" text-sm text-destructive mt-1">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label htlmfor="priority">Priority</Label>
            <Select
              value={form.getValues("priority")}
              onValueChange={(value) => form.setValue("priority", value)}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className=" flex gap-2">
            <Button type="submit" disabled={createTodoMutation.isPending}>
              {createTodoMutation.isPending ? "Creating..." : "Create Todo"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ToDoForm;
