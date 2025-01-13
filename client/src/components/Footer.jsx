const Footer = () => {
    return (
        <footer className='bg-gray-900 text-white py-6'>
            <div className='container mx-auto px-6 flex justify-center items-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-5'>
                {/* Copyright Text */}
                <p className='text-center md:text-left'>
                    &copy; {new Date().getFullYear()} Your Company. All rights reserved.
                </p>

                <div className='flex space-x-4'>
                    <a href="https://wa.me/2348169885711" target="_blank" className="hover:text-gray-400 transition duration-200">
                        Chat with us on WhatsApp
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
