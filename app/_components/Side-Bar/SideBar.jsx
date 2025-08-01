'use client'

import React, { useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  MdDashboard,
  MdOutlineSettings,
  MdOutlineAnalytics,
  MdFolder,
} from 'react-icons/md';

const menuItems = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <MdDashboard />,
    subItems: [],
  },
  {
    title: 'Private Group',
    icon: <MdFolder />,
    subItems: [
      { title: 'Banner', path: '/dashboard/Private_Group/Banner' },
      { title: 'Private Group', path: '/dashboard/Private_Group/Private_Group' },
      { title: 'Private Class', path: '/dashboard/Private_Group/Private_Class' },
      { title: 'Tell Us More', path: '/dashboard/Private_Group/Tell_Us_More_Here' },
    ],
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <MdOutlineSettings />,
    subItems: [
      { title: 'Profile', path: '/settings/profile' },
      { title: 'Account', path: '/settings/account' },
      { title: 'Preferences', path: '/settings/preferences' },
    ],
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <MdOutlineAnalytics />,
    subItems: [
      { title: 'Analytics', path: '/reports/analytics' },
      { title: 'Sales', path: '/reports/sales' },
    ],
  },
];

const SideBar = () => {
  const [expanded, setExpanded] = useState({});
  const [activeIdx, setActiveIdx] = useState(null);
  const [activeSubIdx, setActiveSubIdx] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(
    'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg'
  );

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  const toggleSubMenu = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [menuItems[index].title]: !prev[menuItems[index].title],
    }));
    setActiveIdx(index);
    setActiveSubIdx(null);
  };

  return (
    <aside className="fixed top-0 left-0 lg:w-[20vw] xl:w-[15vw] h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white p-4 shadow-xl border-r border-blue-800/20 z-50">
      <div className="absolute -top-16 -left-20 w-60 h-60 rounded-full bg-blue-500/20 blur-[100px] animate-pulse z-0" />
      <div className="absolute -bottom-16 -right-20 w-60 h-60 rounded-full bg-blue-500/20 blur-[100px] animate-pulse z-0" />

      <div className="flex flex-col h-full">
        <div className="p-4">
          <div className="flex flex-col items-center bg-white/5 p-4 rounded-xl backdrop-blur-md border border-white/10 shadow-md mb-4">
            <img
              src={profileImage}
              alt="User Avatar"
              className="w-20 h-20 rounded-full ring-2 ring-blue-500 object-cover mb-3 hover:scale-105 transition duration-300"
              onClick={() => fileInputRef.current?.click()}
            />
            <h2 className="text-lg font-semibold">Ed Roh</h2>
            <p className="text-sm text-gray-400">VP Fancy Admin</p>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-hidden hover:overflow-y-auto px-4 pb-4 scrollbar-hide">
          <nav className="flex flex-col gap-2">
            {menuItems.map((item, index) => {
              const isActive = activeIdx === index || pathname === item.path;
              const isExpanded = expanded[item.title];
              const hasSubItems = item.subItems && item.subItems.length > 0;

              return (
                <div key={item.title}>
                  {hasSubItems ? (
                    <div
                      onClick={() => toggleSubMenu(index)}
                      className={`flex items-center cursor-pointer rounded-lg px-3 py-2 transition-all group ${
                        isActive ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-white/70'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="ml-3 text-sm font-medium">{item.title}</span>
                      <span
                        className={`ml-auto text-xs transform transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      >
                        ▼
                      </span>
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      onClick={() => {
                        setActiveIdx(index);
                        setExpanded({});
                        setActiveSubIdx(null);
                      }}
                      className={`flex items-center rounded-lg px-3 py-2 transition-all ${
                        isActive ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-white/70'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="ml-3 text-sm font-medium">{item.title}</span>
                    </Link>
                  )}

                  {hasSubItems && isExpanded && (
                    <div className="ml-8 mt-1 flex flex-col gap-2">
                      {item.subItems.map((subItem, subIdx) => (
                        <Link
                          href={subItem.path}
                          key={subItem.title}
                          onClick={() => setActiveSubIdx(`${index}-${subIdx}`)}
                          className={`text-sm px-2 py-1 rounded-md transition ${
                            activeSubIdx === `${index}-${subIdx}` || pathname === subItem.path
                              ? 'bg-white/10 text-white'
                              : 'text-white/60 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;