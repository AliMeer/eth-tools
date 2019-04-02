import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';

var web3 = window.web3;


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      signedMessage: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    var web3 = window.web3;
    if(typeof(web3)!=='undefined')  {
      //web3 = new Web3(web3.currentProvider);
      this.setState({signedMessage: 'Wallet detected'})
      //create message packet to sign
      let messageParams = [
        {
          type: 'string',
          name: 'message',
          value: this.state.message
        }
      ];
      const fromAddress = web3.eth.accounts[0];
      const method = 'eth_signTypedData';
      const params = [messageParams, fromAddress]
      web3.currentProvider.sendAsync({
        method,
        params,
        fromAddress
      }, (err, result) => {
        if(err) console.log(err);
        //this.setState({signedMessage: err});
        if(result) this.setState({signedMessage: result.result});
      }
      )

    }
    else  {
      this.setState({signedMessage: 'No Wallet detected in Browser'})
    }


  }
  handleMessageChange(event)  {
    event.preventDefault();
    this.setState({message: event.target.value});
    console.log(this.state.message)
  }
  render() {
    return (
      <div className="App">
        
        <form onSubmit={this.handleSubmit}>
  <label>
    Enter Message:
    <input value={this.state.message} type="text" name="message" onChange={this.handleMessageChange} />
  </label>
  <input type="submit" value="Submit" />
</form>

      Signed Message: 
      <textarea align="left" value={this.state.signedMessage} />
  
      </div>
    );
  }
}

export default App;
