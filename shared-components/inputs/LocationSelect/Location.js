import React, { useState } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { KEYS } from '../../constants'

const LocationSelect = ({ label, multiple, styles, onLoationSelect }) => {
  const [selectedPlaces, setSelectedPlaces] = useState([{}])


  const handleSinglePlaceSelection = (place) => {
    onLoationSelect(place)
  }

  const handlePlaceSelection = (newPlace) => {
    const updatedPlaces = [...selectedPlaces, newPlace].filter((place) => Object.keys(place).length !== 0)
    setSelectedPlaces(updatedPlaces)
    onLoationSelect(updatedPlaces)
  }

  const addMorePlace = () => {
    setSelectedPlaces([...selectedPlaces, {}])
  }

  return (
    <View style={styles.container} key={label}>
      {label && <Text style={styles.label}>{label}</Text> }
      {multiple ? (
        selectedPlaces.map((place, index) => (
          <GooglePlacesAutocomplete
            key={index}
            placeholder='Select'
            disableScroll={true}
            isRowScrollable={false}
            listViewDisplayed={false}
            fetchDetails={true}
            styles={styles.dropdown}
            query={{ key: KEYS.googleApiKey }}
            onPress={(data, details) => {
                const place = { name: data.description, geolocation: details.geometry.location }
                handlePlaceSelection(place)
              }
            }
            onFail={(error) => console.log('MAP ERROR', error)}
            onNotFound={() => console.log('MAP', 'no results')}
          />
        ))
      ) : (
        <GooglePlacesAutocomplete
          placeholder='Select'
          disableScroll={true}
          isRowScrollable={false}
          listViewDisplayed={false}
          fetchDetails={true}
          styles={styles.dropdown}
          query={{ key: KEYS.googleApiKey }}
          onPress={(data, details) => {
            const place = { name: data.description, geolocation: details.geometry.location }
            handleSinglePlaceSelection(place)
          }}
          onFail={(error) => console.log('MAP ERROR', error)}
          onNotFound={() => console.log('MAP', 'no results')}
        />
      )}
      {multiple && (
        <Button color='#333' title="+ Add More" onPress={addMorePlace} />
      )}
    </View>
  )
}

export { LocationSelect }

