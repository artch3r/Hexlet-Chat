import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { io } from 'socket.io-client';
import init from './init.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
const socket = io();
root.render(init(socket));
