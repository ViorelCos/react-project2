import { get } from 'axios';

import {allPopcodesEndpoint} from '../../utils/constants/endpoints'

import {getTestData} from '../../testData'
import {config} from '../../utils/constants/config'

const Popcodes = {
  getAllByIds () {
    return allPopcodesByIds;
  },

  // return all the popcodes that can be reached from the given one (the largest tree containing this popcode
  getAllReachablePopcodes (startPopcodeId) {
    // TODO: as this is basically a Breadth-First Search, consider extracting a reusable BFS into a separate method

    // use a hash for faster adding and search
    const reachablePopcodes = {};

    const allPopcodesByIds = Popcodes.getAllByIds();
    let currentPopcodeIdsToProcess = [startPopcodeId];

    while (currentPopcodeIdsToProcess.length > 0) {
      let nextPopcodesToProcess = [];

      currentPopcodeIdsToProcess.forEach((currentPopcodeId) => {
        // skip popcodes that were reached already
        if (!reachablePopcodes[currentPopcodeId]) {
          reachablePopcodes[currentPopcodeId] = allPopcodesByIds[currentPopcodeId];

          nextPopcodesToProcess = nextPopcodesToProcess.concat(Popcodes.getAllRelatedPopcodes(currentPopcodeId));
        }
      });

      currentPopcodeIdsToProcess = nextPopcodesToProcess;
    }

    return reachablePopcodes;
  },

  // TODO: memoize for current popcode data
  getAllRelatedPopcodes (targetPopcodeId) {
    const referenced = Popcodes.getReferencedPopcodes(targetPopcodeId);
    const referencing = Popcodes.getReferencingPopcodes(targetPopcodeId);

    return _getUniqueValues(referenced.concat(referencing));
  },

  getReferencedPopcodes(popcodeId) {
    return Popcodes._getPopcodeIdsReferencedByBom(popcodeId)
  },

  getReferencingPopcodes(popcodeId) {
    return Popcodes.getAllPopcodeIds().filter(otherPopcodeId => Popcodes.getReferencedPopcodes(otherPopcodeId).includes(popcodeId));
  },

  _getPopcodeIdsReferencedByBom (targetPopcodeId) {
    return Popcodes.getById(targetPopcodeId).bom || [];
  },

  // TODO: remove this method if it appears to be useless;
  // it was used before to calculate popcode relations, but now they are provided directly via `bom` field
  getPopcodeIdsReferencedByPopcodeOperations (targetPopcodeId) {
    const targetPopcode = Popcodes.getById(targetPopcodeId);

    return targetPopcode.transaction
      .filter((transaction => transaction.operation === "bomUpdate"))
      .map((transaction => _convertAddressToId(transaction.bomAddress)))
  },

  getById (popcodeId) {
    return Popcodes.getAllByIds()[popcodeId];
  },

  getAllPopcodesList () {
    return Object.values(Popcodes.getAllByIds());
  },

  getAllPopcodeIds() {
    return Object.keys(Popcodes.getAllByIds())
  },

  findByAddress (address) {
    return Popcodes.getAllPopcodesList().find(popcode => popcode.address === address)
  },

  // TODO: switch to some standard project-wide storage implementation
  async fetchAll() {
    const useTestData = config.popcodes.useTestData
    const testDataFileName = config.popcodes.testDataFileName;

    console.warn(useTestData ? `Using test data for popcodes: '${testDataFileName}'` : `Fetching live data for popcodes from '${allPopcodesEndpoint}'`);

    if (useTestData) {
      allPopcodes = getTestData(testDataFileName)
    }

    else {
      const rawResponse = await get(allPopcodesEndpoint);
      console.log('fetched popcodes: ', rawResponse);
      allPopcodes = rawResponse.data.popcodes
    }

    allPopcodesByIds = allPopcodes.reduce((popcodesByIds, currentPopcode) => {
        popcodesByIds[currentPopcode.id] = currentPopcode;
        return popcodesByIds;
      },
      {}
    )
  },
};

export { Popcodes };

let allPopcodes, allPopcodesByIds;

//simple and slow implementation of .unique()
// TODO: either use smth like lodash.uniq or better switch to ImmutableJS in general and use a Set here
function _getUniqueValues(arr) {
  //take only the first occurrence of every value
  return arr.filter((value, index) => arr.indexOf(value) === index);
}

function _convertAddressToId (address) {
  return `<${address}>`
}
