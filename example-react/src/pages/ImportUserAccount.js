import React, { useState } from 'react'
import { Button, Form, Input, Switch, Select } from 'antd'
import { ImportAccount } from 'selendra-api'

function ImportUserAccount() {
  const { Option } = Select;

  const [switchMnemo, setSwitchMnemo] = useState(true);

  const onChange = () => {
    setSwitchMnemo(!switchMnemo);
  }

  const handleImport = async(val) => {
    const res = await ImportAccount({
      seed: val.mnemonic,
      type: val.type
    })
    console.log('address:', res.pair.address);
  }

  const handleImportMnemonic = async(val) => {
    const res = await ImportAccount({
      seed: val.seed,
      type: val.type
    })
    console.log('address:', res.pair.address);
  }

  return (
    <>
      <Switch defaultChecked onChange={onChange} />
      <span style={{color: '#fff'}}>Mnemonic Seed</span>
      <div style={{marginBottom: '20px'}} />
      { switchMnemo && (
        <Form onFinish={handleImport}>
          <Form.Item name="mnemonic">
            <Input placeholder='Mnemonic Seed'/>
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
      )}
      { !switchMnemo && (
        <Form onFinish={handleImportMnemonic}>
          <Form.Item name='seed'>
            <Input placeholder='Seed'/>
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
            <Button>Import Account</Button>
          </Form.Item>
        </Form>
      )}
    </>
  )
}

export default ImportUserAccount