import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Shield, LogOut, Menu, X, Globe } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  title: string;
  role: string;
}

const Layout = ({ children, title, role }: LayoutProps) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [language, setLanguage] = useState<'en' | 'hi'>(
    (localStorage.getItem('justicelink-language') as 'en' | 'hi') || 'en'
  );

  const handleLogout = () => {
    localStorage.removeItem('justicelink-role');
    navigate('/login');
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    localStorage.setItem('justicelink-language', newLang);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar */}
      <header className="bg-accent text-accent-foreground shadow-gov border-b-4 border-primary">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-accent-foreground hover:bg-accent-foreground/10"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8" />
              <div>
                <h1 className="text-lg font-bold">JusticeLink India</h1>
                <p className="text-xs opacity-90">{title}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-accent-foreground hover:bg-accent-foreground/10"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === 'en' ? 'हिंदी' : 'English'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-accent-foreground hover:bg-accent-foreground/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Logout' : 'लॉगआउट'}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 bg-sidebar text-sidebar-foreground min-h-[calc(100vh-64px)] border-r border-sidebar-border">
            <nav className="p-4">
              <div className="mb-6">
                <div className="gov-badge bg-sidebar-primary/20 text-sidebar-foreground">
                  {role}
                </div>
              </div>
              {/* Navigation items will be added by individual portals */}
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
