import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import io from 'socket.io-client';

const IP = '192.168.1.6';

export default function App() {
  
  useEffect(() => {
    const socket = io(`http://${IP}:3001`);
    socket.on('connect', () => {
      console.log('Connected');
    });

    socket.emit('register', 100)

    socket.on('disconnect', () => {
      console.log('Disconnected');
    });

    socket.on('message', (data) => {
      console.log('Message:', data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  
  return (
    <>
      <View style={styles.container} />
      <WebView
        style={{ marginBottom: 20 }}
        source={{
          uri: `http://${IP}:5173`,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
});
