/*
 *   SPDX-License-Identifier: UNLICENSED
 *   @Title:   IP-NFT Contract
 *   @Version: 1.0
 *   @Author:  Devin Downs
 *   @Dev:     A Proof of Concept DApp
 */

pragma solidity ^0.8.4;

/*
 *   Import Statements
 *   ERC1155:           Chosen token standard (inherits Enumerable and MetaData functions)
 *   ERC1155Holder:     Allows for safe transfers
 *   Ownable:           Allows contracts to be 'ownable' i.e. implement basic permissions
 *   Counters:          Simple method for ++/-- integers (ID generation)
 *   Strings:           Utility for string concatenation (OpenSea URI support)
 */

import "../lib/openzepp/contracts/token/ERC1155/ERC1155.sol";
import "../lib/openzepp/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "../lib/openzepp/contracts/token/ERC1155/utils/ERC1155Receiver.sol";
import "../lib/openzepp/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "../lib/openzepp/contracts/access/Ownable.sol";
import "../lib/openzepp/contracts/utils/Strings.sol";

contract accessController is ERC1155, ERC1155Holder, Ownable, ERC1155Pausable {
    string public name = "NonFungibleTrust Controller";
    string public symbol = "NFTrust";

    //  Token declaration and the associated ID
    uint256 public constant dataTicket = 1;

    event NewTicket(address addr, uint256 amount);
    event BurnTicket(address account, uint256 ticket);
    event Transfer(address from, address to, uint256 id);
    event TransferError(address from, address to, uint256 id);

    constructor() ERC1155("ipfs://QmUyMyeNCFMQ7CQ2EbmvQJ7vguAcEVsE5P2UBT5tbuuBqC/{id}.json") {}

    /*
    *   Supports Interface Override for SafeTransfers
    *                   Strictly required for ERC1155
    *
    *   interfaceId:    Id to determine if destination wallet can accept ERC1155    
    */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC1155Receiver) 
        returns (bool) 
    {
        require(!paused(), "supportsInterface: Contract has been paused");
        return super.supportsInterface(interfaceId);
    }

    /*
     *   URI Function
     *      @Dev overrides base uri function for OpenSea friendly URI
     */
    function uri(uint256 _tokenid)
        public
        pure
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    "https://gateway.pinata.cloud/ipfs/QmUyMyeNCFMQ7CQ2EbmvQJ7vguAcEVsE5P2UBT5tbuuBqC/",
                    Strings.toString(_tokenid),
                    ".json"
                )
            );
    }

    /*
     *   Identification Function
     *                   This function serves as the 'identifier' for the DId mechanism
     *
     *   ticketType:     Represents which ticket we are looking for (1 = dataTicket)
     *   @returns        true if msg.sender has more than 0 tokens of type ticketType
     */
    function checkId(
        uint256 ticketType
        ) public view returns (bool) {
        require(!paused(), "checkId: Contract has been paused");
        return(IERC1155(address(this)).balanceOf(msg.sender, ticketType) >0);
    }

    /*
     *  Burn Function
     *              Allows the owner of the contract (original deployer or account
     *              that has been passed owner rights) to burn an NFT
     *              @dev Only the contract owner can delete tickets
     *
     *  account:    Account we will be removing NFT(s) from
     *  tickets:    Array of ticket id's to burn
     *  amount:     Number of tickets to burn for each ID
     */
    function burnNFT(
        address account,
        uint256 ticketType,
        uint256 amount
    ) public onlyOwner {
        require(!paused(), "burnNFT: Contract has been paused");
        _burn(account, ticketType, amount);
        emit BurnTicket(account, ticketType);
    }

    /*
     *   Transfer Function
     *               Allows the owner of an NFT to transfer to another freely
     *               @dev If msg.sender != from, emit error event (safe transfer stops transfer)
     *
     *   from:       address that will send the token
     *   to:         address that will recieve the token
     *   id:         ticketId (1 for dataTicket)
     *   amount:     default to 1, can implement larger transfer in future
     */
    function marketTransfer(
        address from,
        address to,
        uint256 ticketType
    ) public onlyOwner whenNotPaused() {
        require(!paused(), "marketTransfer: Contract has been paused");
        if(IERC1155(address(this)).balanceOf(from, ticketType) >0) {
            emit TransferError(from, to, ticketType);
        } else {
            _safeTransferFrom(from, to, ticketType, 1, "");
            emit Transfer(from, to, ticketType);
        }
    }

    /*
     *  Mint Function
     *              Mints new NFT's and associates the URI metadata to each
     *
     *  to:         address the token is being assigned to
     *  tokenURI:   unique string concatenated to end of baseURI for metadata
     */
    function mintNFT(
        address account,
        uint256 ticketType,
        uint256 amount
    ) public onlyOwner {
        require(!paused(), "mintNFT: Contract has been paused");
        _mint(account, ticketType, amount, "");
        emit NewTicket(account, amount);
    }

    /**
     *  Before Token Transfer Hook Function
     *
     *      Calls parent function to check
     * 
     */
    function _beforeTokenTransfer (
        address operator,
        address from,
        address to,
        uint256[] memory ticket,
        uint256[] memory amount,
        bytes memory data
    ) internal virtual override(ERC1155, ERC1155Pausable) {
        require(!paused(), "_beforeTokenTransfer: Contract has been paused");
        super._beforeTokenTransfer(operator, from, to, ticket, amount, data);
    }

    /**
     *  Pause Function
     *
     *      Allows the contract to be paused, stopping all functions that call _beforeTokenTransfer
     */
    function pause() public virtual onlyOwner {
        require(!paused(), "ERC1155PresetMinterPauser: must have pauser role to pause");
        _pause();
    }

    /**
     *  Unpause Function
     *
     *      Allows the contract to be unpaused, resuming all functions that call _beforeTokenTransfer
     */
    function unpause() public virtual onlyOwner{
        require(paused(), "ERC1155PresetMinterPauser: must have pauser role to unpause");
        _unpause();
    }

}