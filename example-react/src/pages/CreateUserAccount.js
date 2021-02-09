import React, { useState } from 'react';
import { CreateAccount } from 'indra-js';

import { Row, Col, Form, Select, Modal, Button } from 'antd';
import '../styles/create_account.css';

function CreateUserAccount() {
  const { Option } = Select;
  const [ModalVisible, setModalVisible] = useState(false);
  const [mnemonic, setMnemonic] = useState();
  const [pair, setPair] = useState({});

  const handleCreate = async(val) => {
    await CreateAccount({
      type: val.type
    })
    .then((res) => {
      setMnemonic(res.mnemonic);
      setPair(res.pair);
      setModalVisible(true);
    })
  }

  return (
    <div>
      <Row justify='center'>
        <Col style={{width: '100%'}}>
          <p className='create__title'>Create Account</p>
          <Form onFinish={handleCreate}>
            <Form.Item name='type'>
              <Select
                placeholder='Select Crypto Type'
              >
                <Option value='ed25519'>ed25519</Option>
                <Option value='sr25519'>sr25519</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit' size='large' type='primary' className='create__btn'>Submit</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      {mnemonic && pair && (
        <Modal title="" footer={null} visible={ModalVisible} onCancel={() => setModalVisible(false)}>
          {
            pair.address && 
            <div>
              <p>Mnemonic: <span className='create__res'>{mnemonic}</span></p>
              <p>Address: <span className='create__res'>{pair.address}</span></p>
              <p>Crypto Type: <span className='create__res'>{pair.type}</span></p>
            </div>
          }
        </Modal>
      )}
    </div>
  )
}

export default CreateUserAccount;