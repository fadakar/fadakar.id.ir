import Footer from "./Footer";
import Header from "./Header";

const Layout = ({children}) => {
    return (
        <div className="bg-gray-100 print:bg-transparent min-h-screen pt-2 lg:pt-5">
            <Header/>
            <div className="lg:max-w-7xl lg:mx-auto py-2  px-4 lg:px-12">
                {children}
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;
