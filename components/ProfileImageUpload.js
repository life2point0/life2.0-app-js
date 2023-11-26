import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image, KeyboardAvoidingView } from 'react-native'
import { ActivityIndicator, IconButton, useTheme } from 'react-native-paper'
import {  USER_SERVICE_BASE_URL } from './constants'
import { useAuth } from '../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import Button from '../shared-components/button/Button'
import axios from 'axios'
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'

export default ProfileImageUpload = () => {
  
  const { authCall, profile, getProfile } = useAuth()
  const { navigate } = useNavigation()
  const theme = useTheme()
  const [errorText, setErrorText] = useState('')
  const [images, setImages] = useState([{}, {}, {}, {}, {}])
  const [isImageSubmitting, setImageSubmitting] = useState(false)


  useEffect(() => {
    if (profile?.photos.length) {
      const filledImages = profile.photos.concat(Array(5 - profile.photos.length).fill(null).map(() => ({})))
      setImages(filledImages);
    }    
  }, [])

  const pickImage = async (index) => {
    images[index].uploading = true
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.75,
    })

    if (!result.canceled) {
      const newImage = await resizeImage(result.assets[0].uri, 200, 200)
      const updatedImageList = [...images]
      const s3Info = await getSignedURL()
      updatedImageList[index].uploadInfo = s3Info[0]
      updatedImageList[index].url = newImage
      await handleImageUpload(index, updatedImageList)
    }
  }

  async function resizeImage(imageUri, newWidth, newHeight) {
    const manipResult = await manipulateAsync(
        imageUri,
        [{ resize: { width: newWidth, height: newHeight } }],
        { compress: 1, format: SaveFormat.PNG }
    )
    return manipResult.uri
  }

  const handleImageUpload = async (index, updatedImages) => {
    const presignedS3Url = updatedImages[index].uploadInfo.url
    const file = await convertUriToFormData(updatedImages[index].url)
    try {
      await axios.put(presignedS3Url,file
      ,{
        headers: {
          'Content-Type': 'image/jpeg'
        },
        transformRequest: [(data) => data]
      })
      images[index].uploading = false
      setImages(updatedImages)
    } catch (e) {
      setErrorText(e?.response?.data?.detail?.msg || 'Unkown Error' )
    }
  }

  const removeImage = (index) => {
    const updatedImageList = [...images]
    updatedImageList[index] = {}
    setImages(updatedImageList)
  }  

  const getSignedURL = async () => {
    try {
        const s3Info =  await authCall({
            method: 'GET',
            url: `${USER_SERVICE_BASE_URL}/users/me/photos/upload-urls`
        })
      return s3Info.data
    } catch(e) {
        setErrorText(e?.response?.data?.detail?.msg || 'Unknown Error' )
        return
    } 
  }

  const convertUriToFormData = async (uri) => {
    const file = await fetch(uri)
    const blob = await file.blob()
    return blob
  }

  const updateProfile = async () => {
    const imageIds = images.map(item => item.uploadInfo ? item.uploadInfo.id : (item.id ? item.id : null)).filter(id => id !== null)
    const data = { photos : imageIds }
    try {
        setImageSubmitting(true)
        await authCall({
          method: 'PATCH',
          url: `${USER_SERVICE_BASE_URL}/users/me`,
          data
        })
        await getProfile()
        navigate('Main', { screen: 'Home' })
      } catch (e) {
        setErrorText(e?.response?.data?.detail?.msg || 'Unknown Error' )
      } finally {
          setImageSubmitting(false)
    }
  }

  return (
    <SafeAreaView style={{flex: 1, height: '100%', justifyContent: 'space-between' }}>
        <View style={theme.spacing.onboarding.headerContainer}>
          <Text style={theme.fonts.title}> Add Profile Pics </Text>
          <IconButton
            icon="arrow-left"
            style={theme.spacing.backButton}
            onPress={() => navigate('Main', { screen: 'UpdateProfile' })}
          />
       </View>
        <View style={{ ...theme.spacing.onboarding.container }}>

          {errorText && (
            <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
              <IconButton
                icon="alert-circle"
                iconColor='darkred'
                size={20}
              />
              <Text style={{color: 'darkred'}}>{errorText}</Text>
            </View>
          )}

          <Text style={{ ...theme.spacing.onboarding.textContainer, ...theme.fonts.description }}>
              Add pictures that show your lifestyle. And people who matter in your life!
          </Text>

          <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap', width: '100%' }}>
              {images.map((image, index) => (
                <View key={index} style={{ backgroundColor: '#F6F6F6', borderColor: '#C6C6C6', borderStyle: 'dashed', borderWidth: image.url ? 0 : 1, width: 100, height: 100, position: 'relative' }}>
                  {image.url && (
                  <>
                  <Image source={{ uri: image.url }} style={{  borderRadius: 8, width: '100%', height: '100%' }} />
                    <IconButton onPress={() => removeImage(index)} style={{ position: 'absolute', top: -5, right: -5, zIndex: 2 }} icon="close-circle" iconColor='black' size={20} />
                  </>
                  )}
                  {!image.url && <IconButton onPress={() => pickImage(index)} style={{ position: 'absolute', bottom: -5, right: -5, zIndex: 2 }} icon="plus-circle" iconColor='black' size={20} />}
                  {image.uploading && <ActivityIndicator style={{alignSelf: 'center', width: '100%', position: 'absolute', margin: 'auto', top: 0, bottom: 0, left: 0, right: 0,  zIndex: 100}} animating={true} color="black" /> }
                </View>
              ))}
          </View>

          <View style={{ width: '100%', flexDirection: 'column', gap: 10, position: 'absolute', bottom: 150 }} >
              { !profile?.photos?.length && <Button mode="outlined" onPress={() => navigate('Main', { screen: 'Home' })}>
                  Complete Later
                </Button>   
              }
              <Button mode="contained" onPress={updateProfile} loading={isImageSubmitting} disabled={isImageSubmitting}>
                  Next
              </Button>   
          </View>
          
        </View>
    </SafeAreaView>
  )
}
