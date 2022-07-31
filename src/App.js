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
      isSettingsVisible : false,
      musicItems : ['All Songs', 'Artists', 'Albums'],
      isMusicMenuVisible : false
    };
    this.activeItem=0;
    this.angle=0;
  }

  componentDidMount(){
    const wheel=document.getElementById('wheel');
    const region=ZingTouch.Region(wheel);

    region.bind(wheel, 'rotate', (event) => {
      this.angle+=event.detail.distanceFromLast;

      const {menuItems, musicItems, isMusicMenuVisible}=this.state;

      if(this.angle > 30){
        this.activeItem=(isMusicMenuVisible? (++this.activeItem === musicItems.length? 0 : this.activeItem) : (++this.activeItem === menuItems.length? 0 : this.activeItem));

        this.setState({activeMenuItem : this.activeItem});

        this.angle=0;
      }
      else if(this.angle < -30){
        this.activeItem=(isMusicMenuVisible? (--this.activeItem < 0? 2 : this.activeItem) : (--this.activeItem < 0? 3 : this.activeItem));

        this.setState({activeMenuItem : this.activeItem});

        this.angle=0;
      }
    });
  }

  componentDidUpdate(){

    const {isMusicMenuVisible}=this.state;

    if(isMusicMenuVisible){
      $('#side-menu').addClass('display-side-menu');  
    }

    return;
  }

  handleMenuButtonClick = () => {

    const {isMusicMenuVisible}=this.state;

    if(!isMusicMenuVisible){
      $('#side-menu').toggleClass('display-side-menu');
    }
    
    this.activeItem=0;

    this.setState({
      activeMenuItem : this.activeItem,
      isCoverflowVisible : false,
      isGamesVisible : false,
      isSettingsVisible : false,
      isMusicMenuVisible : false
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
    else if(activeMenuItem===1){

      this.activeItem=0;

      this.setState({
        isMusicMenuVisible : true,
        activeMenuItem : this.activeItem
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

    const {menuItems, activeMenuItem, musicItems, isCoverflowVisible, isGamesVisible, isSettingsVisible, isMusicMenuVisible}=this.state;

    return (
      <div id="App">
        <Screen
          menuItems={isMusicMenuVisible? musicItems : menuItems}
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