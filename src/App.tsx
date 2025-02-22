import { useState } from 'react';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';

export default function App() {
  const [room, setRoom] = useState('HD03');
  const currentPath = window.location.pathname;

  const [control, setControl] = useState(false);
  const [install, setInstall] = useState(false); // New state for Install dropdown
  const [chrome, setChrome] = useState(false); // New state for Chrome
  const [explorer, setExplorer] = useState(false); // New state for Explorer
  const [git, setGit] = useState(false); // New state for Git
  const [vscode, setVscode] = useState(false); // New state for VSCode


  function handleLogOut() {
    console.log('logging out');
  }

  function handleAction(action: string) {
    if (action === 'control') {
      setControl(!control); // Toggle Control dropdown
      setInstall(false); // Close Install if open
    } else if (action === 'install') {
      setInstall(!install); // Toggle Install dropdown
      setControl(false); // Close Control if open
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
                {control && (
                  <details>
                    <summary>Control</summary>
                    <ul className='bg-base-100 rounded-t-none p-2'>
                      <li onClick={() => setChrome(!chrome)}>
                        <a>Start Chrome</a>
                      </li>
                      <li onClick={() => setExplorer(!explorer)}>
                        <a>Start Explorer</a>
                      </li>
                    </ul>
                  </details>
                )}
                {install && (
                  <details>
                    <summary>Install</summary>
                    <ul className='bg-base-100 rounded-t-none p-2'>
                      <li onClick={() => setGit(!git)}>
                        <a>Install Git</a>
                      </li>
                      <li onClick={() => setVscode(!vscode)}>
                        <a>Install VSCode</a>
                      </li>
                    </ul>
                  </details>
                )}
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
      </div>
      <Routes>
        <Route path='/' element={<Home room={room} />} />
        <Route path='/auth' element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}