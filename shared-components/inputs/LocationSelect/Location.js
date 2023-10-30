import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { KEYS } from '../../constants'
import { Modal, Portal } from 'react-native-paper'
import { TextInput } from "react-native"
import { PrimaryButton } from '../../../components/PrimaryButton'

const LocationSelect = ({ label, multiple, styles, onLocationSelect }) => {
  const [selectedPlaces, setSelectedPlaces] = useState([{}])
  const [selectedPlace, setSelectedPlace] = useState({})
  const [visible, setVisible] = useState(false)

  const handleSinglePlaceSelection = (place) => {
    setSelectedPlace(place)
    onLocationSelect(place)
    setVisible(false)
  }

  const handlePlaceSelection = (newPlace) => {
    const updatedPlaces = [...selectedPlaces, newPlace].filter((place) => Object.keys(place).length !== 0)
    setSelectedPlaces(updatedPlaces)
    onLocationSelect(updatedPlaces)
    setVisible(false)
  }

  const addMorePlace = () => {
    setSelectedPlaces([...selectedPlaces, {}])
  }

  const containerStyle = { backgroundColor: 'white', flex: 1 }

  const renderGooglePlacesAutocomplete = () => {
    return (
      <GooglePlacesAutocomplete
        placeholder='Type'
        disableScroll={true}
        isRowScrollable={false}
        listViewDisplayed={false}
        fetchDetails={true}
        styles={styles.dropdown}
        query={{ key: KEYS.googleApiKey }}
        onPress={(data, details) => {
          const place = { name: data.description, geolocation: details.geometry.location }
          multiple ? handlePlaceSelection(place) : handleSinglePlaceSelection(place)
        }}
        onFail={(error) => console.log('MAP ERROR', error)}
        onNotFound={() => console.log('MAP', 'no results')}
      />
    )
  }

  return (
    <View style={styles.container} key={label}>
      {label && <Text style={styles.label}>{label}</Text>}
      {multiple ? (
        selectedPlaces.map((place, index) => (
          <>
            <TextInput
              value={selectedPlaces[index]?.name}
              style={styles.textField}
              placeholder='Select'
              onFocus={() => setVisible(true)}
            />
            <Portal>
              <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={containerStyle}>
                <ScrollView keyboardShouldPersistTaps='always'>
                  <View style={styles.container} key={selectedPlaces[index]?.name || label}>
                    {renderGooglePlacesAutocomplete()}
                  </View>
                </ScrollView>
              </Modal>
            </Portal>
          </>
        ))
      ) : (
        <>
          <TextInput
            value={selectedPlace?.name}
            style={styles.textField}
            onFocus={() => setVisible(true)}
            placeholder='Select'
          />
          <Portal>
            <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={containerStyle}>
              <ScrollView keyboardShouldPersistTaps='always'>
                <View style={styles.container} key={label}>
                  {renderGooglePlacesAutocomplete()}
                </View>
              </ScrollView>
            </Modal>
          </Portal>
        </>
      )}
      {multiple && (
        <PrimaryButton mode="text" style={styles.addMoreButton} onPress={addMorePlace}> + Add More </PrimaryButton>
      )}
    </View>
  )
}

export { LocationSelect }
