import React, { useEffect, useState } from 'react';
import AppBar from './AppBar';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import CommunityCard from './CommunityCard';
import EventCard from './EventCard';

const HomeScreen = () => {
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');

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

  useEffect(() => {
    const now = new Date();
    setGreeting(getTimeGreeting());
    setCurrentDate(now.toDateString());
  }, []);

  const communities = [
    {
      name: 'Tech Enthusiasts',
      users: [
        { name: 'John Smith', position: 'CEO, Life 2.0', avatar: 'https://www.gravatar.com/avatar/1' }
      ]
    },
    {
      name: 'Tech Enthusiasts',
      users: [
        { name: 'John Smith', position: 'CEO, Life 2.0', avatar: 'https://www.gravatar.com/avatar/1' }
      ]
    },
    {
      name: 'Tech Enthusiasts',
      users: [
        { name: 'John Smith', position: 'CEO, Life 2.0', avatar: 'https://www.gravatar.com/avatar/1' }
      ]
    },
    {
      name: 'Tech Enthusiasts',
      users: [
        { name: 'John Smith', position: 'CEO, Life 2.0', avatar: 'https://www.gravatar.com/avatar/1' }
      ]
    },
    {
      name: 'Tech Enthusiasts',
      users: [
        { name: 'John Smith', position: 'CEO, Life 2.0', avatar: 'https://www.gravatar.com/avatar/1' }
      ]
    },
    {
      name: 'Tech Enthusiasts',
      users: [
        { name: 'John Smith', position: 'CEO, Life 2.0', avatar: 'https://www.gravatar.com/avatar/1' }
      ]
    },
    {
      name: 'Tech Enthusiasts',
      users: [
        { name: 'John Smith', position: 'CEO, Life 2.0', avatar: 'https://www.gravatar.com/avatar/1' }
      ]
    },
    {
      name: 'Tech Enthusiasts',
      users: [
        { name: 'John Smith', position: 'CEO, Life 2.0', avatar: 'https://www.gravatar.com/avatar/1' }
      ]
    },
    {
      name: 'Tech Enthusiasts',
      users: [
        { name: 'John Smith', position: 'CEO, Life 2.0', avatar: 'https://www.gravatar.com/avatar/1' }
      ]
    },
    // Add more communities here
  ];

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
    <View>
      <AppBar />
      <View style={styles.container}>
        <Text style={styles.date}>{currentDate}</Text>
        <Text style={styles.greeting}>{greeting}</Text>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search communities"
            placeholderTextColor="#888"
          />
          <TouchableOpacity onPress={() => handleSearch()}>
            <Image
              source={require('./assets/icons/searchicon.png')} // Replace with your custom search icon path
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.subHeader}>
          <Text style={styles.communities}>Communities for you</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View all >></Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {communities.map((community, index) => (
            <CommunityCard key={index} communityName={community.name} users={community.users} />
          ))}
        </ScrollView>
        <View style={styles.subHeader}>
          <Text style={styles.events}>Events for You</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View all >></Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {events.map((event, index) => (
            <EventCard
              key={index}
              eventName={event.eventName}
              date={event.date}
              eventImage={event.eventImage}
            />
          ))}
        </ScrollView>
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
