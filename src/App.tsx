import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import TaskList from './components/Tasks/TaskList';
import UserList from './components/Users/UserList';
import UserPosts from './components/Posts/UserPosts';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users/:userId/posts" element={<UserPosts />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
