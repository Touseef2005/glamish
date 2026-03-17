'use client';

import { FaEnvelope, FaMapMarkerAlt, FaGift, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-black text-white text-sm mt-10 ">
            <div className="container mx-auto px-6 py-10 !z-50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    
                    <div>
                        <h3 className="font-bold flex items-center gap-2">
                            <FaEnvelope /> CONTACT US
                        </h3>
                        <div className="mt-2">
                            <input type="email" placeholder="Enter your email" className="w-full p-2 text-white bg-transparent border-2 border-gray-500 rounded-md" />
                            <textarea placeholder="Your message" className="w-full p-2 mt-2 text-white bg-transparent border-2 border-gray-500 rounded-md" rows="3"></textarea>
                            <button className="mt-2 bg-transparent text-whtie border-2 border-gray-500 px-4 py-2 rounded-md">Send</button>

                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold flex items-center gap-2">
                            <FaMapMarkerAlt /> OUR LOCATIONS
                        </h3>
                        <p className="mt-2">123 Street Name, City, Country</p>
                        <img src="https://logos-download.com/wp-content/uploads/2018/09/Morphe_Cosmetics_Logo.png" alt="Location Logo" className="mt-12 w-60 h-24" />
                    </div>

                    {/* Logo & Collections */}
                    <div>
                        <h4 className="font-bold mb-2">COLLECTIONS</h4>
                        <ul className="space-y-1">
                            <li><Link href="#">SHOP</Link></li>
                            <li><Link href="#">FACE</Link></li>
                            <li><Link href="#">EYES</Link></li>
                            <li><Link href="#">LIPS</Link></li>
                            <li><Link href="#">FRAGRANCES</Link></li>
                        </ul>
                    </div>

                    {/* Info Links */}
                    <div>
                        <h4 className="font-bold mb-2">INFO LINKS</h4>
                        <ul className="space-y-1">
                            <li><Link href="#">LEARN MORE - COMING SOON</Link></li>
                            <li><Link href="#">BLOG</Link></li>
                            <li><Link href="#">MEDIA OR PRESS - COMING SOON</Link></li>
                            <li><Link href="#">SHIPPING POLICY</Link></li>
                            <li><Link href="#">RETURNS & REFUND POLICY</Link></li>
                            <li><Link href="#">PRIVACY POLICY</Link></li>
                            <li><Link href="#">FAQ’s</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 text-center py-4 text-xs text-gray-700">
                <p>© Copyright 2025, lorem spem . All rights reserved. Designed and Developed </p>
            </div>
            {/* Reward Button */}
            {/* <button className="fixed bottom-6 left-4 bg-gray-800 text-white  flex items-center gap-2 px-4 py-4 rounded-full shadow-lg">
                <FaGift size={20}/> 
            </button> */}
            {/* Share Button */}
            {/* <button
                className="fixed bottom-6 right-4 bg-green-500 text-white p-4 rounded-full shadow-md flex items-center justify-center"
                style={{ width: '50px', height: '50px' }}  // Circular button size
            >
                <FaWhatsapp size={24} />

            </button> */}
        </footer>
    );
};

export default Footer;
