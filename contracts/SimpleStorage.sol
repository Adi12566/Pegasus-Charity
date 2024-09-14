// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract SimpleStorage {
    struct CampaignDetails {
        string campaignName;
        string ngoname;
        string description;
        string status;
        string startDate;
        string endDate;
        uint amount;
        string walletId;
    }
     struct TransactionDetails {
        string userInput;
        string uniqueID;
        string campaignName;
   
    }

    mapping(address => CampaignDetails[]) public users;

    function storeUserDetails(
        string memory _campaignName,
        string memory _ngoname,
        string memory _description,
        string memory _status,
        string memory _startDate,
        string memory _endDate,
        uint _amount,
        string memory _walletId
    ) public {
        users[msg.sender].push(CampaignDetails({
            campaignName: _campaignName,
            ngoname: _ngoname,
            description: _description,
            status: _status,
            startDate: _startDate,
            endDate: _endDate,
            amount: _amount,
            walletId: _walletId
        }));
    }

    function getUserDetails() public view returns (CampaignDetails[] memory) {
        return users[msg.sender];
    }


    mapping(address => TransactionDetails[]) public Transaction;

    function storeTransactionDetails(
        string memory _userInput,
        string memory _uniqueID,
        string memory _campaignName
   
    ) public {
        Transaction[msg.sender].push(TransactionDetails({
            userInput: _userInput,
            uniqueID: _uniqueID,
            campaignName: _campaignName
            
        }));
    }

    function getTransactionDetails() public view returns (TransactionDetails[] memory) {
        return Transaction[msg.sender];
    }
}

