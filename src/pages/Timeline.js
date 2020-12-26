import React, {useState} from 'react';
import {SafeAreaView, View, Text, FlatList} from 'react-native';
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth' 
import {authStyle, timelinePage} from './styles';
import {PostItem, PostInput, Header, TopicSelectModal} from '../components';
import moment from 'moment'

const user = auth().currentUser;

const Timeline = () => {
  const [topicModalFlag, setTopicModalFlag] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const selectingTopic = (value) => {
    setSelectedTopic(value);
    setTopicModalFlag(false);
    
    database().ref().on("value", (snapshot)=> {
      console.log(snapshot.val())
    })
      
  };

  const sendingPost = (value) => {
    const postObject = {
      userEmail : user.email,
      postText : value,
      time : moment().toISOString()
    }

    database().ref(`${selectedTopic}/`).push(postObject);
  }


  return (
    <SafeAreaView style={timelinePage.container}>
      <View style={timelinePage.container}>
        <Header
          onTopicModalSelect={() => setTopicModalFlag(true)}
          title={selectedTopic}
        />
        <FlatList data={[]} renderItem={() => null} />
        <PostInput onSendingPost={sendingPost}/>
        <TopicSelectModal
          visibility={topicModalFlag}
          onClose={() => setTopicModalFlag(selectedTopic ? false : true)}
          onTopicSelect={selectingTopic}
        />
      </View>
    </SafeAreaView>
  );
};

export {Timeline};
