import React, {useState, useContext} from 'react';
import {SafeAreaView, View, Text, FlatList} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {authStyle, timelinePage} from './styles';
import {PostItem, PostInput, Header, TopicSelectModal} from '../components';
import moment from 'moment';
import {ModalContext} from '../Router';

const user = auth().currentUser;

const Timeline = (props) => {
  const {topicModalFlag, setModalFunc} = useContext(ModalContext);
  const [postList, setPostList] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const selectingTopic = (value) => {
    database().ref(`/${selectedTopic}/`).off('value');
    setSelectedTopic(value);
    setModalFunc(false);

    database()
      .ref(value)
      .on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const fomrmattedDate = Object.keys(data).map((key) => ({
            userEmail: data[key].userEmail,
            postText: data[key].postText,
            time: data[key].time,
          }));

          fomrmattedDate.sort((a, b) => {
            return new Date(b.time) - new Date(a.time);
          });
          setPostList(fomrmattedDate);
        }
      });
    setPostList([]);
  };

  const sendingPost = (value) => {
    const postObject = {
      userEmail: user.email,
      postText: value,
      time: moment().toISOString(),
    };

    database().ref(`${selectedTopic}/`).push(postObject);
  };

  const renderPost = ({item}) => <PostItem post={item} />;

  const logOut = () => {
    auth().signOut();
  };

  return (
    <SafeAreaView style={timelinePage.container}>
      <View style={timelinePage.container}>
        <Header
          onTopicModalSelect={() => setModalFunc(true)}
          title={selectedTopic}
          onLogOut={logOut}
        />
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={postList}
          renderItem={renderPost}
        />
        <PostInput onSendingPost={sendingPost} />
        <TopicSelectModal
          visibility={topicModalFlag}
          onClose={() => setModalFunc(selectedTopic ? false : true)}
          onTopicSelect={selectingTopic}
        />
      </View>
    </SafeAreaView>
  );
};

export {Timeline};
