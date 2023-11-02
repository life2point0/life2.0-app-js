import React, { useState } from 'react';
import { View, Text } from 'react-native';
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
import defaultCommunityIcon from './assets/community.png'
import { useChatContext,  } from 'stream-chat-expo';
import { USER_SERVICE_BASE_URL } from './constants';

const communityUsers = [
    { icon: user1Image },
    { icon: user2Image },
    { icon: user3Image },
    { icon: user4Image },
    { icon: user5Image },
];

const CommunityCard = ({ community, users = communityUsers }) => {
    const navigation = useNavigation()
    const { client, setActiveChannel } = useChatContext()
    const { authCall, isProfileCreated, profile } = useAuth()
    const [isNavigating, setIsNavigating] = useState(false)


    const icon= community.image ? {uri: community.image} : defaultCommunityIcon

    const createAndWatchChannel = async (id) => {
      const newChannel = client.channel('community', id)
      await newChannel.watch();
      setActiveChannel(newChannel);
    }

    const navigateToChats = async (communityId) => {
      setIsNavigating(true)
      if(isProfileCreated) {
        try {
          await authCall({
            method: 'POST',
            url: `${USER_SERVICE_BASE_URL}/users/me/communities`,
            data: { communityId }
          })
          await createAndWatchChannel(community.id)
          setIsNavigating(false)
          navigation.navigate('Conversations')
        } catch (e) {
          setIsNavigating(false)
        }
      } else if(profile?.firstName) {
        navigation.navigate('UpdateProfile')
        setIsNavigating(false)
      } else {
        navigation.navigate('Signup')
        setIsNavigating(false)
      }

    }

    return (
        <Card elevation={1} mode="elevated" style={{ margin: 8, width: 275, borderWidth: 0, backgroundColor: '#fff', borderRadius: 10 }}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={{fontSize: 14, fontWeight: 'bold', paddingHorizontal: 10, paddingVertical: 5 }}>{community.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: "100%", paddingBottom: 5 }}>
                <Avatar.Image source={icon} style={{ width: 64, height: 64, backgroundColor: '#fff' }} />
                <View ellipsizeMode='tail' numberOfLines={3} style={{ marginLeft: 8, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <Text style={{ fontSize: 12, overflow: "hidden", letterSpacing: 0.1, lineHeight: 16 }} numberOfLines={3} ellipsizeMode='tail'>{community.description}</Text>
                </View>
            </View>
  
            <View style={{ backgroundColor: '#F2FFF2',  borderRadius: 10 }}>
              <Card.Actions style={{ paddingVertical: 5 }}>
                <View>
                  <Text style={{paddingVertical: 0, fontSize: 14}}>Join Conversation</Text>
                  <AvatarGroup users={communityUsers} />
                </View>
                <PrimaryButton onPress={() => navigateToChats(community.id)} style={{ marginLeft: 'auto', transform: [{scale: 0.8}] }} mode="contained" textColor='#FFC003' loading={isNavigating} disabled={isNavigating}> Join Chat </PrimaryButton>
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