import React, {useState, useEffect} from 'react';
import {PermissionsAndroid, Text, StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';

const requestPermissions = async () => {
  try {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ];
    const results = await PermissionsAndroid.requestMultiple(permissions);
    const allGranted = permissions.every(
      permission => results[permission] === PermissionsAndroid.RESULTS.GRANTED,
    );
    return allGranted;
  } catch (err) {
    console.warn(err);
  }
};

const WebRTCScreen = props => {
  const [granted, setGranted] = useState(false);
  useEffect(() => {
    const checkPermission = async () => {
      const results = await requestPermissions();
      setGranted(results);
    };
    checkPermission();
  }, []);
  return granted === true ? (
    <WebView
      style={StyleSheet.absoluteFill}
      source={{uri: props.url}}
      ref={props.webRTCRef}
      onLoad={async event => {
        const {nativeEvent} = event;
        const {url} = nativeEvent;
        console.log(`current url: ${url}`);
      }}
    />
  ) : (
    <Text>Permission denied</Text>
  );
};
export default WebRTCScreen;
