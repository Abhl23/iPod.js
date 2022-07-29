import React from 'react';

import Wheel from './components/Wheel';

class App extends React.Component{
  constructor(){
    super();
  }

  render(){
    return (
      <div id="App">
        <Wheel />
      </div>
    );
  }
}


export default App;