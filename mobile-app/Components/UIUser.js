import {
    Button,
    Text,
    Modal,
    Center,
    FormControl,
    Input,
    NativeBaseProvider,
    Box,
    Image,
} from 'native-base';
import { Dimensions } from 'react-native';
import React, { Component, useState } from 'react';

//an object to contain if we are displaying the current user UI, along with 
//a function to modify it and a reference of the current user
export class UIUser
{
  constructor(show, set, currentUser)
  {
    this.show = show;
    this.set = set;
    this.currentUser = currentUser;
  }
}