"use client";

import { Binoculars, ChartNetwork, ShieldCheck } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Monitoring",
    icon: <Binoculars />,
    disabled: false,
    path: "/dashboard/monitoring",
  },
  {
    title: "Incidents",
    icon: <ShieldCheck />,
    disabled: false,
    path: "/dashboard/incidents",
  },
  {
    title: "Status Pages",
    icon: <ChartNetwork />,
    disabled: true,
    path: "/dashboard/status-pages",
  },
];

export function NavMain() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              tooltip={item.title}
              className="cursor-pointer"
              disabled={item.disabled}
              onClick={() => !item.disabled && router.push(item.path)}
              isActive={pathname === item.path}
            >
              {item.icon}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
