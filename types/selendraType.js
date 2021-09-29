const selendraTypes = {
    "EvmAddress": "H160",
    "EthereumTxHash": "H256",
    "BlockV0": "EthereumBlock",
    "BridgeChainId": "u8",
    "BridgeEvent": {
        "_enum": {
        "FungibleTransfer": "FungibleTransfer"
        }
    },
    "FungibleTransfer": {
        "dest_id": "BridgeChainId",
        "nonce": "DepositNonce",
        "resource_id": "ResourceId",
        "amount": "U256",
        "recipient": "Vec<u8>"
    },
    "ChainId": "u8",
    "ResourceId": "[u8; 32]",
    "DepositNonce": "u64",
    "ProposalStatus": {
        "_enum": {
        "Initiated": null,
        "Approved": null,
        "Rejected": null
        }
    },
    "ProposalVotes": {
        "votes_for": "Vec<AccountId>",
        "votes_against": "Vec<AccountId>",
        "status": "ProposalStatus",
        "expiry": "BlockNumber"
    },
    "TokenId": "U256",
    "Address": "MultiAddress",
    "LookupSource": "MultiAddress"
};

module.exports = selendraTypes;