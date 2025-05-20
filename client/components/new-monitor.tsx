"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export default function NewMonitor() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="cursor-pointer">
          <PlusIcon />
          New Monitor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new monitor</DialogTitle>
          <DialogDescription>
            Monitoring will start immediately after a new monitor is created,
            check monitor details page for more info.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="url" className="text-right">
              Site URL
            </Label>
            <Input id="url" placeholder="https://example.com" />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="interval" className="text-right">
              Ping Interval (in minutes)
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an interval" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => setIsOpen(false)}
            className="cursor-pointer"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
