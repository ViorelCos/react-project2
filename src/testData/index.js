import F3MTBSPTA from './P1_F3MTBSPTA'

const allTestData = {
  F3MTBSPTA
}

function getTestData (dataFilename) {
  if (!allTestData.hasOwnProperty(dataFilename)) {
    throw new Error(`test dataset '${dataFilename}' is not defined! Please, add corresponding file to 'src/testData/index.js#allTestData'`)
  }

  return allTestData[dataFilename]
}

export {getTestData}
