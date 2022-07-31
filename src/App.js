import React from 'react';
import ZingTouch from 'zingtouch';
import $ from 'jquery';

import Screen from './components/Screen';
import Wheel from './components/Wheel';

class App extends React.Component{
  constructor(){
    super();
    this.state={
      menuItems : ['Cover Flow', 'Music', 'Games', 'Settings'],
      activeMenuItem : 0,
      isCoverflowVisible : false,
      isGamesVisible : false,
      isSettingsVisible : false
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

    $('#side-menu').toggleClass('display-side-menu');
    
    this.activeItem=0;

    this.setState({
      activeMenuItem : this.activeItem,
      isCoverflowVisible : false,
      isGamesVisible : false,
      isSettingsVisible : false
    });
  };

  handleCentreButtonClick = () => {

    const {activeMenuItem}=this.state;

    $('#side-menu').removeClass('display-side-menu');

    if(activeMenuItem===0){
      this.setState({
        isCoverflowVisible : true
      });
    }
    else if(activeMenuItem===2){
      this.setState({
        isGamesVisible : true
      });
    }
    else{
      this.setState({
        isSettingsVisible : true
      });
    }
  };

  render(){

    const {menuItems, activeMenuItem, isCoverflowVisible, isGamesVisible, isSettingsVisible}=this.state;

    return (
      <div id="App">
        <Screen
          menuItems={menuItems}
          activeMenuItem={activeMenuItem}
          isCoverflowVisible={isCoverflowVisible}
          isGamesVisible={isGamesVisible}
          isSettingsVisible={isSettingsVisible}
        />
        <Wheel
          onMenuButtonClick={this.handleMenuButtonClick}
          onCentreButtonClick={this.handleCentreButtonClick}
        />
      </div>
    );
  }
}


export default App;