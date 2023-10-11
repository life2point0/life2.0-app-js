import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { PrimaryButton } from './PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

const CommunityCard = ({ communityName, users }) => {
    const { navigate } = useNavigation();
    const { isAuthenticated, isProfileCreated } = useAuth();

    const joinOrSignup = () => {
        if (!isAuthenticated) {
            navigate('Signup');
            return;
        }
        if (!isProfileCreated) {
            navigate('UpdateProfile');
        }
    }

    return (
        <Card style={{ margin: 8, width: 250 }}>
            <Card.Title title={<Text style={{fontSize: 20}}>{communityName}</Text>} />
            <Card.Content>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Avatar.Image size={70} source={{ uri: users[0]?.avatar || 'https://www.gravatar.com/avatar/1' }} />
                <View style={{ marginLeft: 8 }}>
                <Text style={{fontSize: 18}}>{users[0]?.name || 'Tabrez Ahmed'}</Text>
                <Text>{users[0]?.position || ''}</Text>
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