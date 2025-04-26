
function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-neutral-800/80 backdrop-blur shadow w-full">
    <div className="container mx-auto flex items-center justify-between p-4">
        <div  className="text-xl font-semibold tracking-tight">
            REST&nbsp;Countries
        </div>          
    </div>
    </header>    
  );
}

export default Header;