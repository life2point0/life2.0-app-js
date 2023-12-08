import React, { useEffect, useState, useMemo } from 'react'
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native'
import { Avatar, Card, IconButton, useTheme  } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../contexts/AuthContext'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import AvatarGroup from './AvatarGroup'
import defaultCommunityIcon from './assets/community.png'
import { useChatContext,  } from 'stream-chat-expo'
import { USER_SERVICE_BASE_URL } from './constants'
import Button from '../shared-components/button/Button'
import { useData } from '../contexts/DataContext'
import AppBar from './AppBar'
import * as _ from 'lodash';


const Communities = ({isSliider, route}) => {
  const { isTextInputFocused } = route?.params || {}
  const theme = useTheme();
  const [isLoading, setLoading] = useState(false);
  const { communities, filteredCommunities, filterCommunities, filterQuery } = useData();
  const [searchQueryText, setSearchQueryText ] = useState();
  const communityList = isSliider ? communities : filteredCommunities

  const getFilteredCommunities = async () => {
    setLoading(true);
    await filterCommunities(searchQueryText);
    setLoading(false);
  }

  const debouncedGetFilteredCommunities = useMemo(() => _.debounce(() => getFilteredCommunities(searchQueryText), 300), [searchQueryText]);

  useEffect(() => {
    setSearchQueryText(filterQuery);
  }, []);

  useEffect(() => {
    debouncedGetFilteredCommunities();
    return () => debouncedGetFilteredCommunities.cancel();
  }, [searchQueryText]);

  return (
    <> 
    { !isSliider && <AppBar title="Communities" showBackButton /> }
      <SafeAreaView style={{ flex: 1, marginBottom: 30 }}>
        <View style={!isSliider ? theme.spacing.communities.screen.container : null}>
        { !isSliider &&  <View style={theme.spacing.communities.screen.section}>
          <TextInput
            style={theme.components.inputs.textField}
            placeholder="Search communities"
            placeholderTextColor="#888"
            autoFocus= {isTextInputFocused ? true : false}
            defaultValue={searchQueryText}
            onChangeText={(value) => setSearchQueryText(value)}
            />
          <TouchableOpacity onPress={() => getFilteredCommunities()}>
            <Image
              source={require('./assets/icons/searchicon.png')}
              style={theme.spacing.home.searchIcon}
            />
          </TouchableOpacity>
          </View>
        }

        {isLoading ? (
          <View>
            <SkeletonCard />
            <SkeletonCard />
          </View>
        ): (
          <ScrollView style={theme.spacing.home.sliderContainer} showsHorizontalScrollIndicator={false}>
            {communityList.length > 0 ? 
              communityList.map((community) => (
                <CommunityCard styles={theme.spacing.communities.screen.card} key={community.id} community={community} members={community.members}/>
              )) :
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <IconButton icon="information-outline" size={50} />
                <Text style={{...theme.fonts.subtitle, textAlign: 'center'}}>Oops! No Communities Found.</Text>
                <Text style={{...theme.fonts.description, textAlign: 'center', marginTop: 5}}>It appears there are no communities that match your search criteria.</Text>
                <Text style={{...theme.fonts.description, textAlign: 'center', marginTop: 5}}>Feel free to refine your search or explore our existing communities for alternative choices.</Text>
              </View>
            }
          </ScrollView> 
        )}
        </View>
    </SafeAreaView>
    </>
  )
}


const CommunityCard = ({ community, members, isSliider, styles }) => {
    const navigation = useNavigation()
    const { client, setActiveChannel } = useChatContext()
    const { authCall, isProfileCreated, profile } = useAuth()
    const [isNavigating, setIsNavigating] = useState(false)
    const theme = useTheme()

    const icon= community.photo.url ? {uri: community.photo.url} : defaultCommunityIcon
    const createAndWatchChannel = async (id) => {
      const newChannel = client.channel('community', id)
      await newChannel.watch()
      setActiveChannel(newChannel)
    }

    const handleNavigation = async (communityId) => {
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

    const communityMemberAvatars = members.map(member => ({
      icon: member.profilePhoto,
      initials: `${member.firstName.charAt(0)}${member.lastName.charAt(0)}`
    }))
    
    return (
        <Card mode="contained" style={{...styles.container, width: isSliider ? 275 : '100%' }} >
            <Text ellipsizeMode='tail' numberOfLines={1} style={{...theme.fonts.subtitle, paddingHorizontal: 8}}> {community.name} </Text>
            <View style={styles.content}>
                <Avatar.Image source={icon} style={styles.avatar} />
                <Text ellipsizeMode='tail' numberOfLines={2} style={{...theme.fonts.description, width: '75%' }}>{community.description}</Text>
            </View>
  
            <View style={styles.footer}>
                <View style={{ gap: 5 }}>
                  <Text style={theme.fonts.small}> Join the conversation </Text>
                  <AvatarGroup users={communityMemberAvatars} />
                </View>
                <Button compact labelStyle={styles.footerButton} onPress={() => handleNavigation(community.id)} mode="contained" loading={isNavigating} disabled={isNavigating}> Join Chat </Button>
            </View>
        </Card>
    )
}



const SkeletonCard = () => {
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
    )
}

export default Communities