"use client";

import { LayoutDashboard, Settings } from 'lucide-react';

interface SidebarProps {
  currentPath?: string;
}

export default function Sidebar({ currentPath = '/' }: SidebarProps) {
  const navigation = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
      current: currentPath === '/',
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      current: currentPath === '/settings',
    },
  ];

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900">
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex flex-shrink-0 items-center px-4 py-6">
          <h1 className="text-xl font-semibold text-white">AutoSDR</h1>
        </div>
        <nav className="mt-6 space-y-1 px-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                item.current
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${
                  item.current ? 'text-white' : 'text-slate-400 group-hover:text-white'
                }`}
              />
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}