import React, { useState } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { KEYS } from '../../constants'

const LocationSelect = ({ field, setFieldValue, setFieldTouched }) => {
  const [selectedPlaces, setSelectedPlaces] = useState([{}])

  const handlePlaceSelection = (newPlace) => {
    const updatedPlaces = [...selectedPlaces, newPlace].filter((place) => Object.keys(place).length !== 0)
    console.log('UPDATED PLACES', updatedPlaces)
    setSelectedPlaces(updatedPlaces)
    setTimeout(() => {
      setFieldTouched(field.name)
    }, 0)
    setFieldValue(field.name, updatedPlaces)
  }

  const addMorePlace = () => {
    setSelectedPlaces([...selectedPlaces, {}])
  }

  return (
    <View>
      <Text style={{ marginBottom: 8 }}>{field.label}</Text>
      {field.multiple ? (
        selectedPlaces.map((place, index) => (
          <GooglePlacesAutocomplete
            key={index}
            placeholder='Select'
            disableScroll={true}
            isRowScrollable={false}
            listViewDisplayed={false}
            fetchDetails={true}
            styles={locationDropdownStyles}
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
          placeholder={field.placeholder}
          disableScroll={true}
          isRowScrollable={false}
          listViewDisplayed={false}
          fetchDetails={true}
          styles={locationDropdownStyles}
          query={{ key: KEYS.googleApiKey }}
          onPress={(data, details) => {
            const place = { name: data.description, geolocation: details.geometry.location }
            setFieldValue(field.name, place)
          }}
          onFail={(error) => console.log('MAP ERROR', error)}
          onNotFound={() => console.log('MAP', 'no results')}
        />
      )}
      {field.multiple && (
        <Button color='#333' title="+ Add More" onPress={addMorePlace} />
      )}
    </View>
  )
}

export { LocationSelect }

const locationDropdownStyles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomStartRadius: 10,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopStartRadius: 10
  },
})
