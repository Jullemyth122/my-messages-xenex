import './App.css'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Navbar_component_health from './components/Navbar_component';
import Healthlist_component from './components/Healthlist_component';
import Edithealth_component from './components/Edithealth_component';
import Createhealth_component from './components/Createhealth_component';

import Navbar_component from './habitscomponent/Navbar_component';
import HabitList_component from './habitscomponent/HabitList_component';
import EditHabitList_component from './habitscomponent/EditHabitList_component';
import CreateHabit_component from './habitscomponent/CreateHabit_component';

import Navbar from './copycomponent/Navbar';
import List from './copycomponent/List';
import Create from './copycomponent/Create';
import Edit from './copycomponent/Edit';
import Navbar_like from './likecomponent/Navbar_like';
import Create_like from './likecomponent/Create_like';
import List_like from './likecomponent/List_like';
import NavbarSample from './samplecomponent/NavbarSample';
import ListSample from './samplecomponent/ListSample';
import CreateSample from './samplecomponent/CreateSample';
import UserMainNav from './UsersAndMainPeople/UserMainNav';
import Users from './UsersAndMainPeople/Users';
import Main from './UsersAndMainPeople/Main';

function App() {
  
  return (
    <div className="App">

      <Router>
        
        {/* <Navbar_component_health></Navbar_component_health> */}

        {/* <Navbar_component></Navbar_component> */}

        {/* <Navbar></Navbar> */}

        {/* <Navbar_like></Navbar_like> */}

        {/* {<NavbarSample></NavbarSample>} */}
        
        <UserMainNav></UserMainNav>

        <Routes>
         
          {/* <Route path='/' exact element={<Healthlist_component></Healthlist_component>} ></Route>
          <Route path='/edit/:id' element={<Edithealth_component></Edithealth_component>}></Route>
          <Route path='/create' element={<Createhealth_component></Createhealth_component>}></Route> */}
        

          {/* <Route path='/' exact element={<HabitList_component></HabitList_component>}></Route>
          <Route path='/edit/:id' element={<EditHabitList_component></EditHabitList_component>}> </Route>
          <Route path='/create' element={<CreateHabit_component></CreateHabit_component>}></Route> */}
        
        {/* <Route path="/" exact element={<List></List>}></Route>
        <Route path='/edit/:id' element={<Edit></Edit>}></Route>
        <Route path='/create' element={<Create></Create>}></Route> */}

        {/* <Route path='/' exact element={<List_like></List_like>}></Route>
        <Route path='/create' element={<Create_like></Create_like>}></Route> */}

        {/* <Route path='/' exact element={<ListSample></ListSample>}></Route>
        <Route path='/create' element={<CreateSample></CreateSample>}></Route> */}

        <Route path='/' element={<Main></Main>}></Route>
        <Route path='/user' element={<Users></Users>}></Route>


        </Routes>
      
      </Router>
      
    </div>
  );
}

export default App;
