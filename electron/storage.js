import Store from 'electron-store';

const config_store = new Store({
  defaults: {
    gameDirectory: 'C:\\Program Files\\Roberts Space Industries\\StarCitizen\\LIVE',
    apiKey: '149cc46022f7baaac3cbba14280694182903effb964c809e480350fdb30498f9e71bbe4067231527d1abd67123de5430b4c78fb04d8a4937b36a8255fba1aa35',
    ttsEnabled: false,
    ttsLanguage: 'en',
    ttsVolume: 0.5,
    overlayState: false,
    ttsStatus: false,
    overlayPosition: 'Bottom Right',
    groupStatus: false,
    groupCode: 'TESTCODE'
  }
});

export default config_store;
