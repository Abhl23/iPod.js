

/* 

    Innovative Functionality =>  
      
            1) Autoplays the song when you click on All Songs option.

            2) Working play/pause buttons for controlling the music. They only work after Autoplay is activated.

            3) You can play/pause the song from any screen in the iPod and the
               song's status (whether it is playing or paused) will be displayed on the status bar. 


*/


import React from 'react';
import ZingTouch from 'zingtouch';
import $ from 'jquery';

import song from './assets/theRide.mp3';

import Screen from './components/Screen';
import Wheel from './components/Wheel';

import './assets/css/App.css';

class App extends React.Component{
  constructor(){
    super();

    // boolean states taken for conditional rendering of respective components
    this.state={
      menuItems : ['Cover Flow', 'Music', 'Games', 'Settings'],
      activeMenuItem : 0,                          // indicates the highlighted side menu item when using the rotate wheel functionality
      isCoverflowVisible : false,
      isGamesVisible : false,
      isSettingsVisible : false,
      musicItems : ['All Songs', 'Artists', 'Albums'],
      isMusicMenuVisible : false,
      isMusicPlayerVisible : false,
      isMusicPlaying : false,
      isAutoPlayDone : false
    };
    this.activeItem=0;                    // indicates the highlighted side menu item when using the rotate wheel functionality
    this.angle=0;
    this.audio=new Audio(song);    // imported song
    this.songTimestampId=undefined;      
    this.songBarId=undefined;     
  }

  // applying the rotate wheel functionality
  componentDidMount(){
    const wheel=document.getElementById('wheel');
    const region=ZingTouch.Region(wheel);

    region.bind(wheel, 'rotate', (event) => {
      this.angle+=event.detail.distanceFromLast;

      const {menuItems, musicItems, isMusicMenuVisible}=this.state;

      if(this.angle > 30){         // if the angle is greater than 30 you'll move one item downward in the side menu 

        // setting the activeItem according to the type of side menu visible
        this.activeItem=(isMusicMenuVisible? (++this.activeItem === musicItems.length? 0 : this.activeItem) : (++this.activeItem === menuItems.length? 0 : this.activeItem));

        this.setState({activeMenuItem : this.activeItem});

        this.angle=0;
      }
      else if(this.angle < -30){            // if the angle is greater than 30 you'll move one item upward in the side menu
        
        this.activeItem=(isMusicMenuVisible? (--this.activeItem < 0? 2 : this.activeItem) : (--this.activeItem < 0? 3 : this.activeItem));

        this.setState({activeMenuItem : this.activeItem});

        this.angle=0;
      }
    });
  }

  componentDidUpdate(){

    const {isMusicMenuVisible}=this.state;

    if(isMusicMenuVisible){
      $('#side-menu').addClass('display-side-menu');      // displays the music side-menu if it is set to visible
    }

    return;
  }

  handleMenuButtonClick = () => {

    const {isMusicMenuVisible, isMusicPlayerVisible}=this.state;

    if(!isMusicMenuVisible){
      $('#side-menu').toggleClass('display-side-menu');      // handles the displaying of main side menu
    }
    
    this.activeItem=0;              // sets the activeItem to the topmost item whenever you click the menu button

    this.setState({
      activeMenuItem : this.activeItem,
      isCoverflowVisible : false,
      isGamesVisible : false,
      isSettingsVisible : false,
      isMusicMenuVisible : (isMusicPlayerVisible? true : false),          // takes you back to the music side-menu if the music player is visible
      isMusicPlayerVisible : false
    });
  };

