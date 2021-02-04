import React from 'react'
import { Form, Input, Button } from 'antd'
import { Transfer } from 'selendra-api'

function Transaction() {
  const handleTransfer = async(val) => {
    await Transfer({
      seed: val.rawSeed, 
      receiverAddress: val.receiver, 
      amount: val.amount
    })
    .then(res => console.log('hash:', res.hash))
  }

  return (
    <div>
      <Form onFinish={handleTransfer}>
        <Form.Item name='rawSeed'>
          <Input placeholder='Seed'/>
        </Form.Item>
        <Form.Item name='receiver'>
          <Input placeholder='Receiver Address'/>
        </Form.Item>
        <Form.Item name='amount'>
          <Input placeholder='Amount'/>
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit'>Transfer</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Transaction
