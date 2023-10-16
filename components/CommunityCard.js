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
        navigate('Main', {screen: 'Chats'});
    }

    return (
        <Card style={{ margin: 8, width: 250 }}>
            <Card.Title title={<Text style={{fontSize: 20}}>{communityName}</Text>} />
            <Card.Content>
            <View style={{ flexDirection: 'row', alignItems: 'stretch', width: "100%" }}>
                <Avatar.Image style={{ width: 45, height: 45 }}>{icon}</Avatar.Image>
                <View style={{ marginLeft: 8, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, overflow: "hidden" }} numberOfLines={3} ellipsizeMode='tail'>{description}</Text>
                </View>
            </View>
            
            
            </Card.Content>
            <View style={{ backgroundColor: '#FFFCF2' }}>
                <Card.Actions>
                
            <View style={{ marginHorizontal: -18 }}>
                <Avatar.Icon size={24} icon="account-multiple" />
            </View>
            <View style={{ marginHorizontal: -18 }}>
                <Avatar.Icon size={24} icon="account-multiple" />
            </View>
            <View style={{ marginHorizontal: -18 }}>
                <Avatar.Icon size={24} icon="account-multiple" />
            </View>
            <View style={{ marginHorizontal: -18 }}>
                <Avatar.Icon size={24} icon="account-multiple" />
            </View>
            <Text style={{ marginLeft: 20 }}>+{(users?.length || 24) - 1}</Text>
             <PrimaryButton onPress={joinOrSignup} style={{ marginLeft: 'auto' }}>Join Now</PrimaryButton>
            </Card.Actions>
            </View>
        </Card>
    );
}

export default CommunityCard;