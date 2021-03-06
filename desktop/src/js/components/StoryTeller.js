import React from "react";
import Intro from './Intro';
import Scene from './Scene';
import EndSlide from './EndSlide';

export default class StoryTeller extends React.Component{
  constructor(){
    super();
    this.state = {
        script: {},
        sceneIndex: -1,
        isEnd: false
    }
    this.getScript();
  }
  getScript(){
    fetch('desktop-static/script.json')
    .then(res=>{
      return res.json()
    }).then(script=>{
      this.setState({script});
    });
  }
  getCurrentScene(){
    const script = this.state.script;

    if(this.state.sceneIndex === -1){
      return <Intro content={script.intro}/>
    } else if( this.state.sceneIndex < script.scenes.length && !this.state.isEnd){
      return <Scene scene={script.scenes[this.state.sceneIndex]}/>
    } else if( this.state.isEnd ){
      return <EndSlide/>
    }
  }
  goToNextScene(){
    const newSceneIndex = this.state.sceneIndex + 1;

    if(newSceneIndex === this.state.script.scenes.length ){
        this.setState({isEnd: true});
        socket.emit( "game ended" );
        return;
    }

    socket.emit( "scene change", newSceneIndex );
    this.setState({
      sceneIndex: newSceneIndex
    });
  }
  render(){
    return (
      <div className="sheet-container" id="scene">
        <div>
          {
            (Object.keys(this.state.script).length > 0) ?
            this.getCurrentScene() : null
          }
          <button disabled={this.state.isEnd} onClick={this.goToNextScene.bind(this)}>Dalej</button>
          <div className="sheet" />
        </div>
      </div>
    );
  }
}
