import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { KEYS } from '../../constants'

const LocationSelect = ({ field, setFieldValue }) => {
  return (
    <>
      <Text style={{ marginBottom: 8 }}>{field.label}</Text>
      <GooglePlacesAutocomplete
          placeholder={field.placeholder}
          disableScroll={true}
          isRowScrollable={false}
          listViewDisplayed={false}
          fetchDetails={true}
          styles={locationDropdownStyles}
          query={{ key: KEYS.googleApiKey }}
          onPress={(data, details) => {
            setFieldValue(field.name, { "name": data.description, "geolocation": details.geometry.location })
          }}
          onFail={error => console.log('MAP ERROR', error)}
          onNotFound={() => console.log('MAP', 'no results')}
        />
    </>
  );
};

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
    }
});