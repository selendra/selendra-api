import React, { useState } from 'react'
import { Button, Form, Input, Switch, Select } from 'antd'
import { ImportAccount } from 'indra-js'

function ImportUserAccount() {
  const { Option } = Select;

  const [switchMnemo, setSwitchMnemo] = useState(true);

  const onChange = () => {
    setSwitchMnemo(!switchMnemo);
  }

  const handleImport = async(val) => {
    await ImportAccount({
      seed: val.seed,
      type: val.type
    })
    .then((res)=> {
      console.log('address:', res.pair.address);
    })
  }

  return (
    <Form onFinish={handleImport}>
      <Form.Item name="seed">
        <Input placeholder='Mnemonic Seed or Seed'/>
      </Form.Item>
      <Form.Item name='type'>
        <Select
          placeholder='Select Crypto Type'
        >
          <Option value='ed25519'>ed25519</Option>
          <Option value='sr25519'>sr25519</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button htmlType='submit'>Import Account</Button>
      </Form.Item>
    </Form>
  )
}

export default ImportUserAccount;