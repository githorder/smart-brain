import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import FaceDetection from './components/faceDetection/FaceDetection';
import Rank from './components/rank/Rank';
import ImageLink from './components/imageLink/ImageLink';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';
import Particles from 'react-particles-js';


const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    },
    opacity: {
      value: 1
    },
    size: {
      value: 2.5,
      anim: {
        enable: true,
        speed: 20
      }
    },
    line_linked: {
      distance: 120,
      opacity: 0.5,
    }
  },
   
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    name: '',
    password: '',
    email: '',
    id: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      top_row: height * clarifaiFace.top_row,
      right_col:  width - (width * clarifaiFace.right_col),
      bottom_row: height - (height * clarifaiFace.bottom_row),
      left_col: width * clarifaiFace.left_col
    }
  }

  displayFace = (box) => {
    this.setState({box: box})
  }

  loaduser = (data) => {
    this.setState({ user: {
        name: data.name,
        password: data.password,
        email: data.email,
        id: data.id,
        entries: data.entries,
        joined: data.joined
    }});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://pure-peak-63258.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          input: this.state.input
      })
    })
   .then(response => response.json())
     .then( response => {
       if ( response ) {
        fetch('https://pure-peak-63258.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
          })
        })
       .then(response => response.json())
       .then(count => {
           this.setState(Object.assign(this.state.user, {entries: count}));
        })
        .catch(console.log)
       }
       this.displayFace(this.calculateFaceLocation(response))
      })
     .catch(err => console.log('you got an error', err))
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }


  render() {
    const { isSignedIn, route, box, imageUrl } = this.state;
    return (
      <div className="App">
        <Particles 
              params={particlesOptions}
              className='particles'
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ?<div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLink onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceDetection box={box} imageUrl={imageUrl}/>
           </div> 
          :(
            route === 'signin'
            ? <Signin loadUser={this.loaduser} onRouteChange={this.onRouteChange} />
            : <Register loaduser={this.loaduser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
