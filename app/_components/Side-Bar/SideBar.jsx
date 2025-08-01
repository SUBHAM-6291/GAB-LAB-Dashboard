'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  MdDashboard,
  MdOutlineSettings,
  MdOutlineAnalytics,
  MdFolder,
  MdHome,
  MdContactMail,
  MdSchool,
  MdStar,
  MdExplore,
  MdWeb,
  MdComment,
  MdEvent,
  MdPeople,
  MdRestaurant,
  MdEmojiEvents,
  MdLocalOffer,
  MdFeedback,
  MdGroup,
  MdImage,
  MdBook,
  MdInfo,
  MdSpaceDashboard,
  MdTrendingUp,
  MdArticle,
  MdHelp,
  MdSettingsApplications, // Added missing import
} from 'react-icons/md';

const menuItems = [
  { title: 'Dashboard', path: '/dashboard', icon: <MdDashboard />, subItems: [] },
  {
    title: 'Home',
    icon: <MdHome />,
    subItems: [
      { title: 'Contact Us', path: '/dashboard/home/contactUs', icon: <MdContactMail /> },
      { title: 'Course', path: '/dashboard/home/course', icon: <MdSchool /> },
      { title: 'Delight The Senses', path: '/dashboard/home/delightTheSenses', icon: <MdStar /> },
      { title: 'Discover', path: '/dashboard/home/discover', icon: <MdExplore /> },
      { title: 'Hero Section', path: '/dashboard/home/heroSection', icon: <MdWeb /> },
      { title: 'Leave Us Review', path: '/dashboard/home/leaveUsReview', icon: <MdComment /> },
      { title: 'Live Flamenco Shows', path: '/dashboard/home/liveFlamencoShows', icon: <MdEvent /> },
      { title: 'Our Guests', path: '/dashboard/home/ourGuests', icon: <MdPeople /> },
      { title: 'Paella Cooking Class', path: '/dashboard/home/paellaCookingClass', icon: <MdRestaurant /> },
      { title: 'Ranked', path: '/dashboard/home/ranked', icon: <MdEmojiEvents /> },
      { title: 'Summer Sale', path: '/dashboard/home/summerSale', icon: <MdLocalOffer /> },
      { title: 'Testimonial', path: '/dashboard/home/testimonial', icon: <MdFeedback /> },
    ],
  },
  {
    title: 'Our Classes',
    icon: <MdFolder />,
    subItems: [
      { title: 'Private Group', path: '/dashboard/ourclasses/Private_Group', icon: <MdGroup /> },
      { title: 'Banner', path: '/dashboard/ourclasses/Private_Group/Banner', icon: <MdImage /> },
      { title: 'Courses', path: '/dashboard/ourclasses/Private_Group/courses', icon: <MdBook /> },
    ],
  },
  {
    title: 'Our Story',
    icon: <MdFolder />,
    subItems: [
      { title: 'About Us', path: '/dashboard/our-story/About-us', icon: <MdInfo /> },
      { title: 'Discover', path: '/dashboard/our-story/Discover', icon: <MdExplore /> },
      { title: 'Discover Our Feature', path: '/dashboard/our-story/Discover our feuture', icon: <MdStar /> },
      { title: 'Our Team', path: '/dashboard/our-story/Our Team', icon: <MdSpaceDashboard /> },
      { title: 'Process', path: '/dashboard/our-story/Process', icon: <MdSettingsApplications /> }, // Uses the newly imported icon
      { title: 'TripAdvisor', path: '/dashboard/our-story/TripAdvisor', icon: <MdFeedback /> },
      { title: 'Why Choose', path: '/dashboard/our-story/Why Choose', icon: <MdTrendingUp /> },
    ],
  },
  {
    title: 'Partnership',
    icon: <MdFolder />,
    subItems: [
      { title: 'Banner', path: '/dashboard/partnership/Banner', icon: <MdImage /> },
      { title: 'Cards', path: '/dashboard/partnership/Cards', icon: <MdWeb /> },
    ],
  },
  { title: 'Blog', path: '/dashboard/blog', icon: <MdArticle />, subItems: [] },
  { title: 'FAQ', path: '/dashboard/faq', icon: <MdHelp />, subItems: [] },
  {
    title: 'Settings',
    path: '/settings',
    subItems: [
      { title: 'Profile', path: '/settings/profile', icon: <MdPeople /> },
      { title: 'Account', path: '/settings/account' },
      { title: 'Preferences', path: '/settings/preferences' },
    ],
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <MdOutlineAnalytics />,
    subItems: [
      { title: 'Analytics', path: '/reports/analytics', icon: <MdTrendingUp /> },
      { title: 'Sales', path: '/reports/sales', icon: <MdBook /> },
    ],
  },
];

