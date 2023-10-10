import AppBar from './AppBar';
import { View, Text, ScrollView } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import CommunityCard from './CommunityCard';


const HomeScreen = () => {

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

  return (
    <View>
        <AppBar/>
        <View style={{ padding: 16, alignItems: 'flex-start', justifyContent: 'flex-start'}}>
            <Text>Hey there!</Text>
            <Text>Communities for you</Text>
            <ScrollView horizontal>
                {communities.map((community, index) => (
                    <CommunityCard key={index} communityName={community.name} users={community.users} />
                ))}
            </ScrollView>
        </View>
    </View>
  );
};

export default HomeScreen;