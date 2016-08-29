import React, { Component } from 'react';
import {
	AsyncStorage
} from 'react-native';

const defaultData = {
	logined:false,
	userId:'not_set',
	accessToken:'not_set',
};

class Database{
  async _loadInitialData(callback){
    try {
      var value = await AsyncStorage.getItem('init_data');
      if (value !== null){
        callback(null,value)
      } else {
        console.log('set initial data...');
        this._setInitialData(function (error,data) {
        	callback(error,JSON.stringify(defaultData))
        })
      }
    } catch (error) {
      callback(error,null)
    }
  };
  async _setInitialData(callback){
  	var defaultDataJson = JSON.stringify(defaultData);
    try {
      await AsyncStorage.setItem('init_data', defaultDataJson).then((data)=>{
      	callback(null,data);
      });
    } catch (error) {
      callback(error,null);
    }
  }
  async _setItem(key,value){
     var value = await AsyncStorage.setItem(key,value);
     return value;
  }
  async _getItem(key,value){
     var value = await AsyncStorage.getItem(key);
     return value;
  }
}

module.exports = Database;