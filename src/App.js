import './App.css';


import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './views/login';
import SignUp from './views/signup';
import Main from './views/main';
import NotFound from './views/404';


function App() {
    return (
        <ConfigProvider componentSize='large'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navigate to='/home' replace/>}></Route>
                    <Route path='login' element={<Login/>}></Route>
                    <Route path='signup' element={<SignUp/>}></Route>
                    <Route path='404' element={<NotFound/>}></Route>
                    <Route path='*' element={<Main/>}></Route>
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