  handleCentreButtonClick = () => {

    const {activeMenuItem, isMusicMenuVisible, isAutoPlayDone}=this.state;

    // condition to not removeClass when clicked on either 'Artists' or 'Albums' list items
    if(!(isMusicMenuVisible && (activeMenuItem===1 || activeMenuItem===2))){
      $('#side-menu').removeClass('display-side-menu');         // hides the side menu
    }

    if(isMusicMenuVisible && activeMenuItem===0){           // autoplays the song and display the Music Player

      if(!isAutoPlayDone){
        this.handleAutoPlay();
        return;
      }

      this.setState({
        isMusicPlayerVisible : true,
        isMusicMenuVisible : false
      });
    }
    else if(!isMusicMenuVisible && activeMenuItem===0){               // displays the Coverflow screen
      this.setState({
        isCoverflowVisible : true
      });
    }
    else if(!isMusicMenuVisible && activeMenuItem===1){                  // displays the music side-menu

      this.activeItem=0;

      this.setState({
        isMusicMenuVisible : true,
        activeMenuItem : this.activeItem
      });
    }
    else if(!isMusicMenuVisible && activeMenuItem===2){                 // displays the Games screen
      this.setState({
        isGamesVisible : true
      });
    }
    else if(!isMusicMenuVisible && activeMenuItem===3){            // displays the Settings screen
      this.setState({
        isSettingsVisible : true
      });
    }
  };

  handleAutoPlay = () => {        // handles autoplay of the song on clicking the 'All Songs' option
    this.audio.play();

    this.setState({
      isMusicPlayerVisible : true,
      isMusicPlaying : true,
      isAutoPlayDone : true,
      isMusicMenuVisible : false
    }, () => {
      this.handleSongTimestamp();
      this.handleSongBarWidth();
    });
  }

  handleSongTimestamp = () => {           // updates the song timestamp

    const song=this.audio;
    
    this.songTimestampId=setInterval(() => {
      let ct=Math.round(song.currentTime);

      let minutes=parseInt(ct/60);
      let seconds=parseInt(ct%60);

      if(minutes===5 && seconds===51){
        this.stopSong();
      }

      const timestamp=$('#song-timestamp');

      timestamp.html((seconds < 10? `${minutes}:0${seconds}` : `${minutes}:${seconds}`));
    }, 1000);
  }

  handleSongBarWidth = () => {            // fills the song bar
    const song=this.audio;

    this.songBarId=setInterval(() => {
      let ct=Math.round(song.currentTime);
      let tt=Math.round(song.duration);

      let width=(ct*100)/tt;

      const bar=$('#inner-bar');

      bar.width(`${width}%`);
    }, 100);
  }

  stopSong = () => {
    clearInterval(this.songTimestampId);
    clearInterval(this.songBarId);
    this.setState({
      isMusicPlaying : false,             // resets the states of the song after it is completed
      isAutoPlayDone : false
    });
  }

  handlePlayPause = () => {
    const {isMusicPlaying, isAutoPlayDone}=this.state;

    if(isMusicPlaying){           // handles pausing the song
      this.audio.pause();

      clearInterval(this.songTimestampId);
      clearInterval(this.songBarId);

      this.setState({
        isMusicPlaying : false
      });
    }
    else if(isAutoPlayDone && !isMusicPlaying){         // handles playing the song
      this.audio.play();

      this.handleSongTimestamp();
      this.handleSongBarWidth();

      this.setState({
          isMusicPlaying : true
      });
    }
  }

  render(){

    const {menuItems, 
            activeMenuItem, 
            musicItems, 
            isCoverflowVisible, 
            isGamesVisible, 
            isSettingsVisible, 
            isMusicMenuVisible,
            isMusicPlayerVisible,
            isMusicPlaying,
            isAutoPlayDone
          }=this.state;

    return (
      <div id="App">
        <Screen
          menuItems={isMusicMenuVisible? musicItems : menuItems}      // passes the side-menu items according to the menu visible
          activeMenuItem={activeMenuItem}
          isCoverflowVisible={isCoverflowVisible}
          isGamesVisible={isGamesVisible}
          isSettingsVisible={isSettingsVisible}
          isMusicPlayerVisible={isMusicPlayerVisible}
          isMusicPlaying={isMusicPlaying}
          isAutoPlayDone={isAutoPlayDone}
        />
        <Wheel
          onMenuButtonClick={this.handleMenuButtonClick}
          onCentreButtonClick={this.handleCentreButtonClick}
          onPlayPause={this.handlePlayPause}
        />
      </div>
    );
  }
}


export default App;