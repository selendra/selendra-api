import React, { useState } from 'react';
import { Button, Input, Modal, Upload, Form, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { TotalSupply } from 'indra-js';

const TotalSupplyModal = ({modalTotalSupply, handleCancel}) => {
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

  const handleTotalSupply = (val) => {
    TotalSupply({
      abi: JSON.parse(abi),
      address: val.address,
      call_from: val.from
    })
    .then(rs => {
      message.success(`Total Supply: ${rs}`, 10);
      console.log(`total supply: ${rs}`);
    })
  }
  return (
    <div>
      <Modal footer="" title="" visible={modalTotalSupply} onCancel={handleCancel}>
        <br/>
        <Upload maxCount={1} accept="application/json, text/plain" beforeUpload={beforeUploadJson}>
          <Button icon={<UploadOutlined/>}>Contract ABI</Button>
        </Upload><br/>
        <Form onFinish={handleTotalSupply}>
          <Form.Item name='address'>
            <Input placeholder='Call From Account'/>
          </Form.Item>
          <Form.Item name='from'>
            <Input placeholder='From'/>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' block>Execute</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default TotalSupplyModal;
