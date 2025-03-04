import { useState } from 'react';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import ModalAction from './components/ModalAction';

export default function App() {
  const [room, setRoom] = useState('HD03');
  const currentPath = window.location.pathname;

  function handleLogOut() {
    console.log('logging out');
  }

  const [openModal, setOpenModal] = useState(false);
  const [action, setAction] = useState('');
  function handleAction(action: string) {
    if(action == 'control') {
      console.log('control');
      setOpenModal(true);
      setAction('control');
    } else {
      console.log('install');
      setOpenModal(true);
      setAction('install');
    }
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
              <li>
                <details>
                  <summary>Action</summary>
                  <ul className='bg-base-100 rounded-t-none p-2'>
                    <li onClick={() => handleAction('control')}>
                      <a>Control</a>
                    </li>
                    <li onClick={() => handleAction('install')}>
                      <a>Install</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li className={currentPath === '/auth' ? 'hidden' : ''}>
                <details>
                  <summary>Rooms</summary>
                  <ul className='bg-base-100 rounded-t-none p-2'>
                    <li onClick={() => setRoom('HD03')}>
                      <a>HD03</a>
                    </li>
                    <li onClick={() => setRoom('HD04')}>
                      <a>HD04</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li
                onClick={() => handleLogOut()}
                className={currentPath === '/auth' ? 'hidden' : ''}
              >
                <a>Log out</a>
              </li>
            </ul>
          </div>
        </div>
        <ModalAction open={openModal} action={action} setOpen={setOpenModal}/>
      </div>
      <Routes>
        <Route path='/' element={<Home room={room} />} />
        <Route path='/auth' element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}