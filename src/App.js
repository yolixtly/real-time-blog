import './App.css';
import DisplayPost from './components/DisplayPosts'
import CreatePost from './components/CreatePost'

function App() {
  return (
    <div className="App">
      <CreatePost />
      <DisplayPost />
    </div>
  );
}

export default App;
