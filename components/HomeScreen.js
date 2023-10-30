import React, { useEffect, useState } from 'react';
import AppBar from './AppBar';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import CommunityCard, { SkeletonCard } from './CommunityCard';
import eventImage from './assets/events-coming-soon.png';
import opportunitiesImage from './assets/opportunities-coming-soon.png';
import adsImage from './assets/ads-coming-soon.png';
import axios from 'axios';
import { USER_SERVICE_BASE_URL } from './constants';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [communities, setCommunities] = useState([]);
  const [isCommunitiesLoading, setCommunitiesLoading] = useState(false);
  const { profile } = useAuth();
  const navigation = useNavigation();


  const getCommunities = async () => {
    try {
        setCommunitiesLoading(true);
        const res = (await axios.get(`${USER_SERVICE_BASE_URL}/communities`)).data;
        setCommunities(res);
    } catch (e) {
        setCommunities([]);
    } finally {
      setCommunitiesLoading(false);
    }
  }

  useEffect(() => {
    getCommunities();
  }, []);

  return (
    <ScrollView style={{backgroundColor: '#fbfbfb'}} stickyHeaderIndices={[0]}>
      <AppBar/>
      <View style={styles.container}>
        <Text style={styles.Welcome }>{profile && `Hey ${profile?.firstName}, `} Welcome to Dubai!</Text>
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
          <TouchableOpacity onPress={() => navigation.push('Main', {screen: 'Chats'})}>
            <Text style={styles.viewAll}>View all &gt; &nbsp;</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {isCommunitiesLoading ? (
            <SkeletonCard />
          ) :  communities.map((community) => (
            <CommunityCard key={community.channel.id} community={community.channel} users={community.members}/>
          ))}
        </ScrollView>
        <View style={styles.subHeader}>
          <Text style={styles.events}>Events for You</Text>
        </View>
        <View>
            <Image source={eventImage} style={{maxWidth: '100%', maxHeight: 250, aspectRatio: 6/4}} />
        </View>
        <View style={styles.subHeader}>
          <Text style={styles.events}>Opportunities for You</Text>
        </View>
        <View>
            <Image source={opportunitiesImage} style={{maxWidth: '100%', maxHeight: 250, aspectRatio: 6/4}} />
        </View>
        <View style={styles.subHeader}>
          <Text style={styles.events}>Ads for You</Text>
        </View>
        <View>
            <Image source={adsImage} style={{maxWidth: '100%', maxHeight: 250, aspectRatio: 6/4}} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  Welcome: {
    fontSize: 20,
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
