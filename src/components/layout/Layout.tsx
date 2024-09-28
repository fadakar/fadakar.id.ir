import {Footer} from "./index";
import {Header} from "./index";
import {Aside} from "../index";

const Layout = ({children}) => {
    return (
        <div className="bg-gray-100 print:bg-transparent min-h-screen pt-2 lg:pt-5">
            <Header/>
            <div className="lg:max-w-7xl lg:mx-auto py-2  px-4 lg:px-12">


                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 print:grid-cols-1"
                     style={{fontFamily: "Open Sans"}}>
                    <div className="col-span-1">
                        <Aside/>
                    </div>

                    <div className="col-span-2 flex flex-col gap-4 mt-4 lg:mt-0">
                        {children}
                        <Footer/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Layout;
