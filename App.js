/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useRef} from 'react';
import {StatusBar, View, TextInput, Button} from 'react-native';
import WebRTCScreen from './src/WebRTCScreen';

const App: () => React$Node = () => {
  const defaultUrl = 'https://apprtc-m.appspot.com/';
  const [value, setValue] = useState(defaultUrl);
  const [url, setUrl] = useState(defaultUrl);
  const webViewRef = useRef(null);

  const reloadUrl = () => {
    if (webViewRef.current) {
      setUrl(value);
      webViewRef.current.reload();
    }
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Button
            style={{width: 40, height: 20}}
            title="Reload"
            onPress={() => reloadUrl()}
            color="#1E6738"
          />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, flex: 1}}
            onChangeText={text => setValue(text)}
            value={value}
          />
        </View>
        <WebRTCScreen style={{flex: 1}} url={url} webRTCRef={webViewRef} />
      </View>
    </>
  );
};

export default App;
