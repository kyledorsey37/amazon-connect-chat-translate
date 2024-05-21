import React, { Component } from "react";
import Auth from "@aws-amplify/auth";
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from "./aws-exports.js";
import { AmazonConnectApp } from "@amazon-connect/app";

import "./App.css";
import 'semantic-ui-less/semantic.less';

// Import components
import Ccp from "./components/ccp";
import Chat from "./components/chat";

Auth.configure(awsconfig);

class App extends Component {
    
       componentDidMount() {
              // Initialize the Amazon Connect App SDK here
              const { connectApp } = AmazonConnectApp.init({
                  onCreate: (event) => {
                      const { appInstanceId } = event.context;
                      console.log('App initialized: ', appInstanceId);
                  },
                  onDestroy: (event) => {
                      console.log('App being destroyed');
                  },
              });
              
              // You can now use connectApp in the rest of your component as needed
              // For example, save it to the state or call methods on it
              // this.setState({ connectApp });
          }
       render() {
        const hostname = window.location.hostname;
        console.log("hostname: " + hostname)
        if (hostname === "boleskidorseyenergy.com") {
            return (
                <div className="App">
                  <Ccp />
                </div>
              );
          } else {
            // Blocked
            return <div>This site is not available. Please navigate to https://boleskidorseyenergy.com</div>;
          }
       }
}

export default withAuthenticator(App)
//export default App
