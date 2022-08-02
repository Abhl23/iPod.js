import React from 'react';
import ZingTouch from 'zingtouch';
import $ from 'jquery';

import song from './assets/theRide.mp3';

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
      isMusicMenuVisible : false,
      isMusicPlayerVisible : false,
      isMusicPlaying : false,
      isAutoPlayDone : false
    };
    this.activeItem=0;
    this.angle=0;
    this.audio=new Audio(song);
    this.songTimestampId=undefined;
    this.songBarId=undefined;
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

    const {isMusicMenuVisible, isMusicPlayerVisible}=this.state;

    if(!isMusicMenuVisible){
      $('#side-menu').toggleClass('display-side-menu');
    }
    
    this.activeItem=0;

    this.setState({
      activeMenuItem : this.activeItem,
      isCoverflowVisible : false,
      isGamesVisible : false,
      isSettingsVisible : false,
      isMusicMenuVisible : (isMusicPlayerVisible? true : false),
      isMusicPlayerVisible : false
    });
  };

  handleCentreButtonClick = () => {

    const {activeMenuItem, isMusicMenuVisible, isAutoPlayDone}=this.state;

    $('#side-menu').removeClass('display-side-menu');

    if(isMusicMenuVisible && activeMenuItem===0){

      if(!isAutoPlayDone){
        this.handleAutoPlay();
        return;
      }

      this.setState({
        isMusicPlayerVisible : true,
        isMusicMenuVisible : false
      });
    }
    else if(!isMusicMenuVisible && activeMenuItem===0){
      this.setState({
        isCoverflowVisible : true
      });
    }
    else if(!isMusicMenuVisible && activeMenuItem===1){

      this.activeItem=0;

      this.setState({
        isMusicMenuVisible : true,
        activeMenuItem : this.activeItem
      });
    }
    else if(!isMusicMenuVisible && activeMenuItem===2){
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

  handleAutoPlay = () => {
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

  handleSongTimestamp = () => {
    console.log('play');

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

  handleSongBarWidth = () => {
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
      isMusicPlaying : false,
      isAutoPlayDone : false
    });
  }

  handlePlayPause = () => {
    const {isMusicPlaying, isAutoPlayDone}=this.state;

    if(isMusicPlaying){
      this.audio.pause();
      console.log('pause');
      clearInterval(this.songTimestampId);
      clearInterval(this.songBarId);

      this.setState({
        isMusicPlaying : false
      });
    }
    else if(isAutoPlayDone && !isMusicPlaying){
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
          menuItems={isMusicMenuVisible? musicItems : menuItems}
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