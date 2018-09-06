// @flow
import React from 'react';
import { Modal, Input, Checkbox } from 'antd';

type Props = {
  form: any,
  setFormField: (field: string) => (value: any) => void,
  displayedFields: Array<string>
};

const EditModal = (props: Props) => {
  const { form, setFormField, displayedFields } = props;
  return (
    <Modal {...props}>
      {displayedFields.map(field => (
        <div key={field}>
          <span style={{ fontWeight: 'bold', marginRight: '1em' }}>{field}</span>
          <span>{form[field]}</span>
        </div>
      ))}
      <hr />
      <Input
        addonBefore={
          /* eslint-disable-next-line jsx-a11y/label-has-for */
          <label>
            <Checkbox
              checked={form.archive_status}
              onChange={e => setFormField('archive_status')(e.target.checked)}
              style={{ marginRight: '1em' }}
            />
            封存
          </label>
        }
        disabled={!form.archive_status}
        placeholder="封存理由"
        value={form.archive_reason}
        onChange={e => setFormField('archive_reason')(e.target.value)}
      />
    </Modal>
  );
};

export default EditModal;
