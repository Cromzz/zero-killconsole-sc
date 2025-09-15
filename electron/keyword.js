// keyword.js

const terms = {
    'gmni_pistol_ballistic': 'Gemini Ballistic Pistol',
    'klwe_smg_energy_01': 'Energy SMG',
    'behk_pistol_ballistic_01_5286112169182': 'Behring Ballistic Pistol',
    'gmni_lmg_balistic_01_': 'Balistic LMG F-55',
    'gmni_rifle_sniper_01_': 'Gemini Sniper Rifle',
    'AIModule_Unmanned_PU_SecurityNetwork_': 'Station Security',
    'ksar_shotgun_ballistic_01': 'Ravager Shotgun',
    'behr_lmg_ballistic_01' : 'FS 9 LMG',
    'ksar_rifle_energy' : 'Karna Rifle red',
    'gmni_smg_ballistic_01' : 'C54 SMG',
    'ksar_shotgun_ballistic_01' : 'Ravager Twinshot',
    'behr_shotgun_ballistic_01' : 'BR 2 Shotgun',
    'volt_sniper_energy_01' : 'volt sniper rifle',
    'behr_rifle_ballistic_01' : 'P4 A R Rifle',
    'volt_pistol_energy' : 'volt pistol',
    'Hazard-003' : 'Out of Bounds',
    'volt_shotgun_energy' : 'volt prisim shotgun',
    'klwe_lmg_energy_01' : 'Demaco Energy LMG',
    'ksar_smg_energy_01' : 'Custodian SMG',
    'gmni_shotgun_ballistic' : 'R97 Shotgun',
    
    // Add more as needed
  };
  
  function getFriendlyName(internalName) {
    return terms[internalName] || internalName;
  }
  
  export { getFriendlyName };
  