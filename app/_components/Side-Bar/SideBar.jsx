'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
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
  MdSettingsApplications,
  MdExpandMore,
  MdExpandLess,
} from 'react-icons/md';

const menuItems = [
  { title: 'Dashboard', path: '/dashboard', icon: <MdDashboard className="w-5 h-5" />, subItems: [] },
  {
    title: 'Home',
    icon: <MdHome className="w-5 h-5" />,
    subItems: [
      { title: 'Contact Us', path: '/dashboard/home/contactUs', icon: <MdContactMail className="w-4 h-4" /> },
      { title: 'Course', path: '/dashboard/home/course', icon: <MdSchool className="w-4 h-4" /> },
      { title: 'Delight The Senses', path: '/dashboard/home/delightTheSenses', icon: <MdStar className="w-4 h-4" /> },
      { title: 'Discover', path: '/dashboard/home/discover', icon: <MdExplore className="w-4 h-4" /> },
      { title: 'Hero Section', path: '/dashboard/home/heroSection', icon: <MdWeb className="w-4 h-4" /> },
      { title: 'Leave Us Review', path: '/dashboard/home/leaveUsReview', icon: <MdComment className="w-4 h-4" /> },
      { title: 'Live Flamenco Shows', path: '/dashboard/home/liveFlamencoShows', icon: <MdEvent className="w-4 h-4" /> },
      { title: 'Our Guests', path: '/dashboard/home/ourGuests', icon: <MdPeople className="w-4 h-4" /> },
      { title: 'Paella Cooking Class', path: '/dashboard/home/paellaCookingClass', icon: <MdRestaurant className="w-4 h-4" /> },
      { title: 'Ranked', path: '/dashboard/home/ranked', icon: <MdEmojiEvents className="w-4 h-4" /> },
      { title: 'Summer Sale', path: '/dashboard/home/summerSale', icon: <MdLocalOffer className="w-4 h-4" /> },
      { title: 'Testimonial', path: '/dashboard/home/testimonial', icon: <MdFeedback className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Our Classes',
    icon: <MdFolder className="w-5 h-5" />,
    subItems: [
      { title: 'Banner', path: '/dashboard/ourClasses/Banner', icon: <MdImage className="w-4 h-4" /> },
      { title: 'Courses', path: '/dashboard/ourClasses/courses', icon: <MdBook className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Our Story',
    icon: <MdFolder className="w-5 h-5" />,
    subItems: [
      { title: 'About Us', path: '/dashboard/Our-Story/About-us', icon: <MdInfo className="w-4 h-4" /> },
      { title: 'Discover', path: '/dashboard/Our-Story/Discover', icon: <MdExplore className="w-4 h-4" /> },
      { title: 'Discover Our Feature', path: '/dashboard/Our-Story/Discover-our-feature', icon: <MdStar className="w-4 h-4" /> },
      { title: 'Our Team', path: '/dashboard/Our-Story/Our-Team', icon: <MdSpaceDashboard className="w-4 h-4" /> },
      { title: 'Process', path: '/dashboard/Our-Story/Process', icon: <MdSettingsApplications className="w-4 h-4" /> },
      { title: 'TripAdvisor', path: '/dashboard/Our-Story/TripAdvisor', icon: <MdFeedback className="w-4 h-4" /> },
      { title: 'Why Choose', path: '/dashboard/Our-Story/Why-Choose', icon: <MdTrendingUp className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Partnership',
    icon: <MdFolder className="w-5 h-5" />,
    subItems: [
      { title: 'Banner', path: '/dashboard/partnership/Banner', icon: <MdImage className="w-4 h-4" /> },
      { title: 'Tailored', path: '/dashboard/partnership/Tailored', icon: <MdWeb className="w-4 h-4" /> },
      { title: 'Benefits', path: '/dashboard/partnership/Benifits', icon: <MdImage className="w-4 h-4" /> },
      { title: 'Query', path: '/dashboard/partnership/Query', icon: <MdWeb className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Blog',
    path: '/dashboard/blog',
    icon: <MdArticle className="w-5 h-5" />,
    subItems: [
      { title: 'Banner', path: '/dashboard/Blog/Banner', icon: <MdImage className="w-4 h-4" /> },
      { title: 'Cards', path: '/dashboard/Blog/cards', icon: <MdImage className="w-4 h-4" /> },
    ],
  },
  {
    title: 'FAQ',
    path: '/dashboard/faq',
    icon: <MdHelp className="w-5 h-5" />,
    subItems: [
      { title: 'Faq', path: '/dashboard/Faq/Faq', icon: <MdImage className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <MdOutlineSettings className="w-5 h-5" />,
    subItems: [
      { title: 'Profile', path: '/dashboard/Profile/Profile', icon: <MdPeople className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Shared',
    path: '/reports',
    icon: <MdOutlineAnalytics className="w-5 h-5" />,
    subItems: [
      { title: 'Navbar', path: '/dashboard/shared/Navbar', icon: <MdTrendingUp className="w-4 h-4" /> },
      { title: 'Footer', path: '/dashboard/shared/Footer', icon: <MdBook className="w-4 h-4" /> },
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

    <aside
      className="w-64 bg-zinc-900 border-r border-yellow-400/20 p-6 hidden md:block h-screen fixed top-0 left-0 overflow-y-auto"
      style={{
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE and Edge
      }}
    >
      <style jsx>{`
        aside::-webkit-scrollbar {
          display: none; // Chrome, Safari, and Opera
        }
      `}</style>
      <div className="mb-8  top-0 bg-zinc-900 z-10">
        <Link href="/dashboard">
          <Image
            src="/logo.avif"
            alt="Brand Logo"
            width={110}
            height={40}
            className="object-contain"
            priority
          />
        </Link>
      </div>
  

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
                  className={`flex items-center gap-3 text-white hover:text-yellow-400 cursor-pointer transition-colors duration-200 ${
                    isActive ? 'text-yellow-400' : ''
                  }`}
                >
                  {item.icon}
                  <span className="text-base font-medium">{item.title}</span>
                  <span className="ml-auto">
                    {isExpanded ? (
                      <MdExpandLess className="w-5 h-5" />
                    ) : (
                      <MdExpandMore className="w-5 h-5" />
                    )}
                  </span>
                </div>
              ) : (
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 text-white hover:text-yellow-400 cursor-pointer transition-colors duration-200 ${
                    isActive ? 'text-yellow-400' : ''
                  }`}
                  onClick={() => {
                    setActiveIdx(index);
                    setExpanded({});
                    setActiveSubIdx(null);
                  }}
                >
                  {item.icon}
                  <span className="text-base font-medium">{item.title}</span>
                </Link>
              )}
              {hasSubItems && isExpanded && (
                <ul className="ml-8 mt-2 space-y-2">
                  {item.subItems.map((subItem, subIdx) => (
                    <li key={subItem.title}>
                      <Link
                        href={subItem.path}
                        className={`flex items-center gap-2 text-sm text-white hover:text-yellow-400 transition-colors duration-200 ${
                          activeSubIdx === `${index}-${subIdx}` || pathname === subItem.path
                            ? 'text-yellow-400'
                            : ''
                        }`}
                        onClick={() => setActiveSubIdx(`${index}-${subIdx}`)}
                      >
                        {subItem.icon}
                        <span className="font-normal">{subItem.title}</span>
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