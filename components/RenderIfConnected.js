import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import Button from '../shared-components/button/Button';

const RenderIfConnected = ({ children }) => {
  const [isConnected, setIsConnected] = useState(null);
  const [isFirstConnectEstablished, setIsFirstConnectEstablished] = useState(false);

  const checkConnection = useCallback(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        setIsFirstConnectEstablished(true);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = checkConnection();
    return () => unsubscribe();
  }, [checkConnection]);

  const handleRetry = () => {
    checkConnection();
  };

  const renderDisconnectedView = () => (
    <View style={styles.disconnectedContainer}>
      <IconButton icon="wifi-off" size={200} />
      <Text>Looks like you aren't connected the internet</Text>
      <Button onPress={handleRetry} style={styles.retryButton}>Retry</Button>
      {/* Place your custom 'disconnected' illustration here */}
    </View>
  );

  if (!isFirstConnectEstablished) {
    // First connection not established, only show disconnected view
    return isConnected === false ? renderDisconnectedView() : null;
  }

  return (
    <View style={styles.container}>
      {isConnected === false && renderDisconnectedView()}
      {/* Render children but hide them if not connected */}
      <View style={isConnected ? styles.visible : styles.hidden}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  disconnectedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  visible: {
    flex: 1,
  },
  hidden: {
    flex: 1,
    display: 'none',
  },
  retryButton: {
    marginBottom: 100,
    marginTop: 30,
  }
});

export default RenderIfConnected;
