import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      stores:[]
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
    function handleClick() {
      arguments[1].preventDefault();
      const item_id = arguments[0].id;
      const element = document.getElementById(item_id).children[2];
      if (element.classList.contains('show') ) {
        element.classList.remove('show');
        element.classList.add('hide')
      } 
      else if (element.classList.contains('hide') ){
         element.classList.remove('hide');
         element.classList.add('show')
      }
      else {
         element.classList.add('show')
      }
    }
    const in_store = (item) => {
   
      console.log(item)
      fetch("http://lcboapi.com/stores?product_id="+item, {
             method: 'GET', 
             mode: 'cors',
             headers: new Headers({
             Authorization : "Token MDpkZWJiMjFhYS01ZWUyLTExZTgtODMzMC1jMzU2N2UzNmI4Yjc6cWtCdUxVcnRBVzJwYTNGckZ3YUJmUjN3Y3NHV3F6eDJGdkJU"
        })
      })
      .then(res => res.json())
      .then(
        (result) => {
           const stores_item = result.result
            const stores = stores_item.map(function(item){
              return <li key={item.name}>{item.name}</li>
            })
             
             
        }
      )
     
    }
    const li = function (item) { 
      return <li key={item.name} id={item.id} onClick={(e) => handleClick(item, e)}>
              <div className="card_header">
                <h1>{item.name} </h1>
              </div>
               <div className="card_image">
                  <img src={item.image_thumb_url} />
                </div>
              <div className="card_desc"> 
                <p> {item.tags} </p>

                <ul>{in_store(item.id)} </ul>
              </div>
            </li>
          };

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
       const listItems = items.map(function(item){
        if (item.is_seasonal) {
          if (!item.image_thumb_url) {
            item.image_thumb_url = "https://www.crafthounds.com/wp-content/uploads/2016/11/No-Image-Available.png"
            return ( li(item) );
            
          }else {
             return ( li(item) );
          }
        }
          
        }
      );
     return <ul>{listItems}</ul>;
     
    }
  }
}

export default App;
