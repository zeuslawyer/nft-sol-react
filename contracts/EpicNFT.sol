// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// We inherit the contract we imported so we can access its methods.
contract EpicNFT is ERC721URIStorage {
    // OpenZeppelin helpers that help keep track of tokenIds.
    using Counters for Counters.Counter;

    // Unique token ids.  Initilizes at 0.
    Counters.Counter private _tokenIds;

    // Pass the name of our NFTs token and it's symbol.
    constructor() ERC721("zpNFT", "z-nfty") {
        console.log("This is my NFT contract. Lordy!");
    }

    function makeEpicNFT() public {
        // Get the current tokenId. Starts at 0.
        uint256 newItemId = _tokenIds.current();

        // Mint the NFT for the sender.
        _safeMint(msg.sender, newItemId);

        // Set the minted NFT's data.
        _setTokenURI(newItemId, "https://jsonkeeper.com/b/F1CW");
        console.log(
            "A NFT with id %d has been minted for sender %s",
            newItemId,
            msg.sender
        );

        // Increment token counter.
        _tokenIds.increment();
        console.log(
            "The Token's name is '%s' and its symbol is '%s'.",
            name(),
            symbol()
        );
    }
}
