import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
      fetch("http://lcboapi.com/products?q=beau", {
             method: 'GET', 
             mode: 'cors',
             headers: new Headers({
             Authorization : "Token MDpkZWJiMjFhYS01ZWUyLTExZTgtODMzMC1jMzU2N2UzNmI4Yjc6cWtCdUxVcnRBVzJwYTNGckZ3YUJmUjN3Y3NHV3F6eDJGdkJU"
        })
      })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.result)
          this.setState({
            isLoaded: true,
            items: result.result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("hit: " +error)
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
 
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
       const listItems = items.map(function(item){
        if (item.is_seasonal) {
          if (!item.image_thumb_url) {
            item.image_thumb_url = "https://www.crafthounds.com/wp-content/uploads/2016/11/No-Image-Available.png"
   
            return (
              <li key={item.name} id={item.id}>
                <div className="card_header">
                  <h1>{item.name} </h1>
                </div>
                <div className="card_desc">
                  <div className="card_image">
                     <img src={item.image_thumb_url} />
                  </div>
                  <p> {item.tags} </p>
                </div>
              </li>
            );
          }else {
             return (
              <li key={item.name} id={item.id}>
                <div className="card_header">
                  <h1>{item.name} </h1>
                </div>
                <div className="card_desc">
                  <div className="card_image">
                     <img src={item.image_thumb_url} />
                  </div>
                  <p> {item.tags} </p>
                </div>
              </li>
            );
          }
        }
          
        }
      );
     return <ul>{listItems}</ul>;
     
    }
  }
}

export default App;
