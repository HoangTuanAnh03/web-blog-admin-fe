// UsersFilter.tsx
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface UsersFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function UsersFilter({ searchTerm, onSearchChange }: UsersFilterProps) {
  return (
    <div className="relative max-w-md w-full mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        placeholder="Tìm kiếm người dùng..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
