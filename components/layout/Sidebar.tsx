import { BsBellFill, BsHouseFill, BsBookmarkDash, BsThreeDots } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'
import { BiHash, BiLogOut } from 'react-icons/bi'
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarTweetButton from './SidebarTweetButton';

import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';

const Sidebar = () => {
    const { data: currentUser } = useCurrentUser();
    const items = [
        {
            label: 'Home',
            href: '/',
            icon: BsHouseFill
        },
        {
            label: 'Explore',
            href: '/explore',
            icon: BiHash
        },
        {
            label: 'Notifications',
            href: '/notifications',
            icon: BsBellFill
        },
        {
            label: 'Messages',
            href: '/messages',
            icon: FiMail
        },
        {
            label: 'Bookmarks',
            href: '/bookmarks',
            icon: BsBookmarkDash
        },
        {
            label: 'Profile',
            href: '/users/123',
            icon: FaUser
        },
        {
            label: 'More',
            icon: BsThreeDots
        }
    ]
    return ( 
        <div className='col-span-1 h-full pr-4 md:pr-6'>
            <div className='flex flex-col items-end'>
                <div className='space-y-2 lg:w-[230px]'>
                    <SidebarLogo />
                    {items.map((item) => (
                        <SidebarItem 
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                        />
                    ))}
                    {currentUser && (
                        <SidebarItem onClick={() => signOut()} icon={BiLogOut} label="Logout"/>
                    )}
                    <SidebarTweetButton />
                </div>
            </div>
        </div>
     );
}
 
export default Sidebar;