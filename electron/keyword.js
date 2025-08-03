// keyword.js

const weaponMap = {
    'gmni_pistol_ballistic_01_firerats01_4782460779063': 'Gemini Ballistic Pistol',
    'klwe_smg_energy_01': 'Energy SMG',
    'behk_pistol_ballistic_01_5286112169182': 'Behring Ballistic Pistol',
    'gmni_lmg_balistic_01_': 'Balistic LMG F-55',
    'gmni_rifle_sniper_01_': 'Gemini Sniper Rifle',
    // Add more as needed
  };
  
  function getFriendlyName(internalName) {
    return weaponMap[internalName] || internalName;
  }
  
  export { getFriendlyName };
  