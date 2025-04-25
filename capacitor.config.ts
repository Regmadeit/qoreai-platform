import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.qoreai.platform',
  appName: 'QoreAI Platform',
  webDir: 'out',
  server: {
    url: 'http://192.168.0.8:3000',
    cleartext: true,
    androidScheme: 'https',
    iosScheme: 'https'
  },
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    scheme: 'QoreAI',
    backgroundColor: '#003da5'
  }
};

export default config;
