import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {header} from './styles';

const Header = (props) => {
  return (
    <View style={header.container}>
      <View style={header.textContainer}>
        <Text style={header.text}>#{props.title}</Text>
      </View>
      <View style={header.iconWrapper}>
        <Icon 
          name="hexagon-multiple"
          size={30}
          color={"#69007f"}
          onPress={props.onTopicModalSelect}
        />
        <Icon 
          name="login"
          size={30}
          color={"#69007f"}
          onPress={props.onLogOut}
          style={{marginLeft: 10, marginRight: 10}}
        />        
      </View>
    </View>
  );
};

export {Header};
