import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-paper';

const AvatarGroup = ({ users }) => {
  return (
    <View style={styles.avatarGroup}>
      {users.slice(0, 5).map((user, index) => (
        <View key={index} style={[styles.avatarContainer, { zIndex: users.length - index }]}>
          <Avatar.Image 
            key={index}
            size={35}
            source={user.icon}
          />
        </View>
      ))}
    <View style={styles.extraUsers}>
        <Text style={styles.extraUsersText}>+{parseInt(Math.random()*100)}</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: -20,
  },
  extraUsers: {
    marginLeft: 22,
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extraUsersText: {
    color: '#0e0e0e',
  },
});

export default AvatarGroup;
