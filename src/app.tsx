import './app.css';
import { AutoComplete } from 'components';

const App = () => (
  <div className="App">
    <h1>Auto-complete</h1>
    <div style={{ width: '100%', maxWidth: 600 }}>
      <AutoComplete />
    </div>
  </div>
);

export default App;
