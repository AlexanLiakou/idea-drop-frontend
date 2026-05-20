import { Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { useAuthContext } from '#/hooks/useAuthContext';
import { logoutUser } from '#/api/auth';
import { FaTimes, FaBars } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const {setAccessToken, setUser} = useAuthContext();
  const {user} = useAuthContext();

  const handleLogout = async (e:React.FormEvent) => {
      e.preventDefault();
      try {
        await logoutUser();
        setAccessToken(null);
        setUser(null);
        navigate({to: '/'});
      } catch (err: any) {
        console.log('Logout failed', err);
      }
    }

  return (
    <header className='bg-white shadow'>
      <div className='container mx-auto px-6 py-4 flex justify-between items-center'>
        <div className='flex items-center space-x-2 text-gray-800'>
          <Link to='/' className='flex items-center space-x-2 text-gray-800'>
            <Lightbulb className='w-6 h-6 text-yellow-500' />
            <h1 className='text-2xl font-bold'>IdeaDrop</h1>
          </Link>
        </div>

        <nav className='hidden md:flex items-center space-x-4'>
          <Link
            to='/ideas'
            className='text-gray-600 hover:text-gray-900 font-medium transition px-3 py-2 leading-none'
          >
            Ideas
          </Link>
          {
            user && (
              <Link
              to='/ideas/new'
              className='!bg-blue-600 hover:!bg-blue-700 text-white font-medium transition px-4 py-2 rounded-md leading-none'
              >
                + New Idea
              </Link>
            )
          }
        </nav>
        {/*Auth Buttons*/}
        <div className='hidden md:flex items-center space-x-2'>
          {
            !user ? (
              <>
                <Link to='/login' className='text-gray-600 hover!text-gray-700 font-medium transition px-3 py-2 leading-none'>Login</Link>
                <Link to='/register' className='!bg-gray-100 hover!bg-gray-200 text-gray-800 font-medium transition px-4 py-2 leading-none rounded-md'>Register</Link>
              </>
            ) : (
              <>
                <span className='text-gray-700 font-mwdium px-2 hidden sm:block'>Welcome, {user.name}</span>
                <button onClick={handleLogout} className=' cursor-pointer !bg-red-600 hover:!bg-red-900 text-white font-medium transition px-4 py-2 rounded-md'>Logout</button>
              </>
            )
          }
          
        </div>
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-blue-400 text-xl cursor-pointer" title='Menu'>
            {menuOpen ? <FaTimes/> : <FaBars/>}
          </button>
        </div>
      </div>
      {
        menuOpen && (
          <div className="md:hidden !bg-white px-6 py-4 space-y-2 space-x-4 text-center text-white">
            <Link to='/ideas' className='text-gray-600 hover:text-gray-900 font-medium transition px-3 py-2 leading-none'>Ideas</Link>
            {
              user && (
                <Link to='/ideas/new' className='text-gray-600 hover:text-gray-900 font-medium transition px-3 py-2 leading-none'>+ New Idea</Link>
              )
            }
            {
              !user ? (
                <>
                  <Link to='/login' className='text-gray-600 hover:text-gray-900 font-medium transition px-3 py-2 leading-none'>Login</Link>
                  <Link to='/register' className='text-gray-600 hover:text-gray-900 font-medium transition px-3 py-2 leading-none'>Register</Link>
                </>
              ) : (
                <>
                  <button onClick={handleLogout} className=' cursor-pointer !bg-red-600 hover:!bg-red-900 text-white font-medium transition px-4 py-2 rounded-md'>Logout</button>
                </>
              )
            }
          </div>
        )
      }
    </header>
  );
};

export default Header;
