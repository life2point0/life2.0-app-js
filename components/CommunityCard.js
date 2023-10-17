import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { PrimaryButton } from './PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import user1Image from './assets/user-1.png';
import user2Image from './assets/user-2.png';
import user3Image from './assets/user-3.png';
import user4Image from './assets/user-4.png';
import user5Image from './assets/user-5.png';
import AvatarGroup from './AvatarGroup';

const communityUsers = [
    { icon: user1Image },
    { icon: user2Image },
    { icon: user3Image },
    { icon: user4Image },
    { icon: user5Image },
];

const CommunityCard = ({ communityName, users = communityUsers, description, icon }) => {
    const { navigate } = useNavigation();

    const navigateToChats = () => {
        navigate('Main', {screen: 'Chats'});
    }

    return (
        <Card style={{ margin: 8, width: 300, backgroundColor: '#fff' }}>
            <Card.Title title={<Text style={{fontSize: 20}}>{communityName}</Text>} />
            <Card.Content>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: "100%", paddingBottom: 20 }}>
                <Avatar.Image source={icon} style={{ width: 64, height: 64, backgroundColor: '#fff' }} />
                <View style={{ marginLeft: 8, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text style={{ fontSize: 17, overflow: "hidden", letterSpacing: 0.1, lineHeight: 25 }} numberOfLines={3} ellipsizeMode='tail'>{description}</Text>
                </View>
            </View>
            </Card.Content>
            <View style={{ backgroundColor: '#FFFCF2' }}>
            <Card.Actions style={{borderRadius: 90, alignItems: 'flex-end'}}>
            <View>
                <Text style={{paddingVertical: 10, fontSize: 16}}>Join Conversation</Text>
                <AvatarGroup users={users} />
            </View>
             <PrimaryButton onPress={navigateToChats} style={{ marginLeft: 'auto' }}>Join Chat</PrimaryButton>
            </Card.Actions>
            </View>
        </Card>
    );
}



export const SkeletonCard = () => {
    return (
      <View style={{ margin: 10, padding: 16, borderRadius: 4, backgroundColor: "#e0e0e0", width: 300 }}>
        <SkeletonPlaceholder.Item 
          height={20}
          marginBottom={16}
          backgroundColor="#cccccc"
        />
  
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item 
            width={50} 
            height={50} 
            borderRadius={25} 
            marginRight={16}
            backgroundColor="#cccccc"
          />
          <SkeletonPlaceholder.Item flex={1}>
            <SkeletonPlaceholder.Item height={15} marginBottom={5} backgroundColor="#cccccc"/>
            <SkeletonPlaceholder.Item height={15} marginBottom={5} backgroundColor="#cccccc"/>
            <SkeletonPlaceholder.Item height={15} marginBottom={5} backgroundColor="#cccccc"/>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
  
        {/* Footer */}
        <SkeletonPlaceholder.Item 
          height={20} 
          marginTop={16} 
          backgroundColor="#cccccc"
        />
      </View>
    );
  };

export default CommunityCard;