import React, { useState } from 'react'
import { Button, Input, Modal, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import { TotalSupply, BalanceOf, Allowance, Approve, Transfer, TransferFrom } from 'indra-js';
import { CaretRightOutlined } from '@ant-design/icons';

export const Contract = () => {
  const [isWASM, setIsWASM] = useState(false);
  const [abi, setAbi] = useState({});
  const [address, setAddress] = useState('5Heyr33xZGR2nGXHxadZLUwNXvF3wCvXcJ4ktnPhWegaB5Sm');

  const handleCancel = () => {
    setIsWASM(false);
  }
  const beforeUploadJson = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setAbi(reader.result);
      console.log(JSON.parse(reader.result))
    };
    reader.readAsText(file);
    return false;
  }
  const handleTotalSupply = () => {
    TotalSupply({
      abi: JSON.parse(abi),
    })
    .then(rs => {
      console.log(`total supply: ${rs}`);
    })
  }

  const handleBalanceOf = () => {
    BalanceOf({
      abi: JSON.parse(abi)
    })
    .then(rs => {
      console.log(`balance of: ${rs}`);
    })
  }

  const handleAllowance = () => {
    Allowance({
      abi: JSON.parse(abi),
      from: '5DM3W28EeKBmZnikwoQNJg9ex5PFdJARNgtkkgTMiu5oi2hG',
      owner: '5HVhS6Eh9XQHgdVYAuq2Bj3S3UW8dsWt2qrNa89K2TqY5Ypp',
      spender: '5HVhS6Eh9XQHgdVYAuq2Bj3S3UW8dsWt2qrNa89K2TqY5Ypp'
    })
    .then(rs => {
      console.log(`allowance: ${rs}`);
    })
  }

  const handleApprove = () => {
    Approve({
      abi: JSON.parse(abi),
      from: '0xa881b29f12c741e7a61b2635f74b01ff669cc91bccce226663c3d49156a99c7c',
      value: '1'
    })
    .then(rs => {
      console.log(`hash: ${rs}`);
    })
  }

  const handleTransfer = () => {
    Transfer({
      abi: JSON.parse(abi),
      sender: '0xa881b29f12c741e7a61b2635f74b01ff669cc91bccce226663c3d49156a99c7c',
      to: '5DM3W28EeKBmZnikwoQNJg9ex5PFdJARNgtkkgTMiu5oi2hG',
      value: '1'
    })
    .then(rs => {
      console.log(`hash: ${rs}`);
    })
  }

  const handleTransferFrom = () => {
    TransferFrom({
      abi: JSON.parse(abi),
      sender: '0xa881b29f12c741e7a61b2635f74b01ff669cc91bccce226663c3d49156a99c7c',
      from: '5DM3W28EeKBmZnikwoQNJg9ex5PFdJARNgtkkgTMiu5oi2hG',
      to: '5HVhS6Eh9XQHgdVYAuq2Bj3S3UW8dsWt2qrNa89K2TqY5Ypp',
      value: '1'
    })
    .then(rs => {
      console.log(`hash: ${rs}`);
    })
  }

  return (
    <div>
      <div>
        <Button onClick={() => setIsWASM(true)} icon={<CaretRightOutlined/>}>Messages</Button>
      </div>
      <Modal footer="" title="" visible={isWASM} onCancel={handleCancel}>
        <br/>
        <Input placeholder='deployment account'/>
        <Upload maxCount={1} accept="application/json, text/plain" beforeUpload={beforeUploadJson}>
          <Button icon={<UploadOutlined />}>Contract ABI</Button>
        </Upload><br/>
        <Button onClick={handleTotalSupply}>Total Supply</Button>
        <Button onClick={handleBalanceOf}>BalanceOf</Button>
        <Button onClick={handleAllowance}>Allowance</Button>
        <Button onClick={handleApprove}>Approve</Button>
        <Button onClick={handleTransfer}>Transfer</Button>
        <Button onClick={handleTransferFrom}>Transfer From</Button>
      </Modal>
    </div>
  )
}
