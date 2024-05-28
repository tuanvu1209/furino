import { StyleSheet, View } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { WebView } from 'react-native-webview';

const IP = '192.168.10.55';

export default function App() {
  PushNotification.configure({
    onRegister: function (token) {},

    onNotification: function (notification) {},
  });

  PushNotification.localNotification({
    title: 'My Notification Title',
    message: 'Hello, this is a notification!',
  });
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
