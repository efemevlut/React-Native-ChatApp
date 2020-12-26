import React, {useState} from 'react';
import {SafeAreaView, View, Text, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import {timelinePage} from './styles';
import {PostItem, PostInput, Header, TopicSelectModal} from '../components';

const Timeline = () => {
  const [topicModalFlag, setTopicModalFlag] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <SafeAreaView style={timelinePage.container}>
      <View style={timelinePage.container}>
        <Header onTopicModalSelect={() => setTopicModalFlag(true)} title={selectedTopic}/>
        <FlatList data={[]} renderItem={() => null} />
        <PostInput onSendingPost={(value) => console.log(value)} />
        <TopicSelectModal
          visibility={topicModalFlag}
          onClose={() => setTopicModalFlag(selectedTopic ? false : true)}
          onTopicSelect={(value)=>{
            setSelectedTopic(value);
            setTopicModalFlag(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export {Timeline};
