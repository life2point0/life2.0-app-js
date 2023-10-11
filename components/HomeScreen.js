import React, { useEffect, useState } from 'react';
import AppBar from './AppBar';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import CommunityCard from './CommunityCard';
import EventCard from './EventCard';
import eventImage from './assets/events.png';
import axios from 'axios';
import { USER_SERVICE_BASE_URL } from './constants';
import { useAuth } from '../contexts/AuthContext';

const HomeScreen = () => {
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [communities, setCommunities] = useState([]);
  const { profile } = useAuth();

  const getTimeGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  const getCommunities = async () => {
    try {
        const res = (await axios.get(`${USER_SERVICE_BASE_URL}/communities`)).data;
        setCommunities(res.data);
    } catch (e) {
        setCommunities([]);
        throw e;
    }
  }

  useEffect(() => {
    const now = new Date();
    setGreeting(getTimeGreeting());
    setCurrentDate(now.toDateString());
    getCommunities();
  }, []);

  const events = [
    {
      eventImage: require('./assets/events.png'),
      eventName: 'Tech Meetup',
      date: 'October 15, 2023',
    },
    {
      eventImage: require('./assets/events.png'),
      eventName: 'Design Workshop',
      date: 'November 5, 2023',
    },
    // Add more events here
  ];

  return (
    <View style={{backgroundColor: '#fff'}}>
      <AppBar />
      <View style={styles.container}>
        <Text style={styles.date}>{currentDate}</Text>
        <Text style={styles.greeting}>{greeting}{profile?.firstName && `, ${profile?.firstName}`}</Text>
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
          {/* <TouchableOpacity disabled>
            <Text style={styles.viewAll}>View all &gt; &nbsp;</Text>
          </TouchableOpacity> */}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {communities.map((community) => (
            <CommunityCard key={community.guid} communityName={community.name} users={community.users || []} />
          ))}
        </ScrollView>
        <View style={styles.subHeader}>
          <Text style={styles.events}>Events for You</Text>
          {/* <TouchableOpacity disabled>
            <Text style={styles.viewAll}>View all &gt; &nbsp;</Text>
          </TouchableOpacity> */}
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
  date: {
    fontSize: 14,
    fontWeight: '400',
  },
  greeting: {
    fontSize: 24,
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
  },
  viewAll: {
    fontSize: 16,
    fontWeight: '600',
  }
});

export default HomeScreen;
