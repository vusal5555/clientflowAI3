"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trash2, User } from "lucide-react";
import TodoDialog from "../todo/TodoDialog";
import EditTodoDialog from "../todo/EditTodoDialog";

export interface TodoItem {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "done";
  assignedTo?: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

export interface TodoListProps {
  initialTodos?: TodoItem[];
  onTodoChange?: (todos: TodoItem[]) => void;
  className?: string;
  projectId: number;
}

const TodoList: React.FC<TodoListProps> = ({
  initialTodos = [],
  className,
  projectId,
}) => {
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`/api/todos`, {
        cache: "no-store",
      });
      if (response.ok) {
        const todosData = await response.json();
        setTodos(todosData);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the todo from local state immediately
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => Number(todo.id) !== id)
        );

        fetchTodos();
      } else {
        console.error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <Card
      className={`bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
          To-Do List
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Add new todo */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <TodoDialog projectId={projectId} fetchTodos={fetchTodos} />
          </div>
        </div>

        {/* Todo list */}

        <Suspense fallback={<div>Loading...</div>}>
          <div className="space-y-2">
            {todos.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
                No tasks yet. Add your first task above!
              </p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                    todo.status === "done"
                      ? "bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600"
                      : "bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm ${
                        todo.status === "done"
                          ? "line-through text-slate-500 dark:text-slate-400"
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {todo.title}
                    </p>

                    {todo.assignedTo && (
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={todo.assignedTo.avatar} />
                          <AvatarFallback className="text-xs bg-slate-200 dark:bg-slate-600">
                            <User className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {todo.assignedTo.name}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <EditTodoDialog
                      projectId={projectId}
                      fetchTodos={fetchTodos}
                      id={todo.id}
                    />
                    <Button
                      onClick={() => deleteTodo(Number(todo.id))}
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Suspense>

        {/* Summary */}
        {todos.length > 0 && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-600">
            <span className="text-sm text-slate-600 dark:text-slate-300">
              {todos.filter((t) => t.status === "done").length} of{" "}
              {todos.length} completed
            </span>
            <Badge variant="secondary" className="text-xs">
              {Math.round(
                (todos.filter((t) => t.status === "done").length /
                  todos.length) *
                  100
              )}
              %
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodoList;
