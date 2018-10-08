// @flow
import React from 'react';
import { Modal, Radio, Input, Checkbox, List } from 'antd';

const { Item: ListItem } = List;
const { Meta: ListItemMeta } = ListItem;
const { Group: RadioGroup } = Radio;

type Props = {
  form: any,
  setFormField: (field: string) => (value: any) => void,
  displayedFields: Array<string>
};

const humanize = text =>
  text
    .split('_')
    .map(word => word.replace(/^\w/, w => w.toUpperCase()))
    .join(' ');

const ArchiveReason = ({
  isArchived,
  setIsArchived,
  reason,
  setReason,
  candidateReasons
}: {
  isArchived: boolean,
  setIsArchived: (isArchived: boolean) => void,
  reason: string,
  setReason: (reason: string) => void,
  candidateReasons: Array<string>
}) => (
  <React.Fragment>
    {/* eslint-disable-next-line jsx-a11y/label-has-for */}
    <label>
      <Checkbox
        checked={isArchived}
        onChange={e => setIsArchived(e.target.checked)}
        style={{ marginRight: 10, marginBottom: 10 }}
      />
      封存
    </label>
    <RadioGroup
      onChange={e =>
        candidateReasons[e.target.value] && setReason(candidateReasons[e.target.value])
      }
      value={candidateReasons.indexOf(reason)}
      disabled={!isArchived}
    >
      {candidateReasons.map((candidateReason, i) => (
        <Radio
          key={candidateReason}
          value={i}
          style={{
            display: 'block',
            whiteSpace: 'pre-wrap',
            textIndent: -25,
            marginLeft: 25,
            marginBottom: 5
          }}
        >
          {candidateReason}
        </Radio>
      ))}
      <Radio value={-1}>
        自訂
        <Input
          value={reason}
          onChange={e => setReason(e.target.value)}
          style={{ marginLeft: 10, width: 350 }}
          disabled={!isArchived}
        />
      </Radio>
    </RadioGroup>
  </React.Fragment>
);

const EditModal = (props: Props) => {
  const { form, setFormField, displayedFields } = props;
  return (
    <Modal {...props}>
      <List
        size="small"
        footer={
          <ArchiveReason
            isArchived={form.archive_status}
            setIsArchived={setFormField('archive_status')}
            reason={form.archive_reason}
            setReason={setFormField('archive_reason')}
            candidateReasons={[
              '包含針對特定族群之仇恨、威脅及歧視言論，含侮辱、挑撥、威脅、蓄意人身攻擊、歧視等文字。特定族群包含但不限於種族、地域、職業、公司、性別、年齡、學校、薪水階級等族群。',
              '包含違反中華民國法律之內容。例如：散布他人個人隱私資訊、侵害他人著作權之內容、惡意程式之網站連結。',
              '內容主要為商業廣告之用途。',
              '相同內容重複張貼。',
              '內容包含不易閱讀之資訊。例如：注音文、未註明用途之超連結。意即，超連結須註明來源。',
              '內容指涉之資訊，顯然不具參考性，或顯然有誤。例如：公司或職務名稱無法辨識、薪資數額明顯不合理。',
              '職場經驗之分享的本文字數若低於（含） 50 字，則本版管理團隊可依內容相關程度判斷是否保留/刪除。',
              '與本版宗旨或本討論串無相關之內容。'
            ]}
          />
        }
      >
        {displayedFields.map(field => (
          <ListItem key={field}>
            <ListItemMeta title={humanize(field)} description={form[field] || '(無)'} />
          </ListItem>
        ))}
      </List>
    </Modal>
  );
};

export default EditModal;
