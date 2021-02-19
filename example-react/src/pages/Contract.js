import React, { useState } from 'react';
import { Button, Row, Col } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import ApproveModal from '../components/Modal/Approve';
import TransferModal from '../components/Modal/Transfer';
import TransferFromModal from '../components/Modal/TransferFrom';
import AllowanceModal from '../components/Modal/Allowance';
import BalanceOfModal from '../components/Modal/BalanceOf';
import TotalSupplyModal from '../components/Modal/TotalSupply';

export const Contract = () => {
  const [modal, setModal] = useState(false);
  const [modalTransfer, setModalTransfer] = useState(false);
  const [modalTransferFrom, setModalTransferFrom] = useState(false);
  const [modalAllowance, setModalAllowance] = useState(false);
  const [modalBalanceOf, setModalBalanceOf] = useState(false);
  const [modalTotalSupply, setModalTotalSupply] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  
  const handleCancel = () => {
    setModal(false);
    setModalTransfer(false);
    setModalTransferFrom(false);
    setModalAllowance(false);
    setModalBalanceOf(false);
    setModalTotalSupply(false);
  }
  
  return (
    <div>
      <hr />
      <Row align='middle'>
        <Col span={16}>
          <span style={{color: '#fff'}}>ERC-20</span>
        </Col>
        <Col span={8}>
          <Button onClick={() => setIsMessage(!isMessage)} icon={<CaretRightOutlined/>}>Messages</Button>
        </Col>
      </Row>
      { isMessage && (
      <div style={{paddingTop: '2rem'}}>
        <Row align='middle'>
          <Col span={12}>
            <Button onClick={() => setModal(true)} icon={<CaretRightOutlined/>}>Exec</Button>
          </Col>
          <Col span={12}>
            <span style={{color: '#fff'}}><span style={{color: '#22d1ee'}}>Approve</span> (spender: AccountId, value: u128)</span>
          </Col>
        </Row><br/>
        <Row align='middle'>
          <Col span={12}>
            <Button onClick={() => setModalTransfer(true)} icon={<CaretRightOutlined/>}>Exec</Button>
          </Col>
          <Col span={12}> 
            <span style={{color: '#fff'}}><span style={{color: '#22d1ee'}}>Transfer</span> (to: AccountId, value: u128)</span>
          </Col>
        </Row><br/>
        <Row align='middle'>
          <Col span={12}>
            <Button onClick={() => setModalTransferFrom(true)} icon={<CaretRightOutlined/>}>Exec</Button>
          </Col>
          <Col span={12}>
            <span style={{color: '#fff'}}><span style={{color: '#22d1ee'}}>TransferFrom</span> (from: AccountId, to: AccountId, value: u128)</span>
          </Col>
        </Row><br/>
        <Row align='middle'>
          <Col span={12}>
            <Button onClick={() => setModalAllowance(true)} icon={<CaretRightOutlined/>}>Exec</Button>
          </Col>
          <Col span={12}> 
            <span style={{color: '#fff'}}><span style={{color: '#22d1ee'}}>Allowance</span> (owner: AccountId, spender: AccountId)</span>
          </Col>
        </Row><br/>
        <Row align='middle'>
          <Col span={12}>
            <Button onClick={() => setModalBalanceOf(true)} icon={<CaretRightOutlined/>}>Exec</Button>
          </Col>
          <Col span={12}> 
            <span style={{color: '#fff'}}><span style={{color: '#22d1ee'}}>BalanceOf</span> (owner: AccountId)</span>
          </Col>
        </Row><br/>
        <Row align='middle'>
          <Col span={12}>
            <Button onClick={() => setModalTotalSupply(true)} icon={<CaretRightOutlined/>}>Exec</Button>
          </Col>
          <Col span={12}> 
            <span style={{color: '#fff'}}><span style={{color: '#22d1ee'}}>TotalSupply</span>()</span>
          </Col>
        </Row><br/>
      </div>
      )}
      <hr/>
      
      <ApproveModal
        modal={modal}
        handleCancel={handleCancel}
      />
      <TransferModal 
        modalTransfer={modalTransfer}
        handleCancel={handleCancel}
      />
      <TransferFromModal 
        modalTransferFrom={modalTransferFrom}
        handleCancel={handleCancel}
      />
      <AllowanceModal 
        modalAllowance={modalAllowance}
        handleCancel={handleCancel}
      />
      <BalanceOfModal 
        modalBalanceOf={modalBalanceOf}
        handleCancel={handleCancel}
      />
      <TotalSupplyModal 
        modalTotalSupply={modalTotalSupply}
        handleCancel={handleCancel}
      />
    </div>
  )
}
