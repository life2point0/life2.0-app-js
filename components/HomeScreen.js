import React, { useEffect, useState } from 'react';
import AppBar from './AppBar';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import CommunityCard from './CommunityCard';
import eventImage from './assets/events.png';
import axios from 'axios';
import { USER_SERVICE_BASE_URL } from './constants';
import { useAuth } from '../contexts/AuthContext';
import { CometChat } from '@cometchat-pro/react-native-chat';

const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion('REGION').build();
CometChat.init('APP_ID', appSetting).then(
  () => {
    console.log('Initialization completed successfully');
  },
  (error) => {
    console.log('Initialization failed with error:', error);
  }
);

const HomeScreen = () => {
  const [communities, setCommunities] = useState([]);
  const { profile } = useAuth();


  const getCommunities = async () => {
    try {
        const res = (await axios.get(`${USER_SERVICE_BASE_URL}/communities`)).data;
        setCommunities(res.data);
    } catch (e) {
        setCommunities([]);
        console.log(e)
    }
  }

  useEffect(() => {
    getCommunities();
  }, []);

  return (
    <View style={{backgroundColor: '#fff'}}>
      <AppBar/>
      <View style={styles.container}>
        <Text style={styles.Welcome }>Welcome to Dubai</Text>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search communities"
            placeholderTextColor="#888"
          />
          <TouchableOpacity onPress={() => undefined}>
            <Image
              source={require('./assets/icons/searchicon.png')} // Replace with your custom search icon path
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.subHeader}>
          <Text style={styles.communities}>Communities for you</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {communities.map((community) => (
            <CommunityCard key={community.guid} communityName={community.name} users={community.users || []} description={community.description} icon={community.icon}/>
          ))}
        </ScrollView>
        <View style={styles.subHeader}>
          <Text style={styles.events}>Events for You</Text>
        </View>
        <View>
            <Image source={eventImage} style={{maxWidth: '100%', maxHeight: 250, aspectRatio: 6/4}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  Welcome: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  searchBar: {
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 5
  },
  communities: {
    fontSize: 18,
    fontWeight: "500",
  },
  events: {
    fontSize: 18,
    fontWeight: "500",
  }
});

export default HomeScreen;
