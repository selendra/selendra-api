import React, { useState } from 'react';
import { Button, Input, Modal, Upload, Form, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { BalanceOf } from 'indra-js';

const BalanceOfModal = ({modalBalanceOf, handleCancel}) => {
  const [abi, setAbi] = useState({});
  
  const beforeUploadJson = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setAbi(reader.result);
      console.log(JSON.parse(reader.result))
    };
    reader.readAsText(file);
    return false;
  }

  const handleBalanceOf = (val) => {
    BalanceOf({
      abi: JSON.parse(abi),
      address: val.address,
      call_from: val.from,
      owner: val.owner
    })
    .then(rs => {
      message.success(`Balance Of: ${rs}`, 10);
      console.log(`balance of: ${rs}`);
    })
  }

  return (
    <div>
      <Modal footer="" title="" visible={modalBalanceOf} onCancel={handleCancel}>
        <br/>
        <Upload maxCount={1} accept="application/json, text/plain" beforeUpload={beforeUploadJson}>
          <Button icon={<UploadOutlined />}>Contract ABI</Button>
        </Upload><br/>
        <Form onFinish={handleBalanceOf}>
          <Form.Item name='address'>
            <Input placeholder='Address'/>
          </Form.Item>
          <Form.Item name='from'>
            <Input placeholder='Call From Account'/>
          </Form.Item>
          <Form.Item name='owner'>
            <Input placeholder='Owner: AccountID'/>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' block>Execute</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default BalanceOfModal;
