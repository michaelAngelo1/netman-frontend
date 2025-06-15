import { useState } from 'react';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import ModalAction from './components/ModalAction';
import { useRoomComputer } from './context/ComputerContext';

export default function App() {
  const currentPath = window.location.pathname;

  function handleLogOut() {
    console.log('logging out');
  }

  const [openModal, setOpenModal] = useState(false);  
  const [action, setAction] = useState('');
  function handleAction(action: string) {
    if(action == 'CONTROL') {
      setOpenModal(true);
      setAction('CONTROL');
    } else if(action == 'SOFTWARE') {
      setOpenModal(true);
      setAction('SOFTWARE');
    } else if(action == 'ADDROOM') {
      setOpenModal(true);
      setAction('ADDROOM');
    } else if(action == "ADDCOMPUTER") {
      setOpenModal(true);
      setAction('ADDCOMPUTER');
    }
  }

  const { rooms, setRoomChosen } = useRoomComputer();

  return (
    <BrowserRouter>
      <div className='bg-slate-800'>

        <div className='text-slate-50 font-poppins'>
          <div className='navbar bg-slate-800'>
            <div className='flex-1'>
              <a className='btn btn-ghost text-2xl'>Netman Frontend</a>
            </div>
            <div className='flex-none'>
              <ul className='menu menu-horizontal px-1 text-2xl'>
                <li>
                  <div onClick={() => handleAction('ADDCOMPUTER')}>Add PC</div>
                </li>
                <li>
                  <div onClick={() => handleAction('ADDROOM')}>Add Room</div>
                </li>
                <li>
                  <details>
                    <summary>Action</summary>
                    <ul className='bg-base-100 text-slate-100 rounded-t-none p-2 z-40'>
                      <li onClick={() => handleAction('CONTROL')}>
                        <a>Control</a>
                      </li>
                      <li onClick={() => handleAction('SOFTWARE')}>
                        <a>Install</a>
                      </li>
                    </ul>
                  </details>
                </li>
                <li className={currentPath === '/auth' ? 'hidden' : ''}>
                  <details>
                    <summary>Rooms</summary>
                    <ul className='bg-base-100 text-slate-100 rounded-t-none p-2 z-40'>
                      {
                        rooms.map((room, i) => (
                          <li key={i} onClick={() => setRoomChosen(room.name)}>
                            <a>{room.name}</a>
                          </li>
                        ))
                      }
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
          <Route path='/' element={<Home/>} />
          <Route path='/auth' element={<AuthPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}