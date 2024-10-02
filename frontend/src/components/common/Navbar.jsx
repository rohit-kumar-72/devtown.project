import React, { useState } from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Link, useNavigate } from 'react-router-dom'
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { X, Menu } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/services/operations/authApi'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        try {
            dispatch(logout(token));
        } catch (error) {
            console.log("LOGOUT ERROR ", error.message);
            return
        }
        navigate("/login");
    };

    return (
        <nav className="w-full bg-white shadow-md">
            <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                {/* Left side (Logo or Navigation Links) */}
                <div className="flex items-center mr-4">
                    <Link to="/" className="text-lg font-bold">
                        MyApp
                    </Link>
                </div>

                {/* Hamburger Menu for Small Screens */}
                <div className="lg:hidden">
                    <Button onClick={toggleMenu} variant="outline">
                        {isMenuOpen ? <X /> : <Menu />}
                    </Button>
                </div>

                {/* Menu Links - hidden on small screens */}
                <NavigationMenu className={`lg:flex hidden flex-col lg:flex-row lg:items-center lg:space-x-6`}>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link to="/" className={navigationMenuTriggerStyle()}>
                                Home
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to="/mytask" className={navigationMenuTriggerStyle()}>
                                My Task
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Right side (Logout Button) */}
                <div className="hidden lg:block ml-auto">
                    <Button variant="outline" className="ml-auto hover:bg-destructive hover:text-white" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>

            {/* Mobile Menu - shown when hamburger is clicked */}
            {isMenuOpen && (
                <div className="lg:hidden block mt-2">
                    <ul className="flex flex-col px-4 pb-2 space-y-2">
                        <li>
                            <Link to="/docs" onClick={toggleMenu}>Documentation</Link>
                        </li>
                        <li>
                            <Link to="/about" onClick={toggleMenu}>About</Link>
                        </li>
                        <li onClick={handleLogout}>
                            <span className='text-destructive font-medium'>Logout</span>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    )
}

export default Navbar;
