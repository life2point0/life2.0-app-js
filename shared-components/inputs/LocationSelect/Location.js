import React, { useState, useRef, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { KEYS } from '../../constants'
import { IconButton, Modal, Portal } from 'react-native-paper'
import { TextInput } from "react-native"
import Button from '../../button/Button'

const LocationSelect = ({ label, multiple, refId, styles, preSelectedLocation, onLocationSelect }) => {
  const [selectedPlaces, setSelectedPlaces] = useState([{}])
  const [selectedPlace, setSelectedPlace] = useState({})
  const [visible, setVisible] = useState(false)
  const googlePlacesAutocompleteRef = useRef(null)
  const [activeAutocompleteIndex, setActiveAutocompleteIndex] = useState(null);

  useEffect(() => {
    if (visible && googlePlacesAutocompleteRef.current) {
      googlePlacesAutocompleteRef.current.setAddressText('')
      googlePlacesAutocompleteRef.current.focus()
    }
  }, [visible])

  useEffect(() => {
    if(!!preSelectedLocation) {
      if(multiple && preSelectedLocation?.length) {
        const updatedPlaceIds = preSelectedLocation?.map((place) => place.place_id)
        onLocationSelect(updatedPlaceIds)
        setSelectedPlaces(preSelectedLocation) 
      } else if (preSelectedLocation) {
        setSelectedPlace(preSelectedLocation)
        onLocationSelect(selectedPlace?.place_id)
      }
    } 
  }, [])

  const handleSinglePlaceSelection = (place) => {
    setSelectedPlace(place)
    onLocationSelect(place.place_id)
    setVisible(false)
  }

  const handlePlaceSelection = (newPlace, index) => {
    const updatedPlaces = [...selectedPlaces];
    const existingIndex = updatedPlaces.findIndex(place => place.place_id === newPlace.place_id);
    console.log('index', index)
    if (index >= 0 && index < updatedPlaces.length) {
      updatedPlaces[index] = newPlace;
    } else if (existingIndex === -1) {
      updatedPlaces.push(newPlace);
    }
    const filteredPlaces = updatedPlaces.filter((place) => Object.keys(place).length !== 0);
    setSelectedPlaces(filteredPlaces);
    const updatedPlaceIds = filteredPlaces.map((place) => place.place_id);
    onLocationSelect(updatedPlaceIds);
    setVisible(false);
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
        styles={styles.dropdown}
        query={{ key: KEYS.googleApiKey, type: '(cities)' }}
        onPress={(data) => {
          const place = { name: data.description, place_id: data.place_id }
          multiple ? handlePlaceSelection(place, activeAutocompleteIndex) : handleSinglePlaceSelection(place)
        }}
        // predefinedPlaces={ [{ place_id: selectedPlaces[activeAutocompleteIndex] }]}
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
        selectedPlaces.map(({}, index) => (
          <React.Fragment key={index}>
            <TextInput
              value={selectedPlaces[index]?.name}
              style={{ ...styles.textField, marginBottom: 8 }}
              placeholder='Select'
              onFocus={() => { 
                setActiveAutocompleteIndex(index)
                setVisible(true)
              }}
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
            ref={refId}
            onFocus={() => setVisible(true)}
            placeholder='Select'
          />
          <Portal>
            <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={containerStyle}>
              <ScrollView keyboardShouldPersistTaps='always'>
                <View style={styles.container}>
                  {renderGooglePlacesAutocomplete(selectedPlace.place_id || null)}
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
