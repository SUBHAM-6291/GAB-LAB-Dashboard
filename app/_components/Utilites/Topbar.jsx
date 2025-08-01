"use client";
import { useState } from "react";
import Link from "next/link";
import {
  MdDashboard,
  MdOutlineContactPage,
  MdWork,
  MdMiscellaneousServices,
} from "react-icons/md";
import { FaHouse, FaShare, FaUser, FaBarsStaggered } from "react-icons/fa6";
import { IoIosContacts } from "react-icons/io";

const menuItems = [
  { label: "Dashboard", icon: <MdDashboard />, path: "/dashboard" },
  {
    label: "Home page",
    icon: <FaHouse />,
    children: [
      { label: "Banner", path: "/dashboard/home/banner" },
      { label: "About Us", path: "/dashboard/home/about-us" },
      { label: "So Why Us", path: "/dashboard/home/sowhyus" },
      { label: "Our Work", path: "/dashboard/home/our-work" },
      { label: "What We Can Do", path: "/dashboard/home/what-we-can-do" },
      { label: "Our Clients", path: "/dashboard/home/our-clients" },
      {
        label: "People are talking",
        path: "/dashboard/home/people-are-talking",
      },
      { label: "Risk-Free Pilot Run", path: "/dashboard/home/risk-free" },
      { label: "Engagement Models", path: "/dashboard/home/engagemnet-model" },
      { label: "Work & Collaborate", path: "/dashboard/home/work-collaborate" },
      { label: "FAQ", path: "/dashboard/home/faq" },
      {
        label: "Let's Get Started Now!",
        path: "/dashboard/home/lets-get-started-now",
      },
    ],
  },
  {
    label: "About Us",
    icon: <MdOutlineContactPage />,
    children: [
      { label: "Banner", path: "/dashboard/about-us/banner" },
      {
        label: "Crafting Digital",
        path: "/dashboard/about-us/crafting-digital",
      },
      { label: "Our Legacy", path: "/dashboard/about-us/our-legacy" },
    ],
  },
  {
    label: "Service",
    icon: <MdMiscellaneousServices />,
    children: [
      { label: "Banner", path: "/dashboard/services/banner" },
      {
        label: "TopNotchService",
        path: "/dashboard/services/top-noth-service",
      },
      { label: "WorkProcess", path: "/dashboard/services/work-prcess" },
    ],
  },
  {
    label: "Our Work",
    icon: <MdWork />,
    children: [
      { label: "Banner", path: "/dashboard/our-work/banner" },
      { label: "Our Recent Work", path: "/dashboard/our-work/recent-work" },
    ],
  },
  {
    label: "Contact Us",
    icon: <IoIosContacts />,
    children: [
      { label: "Banner", path: "/dashboard/contact-us/banner" },
      { label: "Get in Touch", path: "/dashboard/contact-us/get-in-touch" },
    ],
  },
  {
    label: "Shared",
    icon: <FaShare />,
    children: [
      { label: "Nav bar", path: "/dashboard/shared/nav-bar" },
      { label: "Footer", path: "/dashboard/shared/footer" },
    ],
  },
];

const Topbar = ({ topbarText }) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleSubMenu = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full lg:w-[85vw] h-[60px] px-2 md:px-6 bg-black text-white fixed top-0 right-0 -z-0 overflow-hidden">
        <h1 className="font-bold text-xl md:text-2xl">{topbarText}</h1>

        <div className="flex items-center gap-4 text-2xl">
          <Link href="/dashboard/admin">
            <FaUser className="w-[28px] md:w-[32px] h-auto cursor-pointer hover:shadow-[0_0_12px_rgba(255,255,255,0.6)] hover:scale-110 transition duration-300 rounded-full p-1" />
          </Link>
          <FaBarsStaggered
            onClick={() => setOpen(!open)}
            className="lg:hidden w-[28px] md:w-[32px] h-auto  cursor-pointer hover:shadow-[0_0_12px_rgba(255,255,255,0.6)] hover:scale-110 transition duration-300 rounded-full p-1"
          />
        </div>
      </div>

      {/* Slide-In Mobile Nav */}
      <div
        className={`fixed top-[60px] left-0 w-full md:w-[40%] bg-gradient-to-b from-[#11182d] to-[#1e293b] shadow-xl z-40 p-4 h-[calc(100vh-60px)] overflow-auto transform transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleSubMenu(index)}
                    className="w-full flex items-center justify-between px-2 text-left text-white text-[18px] rounded hover:bg-[#1f2937] transition"
                  >
                    <span className="flex items-center gap-3">
                      {item.icon} {item.label}
                    </span>
                    <span className="text-[30px]">
                      {activeIndex === index ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: activeIndex === index ? "700px" : "0px",
                      opacity: activeIndex === index ? 1 : 0,
                      overflow: "hidden",                      
                      transition: "all 300ms ease-in-out",
                    }}
                  >
                    <ul className="ml-4 mt-2 space-y-1">
                      {item.children.map((child, idx) => (
                        <li key={idx}>
                          <Link
                            href={child.path}
                            className="block p-2 rounded text-[18px] text-gray-400 hover:text-white transition"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.path}
                  className="w-full flex items-center gap-3 p-2 text-white text-[18px] rounded hover:bg-[#1f2937] transition"
                >
                  {item.icon} {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Topbar;