"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavUser({}) {
  return (
    <footer className="flex flex-col justify-center gap-2 p-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex gap-2 p-2 itens-center justify-center hover:bg-neutral-800 rounded-md h-[3rem]">
            <Avatar className="h-full w-8 flex justify-center rounded-lg">
              <AvatarImage src="" alt="" />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex flex-col justify-center text-left text-sm leading-tight">
              <span className="truncate font-semibold">kaua</span>
              <span className="truncate text-xs">email@gmail.com</span>
            </div>
            <div className="flex items-center justify-center">
              <ChevronsUpDown className="ml-auto size-4 " />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] text-white bg-[#09090b] border-[#333336] min-w-60 rounded-lg"
          align="center"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal border-[#19191c]">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="" alt="" />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">kaua</span>
                <span className="truncate text-xs">email@gmail.com</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Sparkles />
              Upgrade to Pro
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator  />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgeCheck />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </footer>
  );
}
