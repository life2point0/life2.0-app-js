import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-paper';

const AvatarGroup = ({ users }) => {
  return (
    <View style={styles.avatarGroup}>
      {users.slice(0, 5).map((user, index) => (
        <View key={index} style={[styles.avatarContainer, { zIndex: users.length - index }]}>
          {user.icon && <Avatar.Image 
            size={35}
            source={user.icon}
          />}
          {!user.icon && 
            <View style={{ width: 35, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 35, borderWidth: 1, borderColor: '#fff', backgroundColor: '#333' }}> 
              <Text style={{ color: '#fff' }}> {user.initials} </Text> 
            </View>
          }
        </View>
      ))}
    { users.length > 5 && 
      <View style={styles.extraUsers}>
        <Text style={styles.extraUsersText}> + {users.length - 5 }</Text>
      </View>
    }
    </View>
  );
};

const styles = StyleSheet.create({
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: -10,
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
