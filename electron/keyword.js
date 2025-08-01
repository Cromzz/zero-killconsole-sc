// keyword.js

const weaponMap = {
    'gmni_pistol_ballistic_01_firerats01_4782460779063': 'Ballistic Pistol',
    'pistol_01_abc': 'Standard Pistol',
    'ak47_modx': 'AK-47 Modified',
    // Add more as needed
  };
  
  function getFriendlyName(internalName) {
    return weaponMap[internalName] || internalName;
  }
  
  export { getFriendlyName };
  