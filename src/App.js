import React from 'react';
import ZingTouch from 'zingtouch';

import Screen from './components/Screen';
import Wheel from './components/Wheel';

class App extends React.Component{
  constructor(){
    super();
    this.state={
      menuItems : ['Cover Flow', 'Music', 'Games', 'Settings'],
      activeMenuItem : 0
    };
    this.activeItem=0;
    this.angle=0;
  }

  componentDidMount(){
    const wheel=document.getElementById('wheel');
    const region=ZingTouch.Region(wheel);

    const {menuItems}=this.state;

    region.bind(wheel, 'rotate', (event) => {
      this.angle+=event.detail.distanceFromLast;

      if(this.angle > 30){
        this.activeItem=(++this.activeItem === menuItems.length? 0 : this.activeItem);

        this.setState({activeMenuItem : this.activeItem});

        this.angle=0;
      }
      else if(this.angle < -30){
        this.activeItem=(--this.activeItem < 0? 3 : this.activeItem);

        this.setState({activeMenuItem : this.activeItem});

        this.angle=0;
      }
    });
  }

  handleMenuButtonClick = () => {
    
  };

  render(){

    const {menuItems, activeMenuItem}=this.state;

    return (
      <div id="App">
        <Screen
          menuItems={menuItems}
          activeMenuItem={activeMenuItem} 
        />
        <Wheel />
      </div>
    );
  }
}


export default App;