import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import TaskList from './components/Tasks/TaskList';
import TaskItem from './components/Tasks/TaskItem';
import UserList from './components/Users/UserList';
import UserItem from './components/Users/UserItem';
import UserDetails from './components/Users/UserDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <UserList />
        <Routes>
          {/* <Route
            path="/users/:userId" 
            component={UserDetails}  
          /> */}
          <Route 
            path="/tasks"
            element={<TaskList />}  
          />
        </Routes>
      </div>
    </Router>
  );

}

export default App;
