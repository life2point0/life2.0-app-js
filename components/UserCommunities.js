import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Badge } from 'react-native-paper';
import { useChatContext } from 'stream-chat-expo';

export const UserCommunities = () => {
    const { initChat, profile, isAuthenticated } = useAuth();
    const [channels, setChannels] = useState([]);
    const { client, setActiveChannel } = useChatContext();
    const { navigate } = useNavigation();

    const fetchChannels = async () => {
        const filter = {
            members: { $in: [client.userID] },
            type: 'community'
        };
        const sort = { last_message_at: -1 };
        
        const channels = await client.queryChannels(filter, sort, {
            watch: true,
            state: true,
        });
        console.log(channels[0]?.countUnread())
        return channels;
    };

    const initialize = async () => {
      await initChat();
      if (!client) return;
      setChannels(await fetchChannels());
    }

    useEffect(() => {
      if(profile?.id) {
        initialize();
      }
    }, [client, client?.userID, client?.wsConnection?.isHealthy, profile]);

    const navigateToCommunityChat = (channel) => {
      setActiveChannel(channel);
      navigate('Conversations');
    }
  
    if(isAuthenticated) {
      return (
        <ScrollView horizontal style={{padding: 12}}>
          {channels.map(channel => (
            <TouchableOpacity style={{alignItems: 'center', width: 110, paddingRight: 10}} key={channel.id} onPress={() => navigateToCommunityChat(channel)}>
              <View style={[styles.avatarContainer]}>
                <Avatar.Image 
                  source={{ uri: channel.data.image }}
                  size={80}
                  style={{ marginHorizontal: 5 }}
                />
                {channel.countUnread() > 0 && (
                  <Badge
                    size={20}
                    style={styles.badge}
                  >
                    {channel.countUnread()}
                  </Badge>
                )}
              </View>
              <Text style={{fontSize: 12, textAlign: 'center'}} numberOfLines={2} ellipsizeMode="tail">{channel.data.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )
    }
    return (
      <></>
    )

  };

  const styles = StyleSheet.create({
    avatarContainer: {
      padding: 0,
      marginRight: 10,
      position: 'relative',
      borderRadius: 40
    },
    badge: {
      position: 'absolute',
      bottom: 5,
      right: 5,
    },
    unreadBorder: {
      borderWidth: 4,
    }
  });