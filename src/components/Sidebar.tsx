import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Receipt, 
  CreditCard,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Appointments', href: '/appointments', icon: Calendar },
  { name: 'Billing', href: '/billing', icon: Receipt },
  { name: 'Payment', href: '/payment', icon: CreditCard },
];

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed right-4 top-4 z-50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <div className={`fixed inset-y-0 z-40 flex w-72 flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 border-r">
        <div className="flex items-center gap-2 p-6 border-b">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">MD</span>
          </div>
          <span className="text-xl font-bold">MediDash</span>
        </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={`
                            group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                            ${isActive
                              ? 'bg-gray-50 text-blue-600'
                              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                            }
                          `}
                        >
                          <item.icon className="h-6 w-6 shrink-0" />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className="mt-auto">
                <button
                  onClick={logout}
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}