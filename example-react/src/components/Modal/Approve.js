import React, { useState } from 'react';
import { Approve } from 'indra-js';
import { Button, Input, Modal, Upload, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ApproveModal = ({modal, handleCancel}) => {
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
  
  const handleApprove = (val) => {
    Approve({
      abi: JSON.parse(abi),
      address: val.address,
      call_from: val.from,
      spender: val.to,
      value: val.value
    })
    .then(rs => {
      console.log(`hash: ${rs}`);
    })
  } 
  
  return (
    <div>
      <Modal footer="" title="" visible={modal} onCancel={handleCancel}>
        <br/>
        <Upload maxCount={1} accept="application/json, text/plain" beforeUpload={beforeUploadJson}>
          <Button icon={<UploadOutlined />}>Contract ABI</Button>
        </Upload><br/>
        <Form onFinish={handleApprove}>
          <Form.Item name='address'>
            <Input placeholder='Address'/>
          </Form.Item>
          <Form.Item name='from'>
            <Input placeholder='Call from Address'/>
          </Form.Item>
          <Form.Item name='to'>
            <Input placeholder='Spender'/>
          </Form.Item>
          <Form.Item name='value'>
            <Input placeholder='Value'/>
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' type='primary' block>Execute</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ApproveModal;
