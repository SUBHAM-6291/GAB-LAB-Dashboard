"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
  MdMenu,
  MdClose,
  MdGroup, // Added for Private Group
  MdClass, // Added for Our Classes
  MdHistory, // Added for Our Story
  MdHandshake, // Added for Partnership
} from "react-icons/md";

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard className="w-5 h-5" />,
    subItems: [],
  },
{
  title: "Home",
  icon: <MdHome className="w-5 h-5" />,
  subItems: [
    {
      title: "HeroSection",
      path: "/dashboard/home/heroSection",
      icon: <MdWeb className="w-4 h-4" />,
    },
    {
      title: "Ranked",
      path: "/dashboard/home/ranked",
      icon: <MdEmojiEvents className="w-4 h-4" />,
    },
    {
      title: "LiveFlamencoShows",
      path: "/dashboard/home/liveFlamencoShows",
      icon: <MdEvent className="w-4 h-4" />,
    },
    {
      title: "PaellaCookingClass",
      path: "/dashboard/home/paellaCookingClass",
      icon: <MdRestaurant className="w-4 h-4" />,
    },
    {
      title: "Course",
      path: "/dashboard/home/course",
      icon: <MdSchool className="w-4 h-4" />,
    },
    {
      title: "Discover",
      path: "/dashboard/home/discover",
      icon: <MdExplore className="w-4 h-4" />,
    },
    {
      title: "LeaveUsReview",
      path: "/dashboard/home/leaveUsReview",
      icon: <MdComment className="w-4 h-4" />,
    },
    {
      title: "Testimonial",
      path: "/dashboard/home/testimonial",
      icon: <MdFeedback className="w-4 h-4" />,
    },
    {
      title: "DelightTheSenses",
      path: "/dashboard/home/delightTheSenses",
      icon: <MdStar className="w-4 h-4" />,
    },
    {
      title: "ContactUs",
      path: "/dashboard/home/contactUs",
      icon: <MdContactMail className="w-4 h-4" />,
    },
 
  ],
}
,  {
    title: "OurClasses",
    icon: <MdClass className="w-5 h-5" />, // Updated icon
    subItems: [
      {
        title: "Banner",
        path: "/dashboard/ourClasses/Banner",
        icon: <MdImage className="w-4 h-4" />,
      },
      {
        title: "Courses",
        path: "/dashboard/ourClasses/courses",
        icon: <MdBook className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "PrivateGroup",
    icon: <MdGroup className="w-5 h-5" />, // Updated icon
    subItems: [
      {
        title: "Banner",
        path: "/dashboard/Private_Group/Banner",
        icon: <MdImage className="w-4 h-4" />, // Changed to MdImage for better context
      },
      {
        title: "PrivateGroup",
        path: "/dashboard/Private_Group/Private_Group",
        icon: <MdGroup className="w-4 h-4" />, // Changed to MdGroup
      },
      {
        title: "PrivateClass",
        path: "/dashboard/Private_Group/Private_Class",
        icon: <MdClass className="w-4 h-4" />, // Changed to MdClass
      },
      {
        title: "TellUsMoreHere",
        path: "/dashboard/Private_Group/Tell_Us_More_Here",
        icon: <MdComment className="w-4 h-4" />, // Changed to MdComment
      },
    ],
  },

 {
  title: "OurStory",
  icon: <MdHistory className="w-5 h-5" />,
  subItems: [
    {
      title: "Banner",
      path: "/dashboard/Our-Story/Banner",
      icon: <MdEvent className="w-4 h-4" />,
    },
    {
      title: "TripAdvisor",
      path: "/dashboard/Our-Story/TripAdvisor",
      icon: <MdFeedback className="w-4 h-4" />,
    },
    {
      title: "DiscoverOurFeature",
      path: "/dashboard/Our-Story/Discover-our-feature",
      icon: <MdStar className="w-4 h-4" />,
    },
    {
      title: "AboutUs",
      path: "/dashboard/Our-Story/About-us",
      icon: <MdInfo className="w-4 h-4" />,
    },
    {
      title: "Discover",
      path: "/dashboard/Our-Story/Discover",
      icon: <MdExplore className="w-4 h-4" />,
    },
    {
      title: "Process",
      path: "/dashboard/Our-Story/Process",
      icon: <MdSettingsApplications className="w-4 h-4" />,
    },
    {
      title: "OurTeam",
      path: "/dashboard/Our-Story/Our-Team",
      icon: <MdPeople className="w-4 h-4" />,
    },
    {
      title: "WhyChoose",
      path: "/dashboard/Our-Story/Why-Choose",
      icon: <MdTrendingUp className="w-4 h-4" />,
    },
  ],
}
,
  {
    title: "Partnership",
    icon: <MdHandshake className="w-5 h-5" />, // Updated icon
    subItems: [
      
      {
        title: "Banner",
        path: "/dashboard/partnership/Banner",
        icon: <MdImage className="w-4 h-4" />,
      },
      {
        title: "Collaborate",
        path: "/dashboard/partnership/Collaborate",
        icon: <MdWeb className="w-4 h-4" />,
      },
      {
        title: "Benefits",
        path: "/dashboard/partnership/Benifits",
        icon: <MdStar className="w-4 h-4" />, // Changed to MdStar
      },
      {
        title: "Query",
        path: "/dashboard/partnership/Query",
        icon: <MdHelp className="w-4 h-4" />, // Changed to MdHelp
      },
    ],
  },
  {
    title: "Blog",
    path: "/dashboard/blog",
    icon: <MdArticle className="w-5 h-5" />,
    subItems: [
      {
        title: "Banner",
        path: "/dashboard/Blog/Banner",
        icon: <MdImage className="w-4 h-4" />,
      },
      {
        title: "Cards",
        path: "/dashboard/Blog/cards",
        icon: <MdArticle className="w-4 h-4" />, // Changed to MdArticle
      },
    ],
  },
  {
    title: "Faq",
    path: "/dashboard/faq",
    icon: <MdHelp className="w-5 h-5" />,
    subItems: [
      {
        title: "Faq",
        path: "/dashboard/Faq/Faq",
        icon: <MdHelp className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Utilities",
    icon: <MdSettingsApplications className="w-5 h-5" />,
    subItems: [
      {
        title: "CookingCourses",
        path: "/dashboard/Utilites/Cooking-Courses",
        icon: <MdRestaurant className="w-4 h-4" />, // Changed to MdRestaurant
      },
      {
        title: "Blog",
        path: "/dashboard/Utilites/blog",
        icon: <MdArticle className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <MdOutlineSettings className="w-5 h-5" />,
    subItems: [
      {
        title: "Profile",
        path: "/dashboard/Profile/Profile",
        icon: <MdPeople className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Shared",
    path: "/reports",
    icon: <MdOutlineAnalytics className="w-5 h-5" />,
    subItems: [
      {
        title: "Navbar",
        path: "/dashboard/shared/Navbar",
        icon: <MdWeb className="w-4 h-4" />, // Changed to MdWeb
      },
      {
        title: "Footer",
        path: "/dashboard/shared/Footer",
        icon: <MdWeb className="w-4 h-4" />, // Changed to MdWeb
      },
    ],
  },
];

const SideBar = ({ topbarText = "Dashboard" }) => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState({});
  const [activeIdx, setActiveIdx] = useState(null);
  const [activeSubIdx, setActiveSubIdx] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(topbarText);

  useEffect(() => {
    let sectionTitle = topbarText;
    let newActiveIdx = null;
    let newActiveSubIdx = null;

    for (let i = 0; i < menuItems.length; i++) {
      const item = menuItems[i];
      if (item.path && pathname === item.path) {
        sectionTitle = item.title;
        newActiveIdx = i;
        break;
      } else if (item.subItems.length > 0) {
        const subIdx = item.subItems.findIndex(
          (subItem) => pathname === subItem.path
        );
        if (subIdx !== -1) {
          sectionTitle = item.subItems[subIdx].title;
          newActiveIdx = i;
          newActiveSubIdx = `${i}-${subIdx}`;
          break;
        } else if (
          item.subItems.some((subItem) => pathname.startsWith(subItem.path))
        ) {
          sectionTitle = item.title;
          newActiveIdx = i;
        }
      }
    }

    setActiveIdx(newActiveIdx);
    setActiveSubIdx(newActiveSubIdx);
    setCurrentSection(sectionTitle);

    const initialExpanded = {};
    menuItems.forEach((item) => {
      if (
        item.subItems.length > 0 &&
        (item.path === pathname ||
          item.subItems.some((subItem) => pathname.startsWith(subItem.path)))
      ) {
        initialExpanded[item.title] = true;
      }
    });
    setExpanded(initialExpanded);
  }, [pathname, topbarText]);

  const toggleSubMenu = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [menuItems[index].title]: !prev[menuItems[index].title],
    }));
    setActiveIdx(index);
    setActiveSubIdx(null);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex items-center justify-between w-full md:w-[calc(100%-16rem)] h-[60px] px-4 md:px-6 bg-zinc-900 text-white fixed top-0 md:left-64 right-0 z-10 shadow-sm">
        <h1 className="font-semibold text-xl md:text-2xl">{currentSection}</h1>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/Profile/Profile">
            <MdPeople
              className="w-[28px] md:w-[30px] h-auto text-gray-300 rounded-full p-1"
              aria-label="Profile"
            />
          </Link>
          <button
            onClick={toggleSidebar}
            className="md:hidden w-[28px] md:w-[30px] h-auto text-gray-300 hover:text-yellow-400 hover:shadow-[0_0_8px_rgba(234,179,8,0.5)] transition-colors duration-200 rounded-full p-1"
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>
      </div>

      <aside
        className={`w-64 bg-zinc-900 border-r border-yellow-400/20 p-6 h-screen fixed top-0 left-0 overflow-y-auto transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block z-20`}
      >
        <style jsx>{`
          aside::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <div className="mb-8 pt-2 sm:pt-16 md:pt-0 top-0 bg-zinc-900 z-10">
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
              (item.path && pathname === item.path) ||
              item.subItems.some((subItem) =>
                pathname.startsWith(subItem.path)
              );
            const isExpanded = expanded[item.title];
            const hasSubItems = item.subItems && item.subItems.length > 0;

            return (
              <li key={item.title}>
                {hasSubItems || !item.path ? (
                  <div
                    onClick={() => toggleSubMenu(index)}
                    className={`flex items-center gap-3 text-white hover:text-yellow-400 cursor-pointer transition-colors duration-200 ${
                      isActive ? "text-yellow-400" : ""
                    }`}
                    aria-expanded={isExpanded}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && toggleSubMenu(index)}
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
                      isActive ? "text-yellow-400" : ""
                    }`}
                    onClick={() => {
                      setActiveIdx(index);
                      setExpanded({});
                      setActiveSubIdx(null);
                      setIsOpen(false);
                    }}
                    aria-current={pathname === item.path ? "page" : undefined}
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
                            activeSubIdx === `${index}-${subIdx}` ||
                            pathname === subItem.path
                              ? "text-yellow-400"
                              : ""
                          }`}
                          onClick={() => {
                            setActiveSubIdx(`${index}-${subIdx}`);
                            setIsOpen(false);
                          }}
                          aria-current={
                            pathname === subItem.path ? "page" : undefined
                          }
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

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SideBar;