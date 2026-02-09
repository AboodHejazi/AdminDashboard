"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

type Props = {
  searchValue: string;
  onSearchChange: (val: string) => void;
  filterOptions: { label: string; value: string }[];
  onFilterChange: (val: string) => void;
  addLabel: string;
  onAddClick: () => void;
};

export const CustomerToolbar = ({ searchValue, onSearchChange, filterOptions, onFilterChange, addLabel, onAddClick }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
      <div className="flex gap-2 flex-1">
        <Input
          placeholder="Search by name or email"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Select defaultValue={filterOptions[0].value} onValueChange={onFilterChange}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.map(opt => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={onAddClick}>{addLabel}</Button>
    </div>
  );
};
