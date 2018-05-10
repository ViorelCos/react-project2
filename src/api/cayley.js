import Frisbee from 'frisbee';

const CAYLEY_MANAGER_ROOT_URI = process.env.REACT_APP_CAYLEY_MGR_URI;

const cayley = new Frisbee({
    baseURI: CAYLEY_MANAGER_ROOT_URI,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
});
export default cayley;