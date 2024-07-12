import * as React from 'react';
import './App.css';
import { Header } from './components/shared/Header';
import { BodyPlaceholder } from './components/shared/BodyPlaceholder';
import { Footer } from './components/shared/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      {/* <BodyPlaceholder/>
      <Footer/> */}
    </div>
  );
}

export default App;
