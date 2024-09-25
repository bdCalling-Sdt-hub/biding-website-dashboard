import React, { useEffect, useRef, useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { LiaCubeSolid, LiaUserCogSolid } from 'react-icons/lia';
import { MdOutlineCategory, MdOutlineDashboard, MdOutlineTrendingUp } from 'react-icons/md';
import { RiAuctionLine } from 'react-icons/ri';
import { NavLink, useLocation } from 'react-router-dom';

const SideBar = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const contentRefs = useRef([]);
    const { pathname } = useLocation();


    const links = [
        {
          path: '/',
          label: 'Dashboard',
          icon: <MdOutlineDashboard size={25} />,
          sub_menu: false
        },
        {
          path: '/autction-managment',
          label: 'Auction Managment',
          icon: <RiAuctionLine size={25} />,
          sub_menu: false
        },
        {
          path: '/order-managment',
          label: 'Order Managment ',
          icon: <LiaCubeSolid size={25} />,
          sub_menu: false
        },
        {
          path: '/user-managment',
          label: 'User Management',
          icon: <FaRegUserCircle size={25} />,
          sub_menu: false
        },
        {
          path: '/transaction',
          label: 'Transaction',
          icon: <MdOutlineTrendingUp size={25} />,
          sub_menu: false
        },
        {
          path: '/category-banner',
          label: 'Category & Banner',
          icon: <MdOutlineCategory size={25} />, 
          sub_menu: false
        },
    
        {
          path: '#',
          label: 'Setting',
          icon: <IoSettingsOutline size={25} />,
          sub_menu: [
            {
              path: '/profile',
              label: 'Profile',
              icon: <></>,
            },
            {
              path: '/about-us',
              label: 'About Us',
              icon: <></>,
            },
            {
              path: '/tips-tricks',
              label: 'Tips & tricks',
              icon: <></>,
            },
            {
              path: '/accessibility',
              label: 'Accessibility',
              icon: <></>,
            },
            
            {
              path: '/terms-condition',
              label: 'Terms & Condition',
              icon: <></>,
            },
            {
              path: '/privacy-policy',
              label: 'Privacy Policy',
              icon: <></>,
            },
            {
              path: '/faqs',
              label: 'FAQ',
              icon: <></>,
            },
    
          ]
        },
      ]

      const toggleAccordion = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
      };

      
  useEffect(() => {
    if (openIndex !== null && contentRefs.current[openIndex]) {
      contentRefs.current[openIndex].style.maxHeight = `${contentRefs.current[openIndex].scrollHeight}px`;
    }
    contentRefs.current.forEach((ref, index) => {
      if (ref && index !== openIndex) {
        ref.style.maxHeight = '0px';
      }
    });
  }, [openIndex]);



    return (
        <div id='sidebar' className='flex flex-col gap-5  mt-[30px]'>
      {/* <img src={img} className='w-[150px] mb-[40px] mx-auto' alt="" /> */}
      <h1 className='text-center font-medium text-[24px] text-yellow'>Bidding Web</h1>
    {
      links?.map((item, index) => {
        const isActive = item.path === pathname;
        const isSubMenuActive = item.sub_menu && item.sub_menu.some(subItem => subItem.path === pathname);
        if (item?.sub_menu) {
          return (
            <div key={index} >
              {isSubMenuActive ? <div className='absolute left-0  bg-black h-[45px] w-2  ' style={{
              }}> 
              </div>: ""}
              <div onClick={() => toggleAccordion(index)}
                className={`cursor-pointer flex justify-start  pl-5   gap-2 items-center text-white ${isSubMenuActive ? "bg-[#FEF6E7] text-yellow "  : ""} py-[12px] mb-[1px]`}
              >
                {item?.icon}
                {item?.label}
                <IoIosArrowForward className='ml-5 mt-2' />

              </div>

              <div
                ref={(el) => (contentRefs.current[index] = el)}
                className='accordion-content  overflow-hidden transition-max-height duration-300 ease-in-out cursor-pointer  '
                style={{
                  maxHeight: openIndex === index ? `${contentRefs.current[index]?.scrollHeight}px` : '0px'
                }}
              >
                {
                  item?.sub_menu?.map((sub_item, subIndex) => {
                    const isSubItemActive = sub_item.path === pathname;
                    return (
                      <NavLink
                        to={sub_item?.path}
                        key={subIndex}
                        className={`flex justify-center items-center  ${isSubItemActive ? "bg-[#FEF6E7] text-yellow border-r-4 border-yellow" : " text-white  "}    w-full py-2 mb-[1px] cursor-pointer `}
                      >
                        {sub_item?.icon}
                        {sub_item?.label}
                      </NavLink>
                    );
                  })
                }
              </div>


            </div>
          )
        } else {
          return (
            <div key={index} >
            
             
              <NavLink
                className={`cursor-pointer flex justify-start   gap-2 items-center  ${isActive ? "bg-[#FEF6E7] text-yellow border-r-4 border-yellow" : " text-white "}  py-[12px] px-2 pl-5   font-medium text-[16px]`}
                to={item?.path}
              >
                {item?.icon}
                {item?.label}
              </NavLink>
            </div>
          )
        }
      })
    }


  </div >
    )
}

export default SideBar