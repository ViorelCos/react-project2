import Mnemonic from 'bitcore-mnemonic';

export function generateMnemonic(wordList) {
  let code;
  if (wordList) {
    console.log(wordList);
    if (!Mnemonic.isValid(wordList)) {
      throw new Error('Mnemonic invalid');
    }
    code = new Mnemonic(wordList);
  } else {
    code = new Mnemonic();
  }

  return {
    phrase: code.toString(),
    hdPrivateKey: code.toHDPrivateKey(),
  };
}

export function mnemonicToKey(mnemonic) {
  const code = new Mnemonic(mnemonic);

  return code.toHDPrivateKey().privateKey;
}

export function mnemonicToExtPrivateKey(mnemonic) {
  return new Mnemonic(mnemonic).toHDPrivateKey().toString('hex');
}

export function mnemonicToPrivateKey(mnemonic) {
  return new Mnemonic(mnemonic).toHDPrivateKey().privateKey.toString('hex');
}

export function mnemonicToPublicKey(mnemonic) {
  return new Mnemonic(mnemonic).toHDPrivateKey().privateKey.publicKey.toString('hex');
}

export function mnemonicValidate(mnemonic) {
  return new Mnemonic().isValid(mnemonic);
}
