"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, User } from "lucide-react";

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  assignedTo?: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

export interface TodoListProps {
  initialTodos?: TodoItem[];
  teamMembers?: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  onTodoChange?: (todos: TodoItem[]) => void;
  className?: string;
}

const TodoList: React.FC<TodoListProps> = ({
  initialTodos = [],
  teamMembers = [
    { id: "1", name: "John Doe", avatar: "" },
    { id: "2", name: "Jane Smith", avatar: "" },
    { id: "3", name: "Mike Johnson", avatar: "" },
  ],
  onTodoChange,
  className,
}) => {
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);
  const [newTodo, setNewTodo] = useState("");
  const [selectedMember, setSelectedMember] = useState<string>("");

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: TodoItem = {
        id: Date.now().toString(),
        title: newTodo.trim(),
        completed: false,
        assignedTo: selectedMember
          ? teamMembers.find((m) => m.id === selectedMember)
          : undefined,
        createdAt: new Date().toISOString(),
      };

      const updatedTodos = [...todos, todo];
      setTodos(updatedTodos);
      setNewTodo("");
      setSelectedMember("");

      if (onTodoChange) {
        onTodoChange(updatedTodos);
      }
    }
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    if (onTodoChange) {
      onTodoChange(updatedTodos);
    }
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);

    if (onTodoChange) {
      onTodoChange(updatedTodos);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
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
            <Input
              value={newTodo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewTodo(e.target.value)
              }
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className="flex-1 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white"
            />
            <Button
              onClick={addTodo}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <select
            value={selectedMember}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedMember(e.target.value)
            }
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
          >
            <option value="">Assign to team member (optional)</option>
            {teamMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        {/* Todo list */}
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
                  todo.completed
                    ? "bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600"
                    : "bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                }`}
              >
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm ${
                      todo.completed
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

                <Button
                  onClick={() => deleteTodo(todo.id)}
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {todos.length > 0 && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-600">
            <span className="text-sm text-slate-600 dark:text-slate-300">
              {todos.filter((t) => t.completed).length} of {todos.length}{" "}
              completed
            </span>
            <Badge variant="secondary" className="text-xs">
              {Math.round(
                (todos.filter((t) => t.completed).length / todos.length) * 100
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
