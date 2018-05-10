const config = {
  popcodes: {
    useTestData: false && process.env.REACT_APP_POPCODE_TEST_DATA_ENABLED.toLowerCase() === 'true',
    testDataFileName: process.env.REACT_APP_POPCODE_TEST_DATA_NAME
  }
}

export {config}
