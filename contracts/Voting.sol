pragma solidity ^0.8.0;

contract Voting{
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    event Event(string message, address sender, uint indexNo);
    uint public approversCount;
    Request[] public allRequest;
    uint public allRequestLength;
    mapping(address => bool) public approvers;
    function contribute(address _address) public {
        if(!approvers[_address]) {
            approversCount++;
        }
        approvers[_address] = true;
    }
    function createRequest(string memory _description, uint _value, address payable _recipient) public {
        uint idx = allRequest.length;
        allRequest.push();
        Request storage _request = allRequest[idx];
        _request.description = _description;
        _request.value = _value;
        _request.recipient = _recipient;
        _request.complete = false;
        _request.approvalCount = 0;
        allRequestLength++;
        //triggering event
        emit Event("Request Created successfully", msg.sender, allRequest.length - 1);
    }
    function approveRequest(uint _index) public {
        require(approvers[msg.sender], "Only Approvers required !!");
        require(!allRequest[_index].approvals[msg.sender], "You have voted !!");
        allRequest[_index].approvals[msg.sender] = true;
        allRequest[_index].approvalCount++;
        //triggering event
        emit Event("You Approved the Request", msg.sender, _index);
    }
    
    function finalizeRequest(uint index) public returns(bool){
        require(!allRequest[index].complete, "Request is already finalised !!");
        require(allRequest[index].approvalCount > (approversCount / 2), "Investors denied your request !!");

        allRequest[index].complete = true;
        emit Event("Finalization is completed", msg.sender, index);
        return true;
    }   
    function getRequestDescription(uint index) public view returns(string memory) {
        return allRequest[index].description;
    }
    function getRequestValue(uint index) public view returns(uint) {
        return allRequest[index].value;
    }
    function getRequestRecipient(uint index) public view returns(address payable) {
        return allRequest[index].recipient;
    }
    function getRequestComplete(uint index) public view returns(bool) {
        return allRequest[index].complete;
    }
    function getRequestApprovalCount(uint index) public view returns(uint) {
        return allRequest[index].approvalCount;
    }
}