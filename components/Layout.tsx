import WhatsHappening from "./layout/WhatsHappening";
import Sidebar from "./layout/Sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return ( 
        <div className="h-screen bg-black">
            <div className="container h-full mx-auto xl:px-20 max-w-8xl">
                <div className="grid grid-cols-4 h-full">
                    <Sidebar />
                    <div className="
                    col-span-3
                    lg:col-span-2
                    border-x-[1px]
                    border-neutral-800
                    ">
                        {children}
                    </div>
                    <WhatsHappening />
                </div>
            </div>
        </div>
     );
}
 
export default Layout;