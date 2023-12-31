import { useRouter } from 'next/router';

const Navbar = () => {
    const router = useRouter();

    return (
        <nav>
            <div className="left-side">
                <img src="/logo.png" alt="Logo" />
                <span>Project Name</span>
            </div>
            <div className="right-side">
                <button onClick={() => router.push('/route1')}>Button 1</button>
                <button onClick={() => router.push('/route2')}>Button 2</button>
                <button onClick={() => router.push('/route3')}>Button 3</button>
            </div>
        </nav>
    );
};

export default Navbar;


// function NavBar() {
//     /*...*/
//     return (
        // <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        //     <div className="flex items-center flex-shrink-0 text-white mr-6">
        //         <span className="font-semibold text-xl tracking-tight">3NP</span>
        //     </div>
        //     <div className="block lg:hidden">
        //         <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
        //             <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z" /></svg>
        //         </button>
        //     </div>
        //     <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        //         <div className="text-sm lg:flex-grow">
        //             <a href="/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        //                 Home
        //             </a>
        //             <a href="aboutus" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        //                 About
        //             </a>
        //         </div>
        //         <div>
        //             <a href="loginform" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Sign In</a>
        //             <a href="registrationform" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Sign Up</a>
        //         </div>
        //     </div>
        // </nav>
//     );
// }