import React, { useState } from 'react';
import { TransferFrom } from 'indra-js';
import { Button, Input, Modal, Upload, Form, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const TransferFromModal = ({modalTransferFrom, handleCancel}) => {
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

  const handleTransferFrom = (val) => {
    TransferFrom({
      abi: JSON.parse(abi),
      address: val.address,
      call_from: val.sender,
      from: val.from,
      to: val.to,
      value: val.value
    })
    .then(rs => {
      console.log(`hash: ${rs}`);
      message.success(`Hash: ${rs}`, 10);
    })
  }
  
  return (
    <div>
      <Modal footer="" title="" visible={modalTransferFrom} onCancel={handleCancel}>
        <br/>
        <Upload maxCount={1} accept="application/json, text/plain" beforeUpload={beforeUploadJson}>
          <Button icon={<UploadOutlined />}>Contract ABI</Button>
        </Upload><br/>
        <Form onFinish={handleTransferFrom}>
          <Form.Item name='address'>
            <Input placeholder='Address'/>
          </Form.Item>
          <Form.Item name='sender'>
            <Input placeholder='sender'/>
          </Form.Item>
          <Form.Item name='from'>
            <Input placeholder='From'/>
          </Form.Item>
          <Form.Item name='to'>
            <Input placeholder='To'/>
          </Form.Item>
          <Form.Item name='value'>
            <Input placeholder='Value'/>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' block>Execute</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default TransferFromModal;