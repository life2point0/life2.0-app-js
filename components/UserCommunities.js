import { useAuth } from "../contexts/AuthContext";
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { Avatar, Badge } from 'react-native-paper';
import { useChatContext } from 'stream-chat-expo';

export const UserCommunities = () => {
    const { initChat, profile } = useAuth();
    const [channels, setChannels] = useState([]);
    const { client } = useChatContext();

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
  
    return (
      <ScrollView horizontal style={{padding: 12}}>
        {channels.map(channel => (
          <View style={{alignItems: 'center', width: 110, paddingRight: 10}}>
            <View style={[styles.avatarContainer]}>
              <Avatar.Image 
                key={channel.id}
                source={{ uri: channel.data.image }}
                size={80}
                style={{ marginHorizontal: 5, borderWidth: channel.countUnread() > 0 ? 2 : 0 }}
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
          </View>
        ))}
      </ScrollView>
    );
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