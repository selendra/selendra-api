import React,{ useState } from 'react';
import { Transfer } from 'indra-js';
import { Button, Input, Modal, Upload, Form, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const TransferModal = ({modalTransfer, handleCancel}) => {
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
  
  const handleTransfer = (val) => {
    Transfer({
      abi: JSON.parse(abi),
      address: val.address,
      call_from: val.sender,
      to: val.to,
      value: val.value
    })
    .then(rs => {
      message.success(`Hash: ${rs}`);
      console.log(`hash: ${rs}`);
    })
  }
  
  return (
    <div>
      <Modal footer="" title="" visible={modalTransfer} onCancel={handleCancel}>
        <br/>
        <Upload maxCount={1} accept="application/json, text/plain" beforeUpload={beforeUploadJson}>
          <Button icon={<UploadOutlined />}>Contract ABI</Button>
        </Upload><br/>
        <Form onFinish={handleTransfer}>
          <Form.Item name='address'>
            <Input placeholder='Address'/>
          </Form.Item>
          <Form.Item name='sender'>
            <Input placeholder='sender: account value'/>
          </Form.Item>
          <Form.Item name='to'>
            <Input placeholder='To: account value'/>
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

export default TransferModal;