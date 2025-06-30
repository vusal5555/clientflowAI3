"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export interface TodoItem {
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: Date | null;
  assignedTo?: {
    id: string;
    name: string;
    avatar?: string;
  };
  projectId: number;
}

interface TodoDialogProps {
  onTodoCreated?: (todo: TodoItem) => void;
  className?: string;
  projectId: number;
  todos: TodoItem[];
}

const TodoDialog: React.FC<TodoDialogProps> = ({
  onTodoCreated,
  className,
  projectId,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    dueDate: null as Date | null,
    assignedTo: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Mock team members - in a real app, this would come from props or API
  const teamMembers = [
    { id: "1", name: "John Doe", avatar: "" },
    { id: "2", name: "Jane Smith", avatar: "" },
    { id: "3", name: "Mike Johnson", avatar: "" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const todo: TodoItem = {
        projectId: projectId,
        title: formData.title,
        description: formData.description,
        completed: false,
        priority: formData.priority,
        dueDate: formData.dueDate,
        assignedTo: formData.assignedTo
          ? teamMembers.find((m) => m.id === formData.assignedTo)
          : undefined,
      };

      // In a real app, you would send this to your API
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...todo,
          dueDate: formData.dueDate ? formData.dueDate.toISOString() : null,
        }),
      });

      if (response.ok) {
        // Reset form
        setFormData({
          title: "",
          description: "",
          priority: "medium",
          dueDate: null,
          assignedTo: "",
        });
        setOpen(false);

        // Call the callback if provided
        if (onTodoCreated) {
          onTodoCreated(todo);
        }
        router.refresh();
      } else {
        console.error("Failed to create todo");
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0",
            className
          )}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white/80 dark:bg-slate-800/50">
        <DialogHeader>
          <DialogTitle className="text-slate-900 dark:text-white">
            Create New Todo
          </DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-300">
            Add a new task to your todo list. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-slate-700 dark:text-slate-200"
            >
              Task Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter task title"
              required
              className="bg-white/80 dark:bg-slate-800/50 text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-slate-700 dark:text-slate-200"
            >
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter task description (optional)"
              rows={3}
              className="bg-white/80 dark:bg-slate-800/50 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="priority"
                className="text-slate-700 dark:text-slate-200"
              >
                Priority
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value: "low" | "medium" | "high") =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger className="bg-white/80 dark:bg-slate-800/50 text-slate-900 dark:text-white">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-white/80 dark:bg-slate-800/50 text-slate-900 dark:text-white">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* <div className="space-y-2">
              <Label
                htmlFor="assignedTo"
                className="text-slate-700 dark:text-slate-200"
              >
                Assign To
              </Label>
              <Select
                value={formData.assignedTo}
                onValueChange={(value) =>
                  setFormData({ ...formData, assignedTo: value })
                }
              >
                <SelectTrigger className="bg-white/80 dark:bg-slate-800/50 text-slate-900 dark:text-white">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent className="bg-white/80 dark:bg-slate-800/50 text-slate-900 dark:text-white">
                  <SelectItem value="">Unassigned</SelectItem>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="text-xs bg-slate-200 dark:bg-slate-600">
                            <User className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                        {member.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 dark:text-slate-200">
              Due Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white/80 dark:bg-slate-800/50 text-slate-900 dark:text-white",
                    !formData.dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dueDate ? (
                    format(formData.dueDate, "PPP")
                  ) : (
                    <span>Pick a date (optional)</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white/80 dark:bg-slate-800/50 text-slate-900 dark:text-white">
                <Calendar
                  mode="single"
                  selected={formData.dueDate ?? undefined}
                  onSelect={(date) =>
                    setFormData({ ...formData, dueDate: date ?? null })
                  }
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
              className="text-slate-900 dark:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0"
            >
              {isLoading ? "Creating..." : "Create Todo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TodoDialog;