const SideBar = () => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState({});
  const [activeIdx, setActiveIdx] = useState(null);
  const [activeSubIdx, setActiveSubIdx] = useState(null);

  useEffect(() => {
    const newActiveIdx = menuItems.findIndex(
      (item) =>
        pathname === item.path ||
        item.subItems.some((subItem) => pathname.startsWith(subItem.path))
    );
    setActiveIdx(newActiveIdx);

    const newActiveSubIdx = (() => {
      for (let i = 0; i < menuItems.length; i++) {
        const subIdx = menuItems[i].subItems.findIndex((subItem) => pathname === subItem.path);
        if (subIdx !== -1) {
          return `${i}-${subIdx}`;
        }
      }
      return null;
    })();
    setActiveSubIdx(newActiveSubIdx);

    const initialExpanded = {};
    menuItems.forEach((item) => {
      if (
        item.subItems.length > 0 &&
        (pathname === item.path || item.subItems.some((subItem) => pathname.startsWith(subItem.path)))
      ) {
        initialExpanded[item.title] = true;
      }
    });
    setExpanded(initialExpanded);
  }, [pathname]);

  const toggleSubMenu = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [menuItems[index].title]: !prev[menuItems[index].title],
    }));
    setActiveIdx(index);
    setActiveSubIdx(null);
  };

  return (
    <aside className="w-64 bg-black border-r border-yellow-400/20 p-6 hidden md:block h-screen fixed top-0 left-0">
      <h2 className="text-2xl font-bold text-yellow-400 mb-10">Dashboard</h2>
      <ul className="space-y-6">
        {menuItems.map((item, index) => {
          const isActive =
            activeIdx === index ||
            pathname === item.path ||
            item.subItems.some((subItem) => pathname.startsWith(subItem.path));
          const isExpanded = expanded[item.title];
          const hasSubItems = item.subItems && item.subItems.length > 0;

          return (
            <li key={item.title}>
              {hasSubItems ? (
                <div
                  onClick={() => toggleSubMenu(index)}
                  className={`flex items-center gap-3 text-yellow-200 hover:text-yellow-400 cursor-pointer ${
                    isActive ? 'text-yellow-400' : ''
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                  <span
                    className={`ml-auto transform transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </div>
              ) : (
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 text-yellow-200 hover:text-yellow-400 cursor-pointer ${
                    isActive ? 'text-yellow-400' : ''
                  }`}
                  onClick={() => {
                    setActiveIdx(index);
                    setExpanded({});
                    setActiveSubIdx(null);
                  }}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              )}
              {hasSubItems && isExpanded && (
                <ul className="ml-8 mt-2 space-y-2">
                  {item.subItems.map((subItem, subIdx) => (
                    <li key={subItem.title}>
                      <Link
                        href={subItem.path}
                        className={`flex items-center gap-2 text-sm text-yellow-200 hover:text-yellow-400 ${
                          activeSubIdx === `${index}-${subIdx}` || pathname === subItem.path
                            ? 'text-yellow-400'
                            : ''
                        }`}
                        onClick={() => setActiveSubIdx(`${index}-${subIdx}`)}
                      >
                        {subItem.icon}
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SideBar;