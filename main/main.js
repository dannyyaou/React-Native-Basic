import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

// db
import Database from './database'

// views
import WelcomeView from './views/WelcomeView';
import LoadingView from './views/LoadingView';
import TabsView from './views/TabsView'

var device = '';
var _navigator;

// main class
class Main extends Component{
	constructor(props) {
		super(props);
		console.log(props)
		device = props.device;
		this.state = {loading:true, view:'loading'}
	}
	_setInitView(){
		var init_data = JSON.parse(this.state.init_data);
		if (init_data.logined) {
			this.setState({view:'tabs',loading:false})
		}else{
			this.setState({view:'welcome',loading:false})
		}
	}
	componentDidMount(){
		var db = new Database();
		db._loadInitialData(function(error,init_data) {
			this.setState({init_data:init_data});
			this._setInitView();
		}.bind(this))
	}
	renderView(route, navigator){
		_navigator = navigator;
    switch (route.id){
    	case 'loading':
    		return (<LoadingView navigator={_navigator}/>)
    		break;
    	case 'welcome':
    		return (<WelcomeView navigator={_navigator}/>)
    		break;
    	case 'tabs':
    		return (<TabsView navigator={_navigator} device={device}/>)
    		break;
    }
	}
	render(){
		if (this.state.loading) {
			return( <LoadingView/> )
		}else{
			return(
				<Navigator
		      initialRoute={{ id: this.state.view , index: 0 }}
		      renderScene={this.renderView}
		     />
		  )
	  }
	}
}

module.exports = Main;