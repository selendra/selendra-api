import React, { useState } from 'react';
import { Button, Input, Modal, Upload, Form, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Allowance } from 'indra-js';

const AllowanceModal = ({modalAllowance, handleCancel}) => {
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

  const handleAllowance = (val) => {
    Allowance({
      abi: JSON.parse(abi),
      address: val.address,
      call_from: val.call_from,
      owner: val.owner,
      spender: val.spender
    })
    .then(rs => {
      console.log(`allowance: ${rs}`);
      message.success(`Allowance: ${rs}`, 10);
    })
  }

  return (
    <div>
      <Modal footer="" title="" visible={modalAllowance} onCancel={handleCancel}>
        <br/>
        <Upload maxCount={1} accept="application/json, text/plain" beforeUpload={beforeUploadJson}>
          <Button icon={<UploadOutlined />}>Contract ABI</Button>
        </Upload><br/>
        <Form onFinish={handleAllowance}>
          <Form.Item name='address'>
            <Input placeholder='Address'/>
          </Form.Item>
          <Form.Item name='call_from'>
            <Input placeholder='Call From Account'/>
          </Form.Item>
          <Form.Item name='owner'>
            <Input placeholder='Owner: Account ID'/>
          </Form.Item>
          <Form.Item name='spender'>
            <Input placeholder='Spender: Account ID'/>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' block>Execute</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AllowanceModal;