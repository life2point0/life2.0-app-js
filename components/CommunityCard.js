import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { PrimaryButton } from './PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

const CommunityCard = ({ communityName, users, description, icon }) => {
    const { navigate } = useNavigation();
    const { isAuthenticated, isProfileCreated } = useAuth();

    const joinOrSignup = () => {
        if (!isAuthenticated) {
            navigate('Signup');
        } else if (!isProfileCreated) {
            navigate('UpdateProfile');
        } else {
            navigate('Main', {screen: 'Chats'});
        }
    }

    return (
        <Card style={{ margin: 8, width: 250 }}>
            <Card.Title title={<Text style={{fontSize: 20}}>{communityName}</Text>} />
            <Card.Content>
            <View style={{ flexDirection: 'row', alignItems:'stretch', width:"100%"}}>
                <Avatar.Image size={70} source={{ uri: users[0]?.icon}} />
                <View style={{ marginLeft: 8, alignItems: 'center' , justifyContent:'center'} }>
                {/* <Text style={{fontSize: 20}}>{icon}</Text> */}
                <Text style={{fontSize: 16 , overflow:"hidden"}} numberOfLines={3} ellipsizeMode='tail'>{description }</Text>

                </View>
            </View>
            </Card.Content>
            <Card.Actions>
            
            <Avatar.Icon size={24} icon="account-multiple" />
            <Text>+{(users?.length || 24) - 1}</Text>
            <PrimaryButton onPress={joinOrSignup} style={{ marginLeft: 'auto' }}>Join Now</PrimaryButton>
            </Card.Actions>
        </Card>
    );
}

export default CommunityCard;