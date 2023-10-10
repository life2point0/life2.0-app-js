import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';

const CommunityCard = ({ communityName, users }) => (
  <Card style={{ margin: 8, width: 200 }}>
    <Card.Title title={communityName} />
    <Card.Content>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Avatar.Image size={50} source={{ uri: users[0].avatar }} />
        <View style={{ marginLeft: 8 }}>
          <Text>{users[0].name}</Text>
          <Text>{users[0].position}</Text>
        </View>
      </View>
    </Card.Content>
    <Card.Actions>
      <Avatar.Icon size={24} icon="account-multiple" />
      <Text>+{users.length - 1}</Text>
      <Button style={{ marginLeft: 'auto' }}>Join Now</Button>
    </Card.Actions>
  </Card>
);

export default CommunityCard;