const BottomBar = () => {
    return (
        <nav className="bg-gray-200 w-full fixed bottom-0 left-0 lg:hidden">
            <div className="container  min-h-[4rem] mx-auto flex flex-row  justify-between items-center py-2 px-12">
                <div>up</div>

                <div>down</div>
            </div>
        </nav>
    );
};

export default BottomBar;
