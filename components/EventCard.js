import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card } from 'react-native-paper';

const EventCard = ({ eventImage, eventName, date }) => (
    <Card style={{ margin: 8, width: 200 }}>
      <View style={styles.imageContainer}>
        <Image source={eventImage} style={styles.eventImage} />
      </View>
      <Card.Content>
        <Text>{eventName}</Text>
        <Text>Date: {date}</Text>
      </Card.Content>
    </Card>
  );
  
  const styles = {
    imageContainer: {
      alignItems: 'center', // Center the image horizontally
    },
    eventImage: {
      width: '100%',
      height: 150,
    },
  };
  
  export default EventCard;
