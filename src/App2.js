import './App2.css';
import {
  BrowserRouter as Router, 
  Routes, 
  Route

} from "react-router-dom";
import Navbar from './CommentsPractice/Navbar';
import Main from './CommentsPractice/Main';
import Users from './CommentsPractice/Users';

function App() {

  return (
    <div className="App">
        <Router>
          
          <Navbar></Navbar>

          <Routes>
          
            <Route path="/" element={<Main></Main>}></Route>
            <Route path="/user" element={<Users></Users>}></Route>
          
          
          </Routes>
        </Router>
    </div>
  );
}

export default App;