
const Footer = () => {
    return (
        <footer className='flex justify-center items-center space-x-5 bg-gray-900 text-white'>
            <p className='mt-2'>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </footer>
    );
};

export default Footer;