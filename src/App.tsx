import { useState } from 'react';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';

export default function App() {
  const [room, setRoom] = useState('HD03');

  const currentPath = window.location.pathname;

  function handleLogOut() {
    console.log('logging out');
  }

  return (
    <BrowserRouter>
      <div className='text-slate-50 font-poppins'>
        <div className='navbar bg-base-100'>
          <div className='flex-1'>
            <a className='btn btn-ghost text-2xl'>Netman Frontend</a>
          </div>
          <div className='flex-none'>
            <ul className='menu menu-horizontal px-1 text-2xl'>
              <li onClick={() => { handleLogOut() }} className={currentPath === '/auth' ? 'hidden' : ''}>
                <a>Log out</a>
              </li>
              <li className={currentPath === '/auth' ? 'hidden' : ''}>
                <details>
                  <summary>Rooms</summary>
                  <ul className='bg-base-100 rounded-t-none p-2'>
                    <li
                      onClick={() => {
                        setRoom('HD03');
                      }}>
                      <a>HD03</a>
                    </li>
                    <li
                      onClick={() => {
                        setRoom('HD04');
                      }}>
                      <a>HD04</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Routes>
        <Route
          path='/'
          element={<Home room={room} />}
        />
        <Route
          path='/auth'
          element={<AuthPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
