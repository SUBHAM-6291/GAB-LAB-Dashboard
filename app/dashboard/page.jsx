'use client';

import { usePathname } from 'next/navigation';
import SideBar from '../_components/Side-Bar/SideBar';

export default function SidebarWrapper() {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  return <SideBar />;
}