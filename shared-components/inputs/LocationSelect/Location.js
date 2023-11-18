import React, { useState, useRef, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { KEYS } from '../../constants'
import { IconButton, Modal, Portal } from 'react-native-paper'
import { TextInput } from "react-native"
import Button from '../../button/Button'

const LocationSelect = ({ label, multiple, styles, preSelectedLocation, onLocationSelect }) => {
  const [selectedPlaces, setSelectedPlaces] = useState([{}])
  const [selectedPlace, setSelectedPlace] = useState({})
  const [visible, setVisible] = useState(false)
  const googlePlacesAutocompleteRef = useRef(null)



  useEffect(() => {
    if (visible && googlePlacesAutocompleteRef.current) {
      googlePlacesAutocompleteRef.current.setAddressText('')
      googlePlacesAutocompleteRef.current.focus()
    }
  }, [visible])

  // useEffect(() => {
  //   if(!!preSelectedLocation) {
  //     multiple ? setSelectedPlaces(preSelectedLocation) : setSelectedPlace(preSelectedLocation)
  //   } 
  // }, [])

  const handleSinglePlaceSelection = (place) => {
    setSelectedPlace(place)
    onLocationSelect(place.placeId)
    setVisible(false)
  }

  const handlePlaceSelection = (newPlace) => {
    const updatedPlaces = [...selectedPlaces, newPlace].filter((place) => Object.keys(place).length !== 0)
    setSelectedPlaces(updatedPlaces)
    const updatedPlaceIds = updatedPlaces.map((place) => place.placeId)
    console.log('updatedPlaceids', updatedPlaceIds)
    onLocationSelect(updatedPlaceIds)
    setVisible(false)
  }

  const addMorePlace = () => {
    setSelectedPlaces([...selectedPlaces, {}])
  }

  const containerStyle = { backgroundColor: 'white', flex: 1 }

  const renderGooglePlacesAutocomplete = () => {
    return (
      <GooglePlacesAutocomplete
        placeholder='Search here'
        disableScroll={true}
        isRowScrollable={false}
        listViewDisplayed={false}
        fetchDetails={true}
        textInputProps={{
          autoFocus: true,
          selectTextOnFocus: true
        }}
        // predefinedPlaces={ preSelectedPlaceId ?  [{ place_id: preSelectedPlaceId }] : []}
        styles={styles.dropdown}
        query={{ key: KEYS.googleApiKey, type: '(cities)' }}
        onPress={(data) => {
          const place = { name: data.description, placeId: data.place_id }
          multiple ? handlePlaceSelection(place) : handleSinglePlaceSelection(place)
        }}
        // onFail={(error) => console.log('MAP ERROR', error)}
        // onNotFound={() => console.log('MAP', 'no results')}
        renderLeftButton={() => (
          <IconButton 
            icon="arrow-left" 
            size={26} 
            onPress={() => setVisible(false)}
            mode='contained'
            style={{
              alignSelf: 'center'
            }}
          />
        )}
      />
    )
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      {multiple ? (
        selectedPlaces.map((place, index) => (
          <React.Fragment key={index}>
            <TextInput
              value={selectedPlaces[index]?.name}
              style={{ ...styles.textField, marginBottom: 8 }}
              placeholder='Select'
              onFocus={() => setVisible(true)}
            />
            <Portal>
              <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={containerStyle}>
                <ScrollView keyboardShouldPersistTaps='always'>
                  <View style={styles.container}>
                    {renderGooglePlacesAutocomplete()}
                  </View>
                </ScrollView>
              </Modal>
            </Portal>
          </React.Fragment>
        ))
      ) : (
        <React.Fragment key={label}>
          <TextInput
            value={selectedPlace?.name}
            style={styles.textField}
            onFocus={() => setVisible(true)}
            placeholder='Select'
          />
          <Portal>
            <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={containerStyle}>
              <ScrollView keyboardShouldPersistTaps='always'>
                <View style={styles.container}>
                  {renderGooglePlacesAutocomplete()}
                </View>
              </ScrollView>
            </Modal>
          </Portal>
        </React.Fragment>
      )}
      {multiple && (
        <Button mode="text" compact style={styles.addMoreButton} onPress={addMorePlace}> + Add More </Button>
      )}
    </View>
  )
}

export { LocationSelect }
