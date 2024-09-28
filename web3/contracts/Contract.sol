// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct FundRaiser {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        uint256 balance;
        string image;
        address[] donators;
        uint256[] donations;
        Request[] requests;
    }

    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    struct RequestInfo {
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalCount;
        bool userApprovalStatus;
    }

    struct FundRaiserInfo {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
    }

    mapping(uint256 => FundRaiser) public fundRaisers;
    uint256 public numberOfFundRaisers = 0;

    modifier restricted(uint256 fundRaiserId) {
        require(msg.sender == fundRaisers[fundRaiserId].owner, "Only the fundraiser owner can perform this action");
        _;
    }

    function createFundRaiser(address owner, string memory title, string memory description, uint256 target, uint256 deadline, string memory image) public returns (uint256) {
        FundRaiser storage fundRaiser = fundRaisers[numberOfFundRaisers];
        require(deadline > block.timestamp, "The deadline should be a date in the future");

        fundRaiser.owner = owner;
        fundRaiser.title = title;
        fundRaiser.description = description;
        fundRaiser.target = target;
        fundRaiser.deadline = deadline;
        fundRaiser.amountCollected = 0;
        fundRaiser.balance = 0;
        fundRaiser.image = image;

        numberOfFundRaisers++;

        return numberOfFundRaisers - 1;
    }

    function donateToFundRaiser(uint256 id) public payable {
        uint256 amount = msg.value;
        FundRaiser storage fundRaiser = fundRaisers[id];

        fundRaiser.donators.push(msg.sender);
        fundRaiser.donations.push(amount);

        fundRaiser.amountCollected += amount;
        fundRaiser.balance += amount;
    }   


    function createRequest(uint256 fundRaiserId, string memory description, uint256 value, address recipient) public restricted(fundRaiserId) {
        FundRaiser storage fundRaiser = fundRaisers[fundRaiserId];
        Request storage newRequest = fundRaiser.requests.push();

        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint256 fundRaiserId, uint256 requestIndex) public {
        FundRaiser storage fundRaiser = fundRaisers[fundRaiserId];
        Request storage request = fundRaiser.requests[requestIndex];

        require(isDonator(fundRaiser, msg.sender), "Only donators can approve requests");
        require(!request.approvals[msg.sender], "You have already approved this request");

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 fundRaiserId, uint256 requestIndex) public restricted(fundRaiserId) {
        FundRaiser storage fundRaiser = fundRaisers[fundRaiserId];
        Request storage request = fundRaiser.requests[requestIndex];

        require(request.approvalCount > (fundRaiser.donators.length / 2), "Not enough approvals");
        require(!request.complete, "Request already completed");

        fundRaiser.balance -= request.value;

        (bool sent,) = payable(request.recipient).call{value: request.value}("");
        require(sent, "Failed to send Ether");

        request.complete = true;
    }

    function getDonators(uint256 id) view public returns (address[] memory) {
        return fundRaisers[id].donators;
    }

    function getFundRaisers() public view returns (FundRaiserInfo[] memory) {
        FundRaiserInfo[] memory allFundRaisers = new FundRaiserInfo[](numberOfFundRaisers);

        for (uint i = 0; i < numberOfFundRaisers; i++) {
            FundRaiser storage item = fundRaisers[i];
            allFundRaisers[i] = FundRaiserInfo({
                owner: item.owner,
                title: item.title,
                description: item.description,
                target: item.target,
                deadline: item.deadline,
                amountCollected: item.amountCollected,
                image: item.image
            });
        }

        return allFundRaisers;
    }

    function getRequests(uint256 fundRaiserId, address user) public view returns (RequestInfo[] memory) {
        FundRaiser storage fundRaiser = fundRaisers[fundRaiserId];
        uint256 numRequests = fundRaiser.requests.length;
        RequestInfo[] memory requestInfoArray = new RequestInfo[](numRequests);

        for (uint256 i = 0; i < numRequests; i++) {
            Request storage request = fundRaiser.requests[i];
            requestInfoArray[i] = RequestInfo({
                description: request.description,
                value: request.value,
                recipient: request.recipient,
                complete: request.complete,
                approvalCount: request.approvalCount,
                userApprovalStatus: request.approvals[user]
            });
        }

        return requestInfoArray;
    }

    function getFundRaiserBalance(uint256 id) public view returns (uint256) {
        return fundRaisers[id].balance;
    }

    function isDonator(FundRaiser storage fundRaiser, address user) internal view returns (bool) {
        for (uint i = 0; i < fundRaiser.donators.length; i++) {
            if (fundRaiser.donators[i] == user) {
                return true;
            }
        }
        return false;
    }
}