import * as constants from '../reducers/constants';

export default {
  blockDates: (date) => {
    return {
      type: constants.BLOCK_DATE,
      payload: date
    }
  }
}
