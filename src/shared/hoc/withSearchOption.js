// @flow
import { compose, withHandlers, withState, type HOC } from 'recompose';

type Props = {};

const withSearchOption: HOC<*, Props> = compose(
  withState('searchObj', 'setSearchObj', { columnKey: 'COMPANY', value: '' }),
  withHandlers({
    submitSearchObj: ({ setSearchObj }) => (columnKey, submitValue) => {
      setSearchObj({
        columnKey,
        value: submitValue
      });
    }
  })
);

export default withSearchOption;
