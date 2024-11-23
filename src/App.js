// import './App.css';

// npm i concurrently -D : package to run frontend and backend in one script

import { TaskList } from "./components";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = process.env.REACT_APP_SERVER_URL

function App() {
  return (
    <div className="bg-gradient-to-b from-blue-600 to-blue-500 min-h-screen">
      <TaskList/>
      <ToastContainer />
    </div>
  );
}

export default App;
export {URL}
