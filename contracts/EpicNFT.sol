// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import {Base64} from "./libraries/Base64.sol";

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// We inherit the contract we imported so we can access its methods.
contract EpicNFT is ERC721URIStorage {
    // OpenZeppelin helpers that help keep track of tokenIds.
    using Counters for Counters.Counter;

    // Unique token ids.  Initilizes at 0.
    Counters.Counter private _tokenIds;

    // Make a baseSvg variable here that all NFTs can use.
    string baseSvg =
        "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    // I create three arrays, each with their own theme of random words.
    // Pick some random funny words, names of anime characters, foods you like, whatever!
    string[] firstWords = ["Squire", "Ser", "Sir", "Yeroner", "Milard", "Mylawd"];
    string[] secondWords = ["Tome", "Mutatis", "Mutandis", "Sui-Generis", "Ipso-Facto", "Ceteris-Paribus"];
    string[] thirdWords = ["Gavel", "Wig", "Robe", "Timesheet", "Briefs", "Docket"];

    // Pass the name of our NFTs token and it's symbol.
    constructor() ERC721("zpNFT", "z-nfty") {
        console.log("This is my NFT contract. Lordy!");
    }

    function makeEpicNFT() public {
        // Get the current tokenId. Starts at 0.
        uint256 newItemId = _tokenIds.current();

        // Generate random words from lists
        string memory first = pickRandomFirstWord(newItemId);
        string memory second = pickRandomSecondWord(newItemId);
        string memory third = pickRandomThirdWord(newItemId);
        string memory combinedWord = string(abi.encodePacked(first, second, third));

        // Concat svg string with <text> and <svg> tags.
        string memory finalSvg = string(abi.encodePacked(baseSvg, first, second, third, "</text></svg>"));

        // Marshall JSON metadata in place and base64 encode it.
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        // We set the title of our NFT as the generated word.
                        combinedWord,
                        '", "description": "A highly acclaimed collection of Legal NFTs.", "image": "data:image/svg+xml;base64,',
                        // We add data:image/svg+xml;base64 and then append our base64 encode our svg.
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );

        // Mint the NFT for the sender.
        _safeMint(msg.sender, newItemId);

        // Set the minted NFT's data.
        string memory tokenData = string(abi.encodePacked("data:application/json;base64,", json));

        console.log("\n--------------------");
        console.log(tokenData);
        console.log("--------------------\n");

        _setTokenURI(newItemId, tokenData);
        console.log("A NFT with id %d has been minted for sender %s", newItemId, msg.sender);

        // Increment token counter.
        _tokenIds.increment();
        console.log(
            "The Token's name is '%s' and its symbol is '%s'. Its URI data is %s",
            name(),
            symbol(),
            tokenURI(newItemId)
        );
    }

    // Helpers
    function pickRandomFirstWord(uint256 tokenId) public view returns (string memory) {
        uint256 rand = random(string(abi.encodePacked("FIRST_WORD", Strings.toString(tokenId))));

        rand = rand % firstWords.length;
        return firstWords[rand];
    }

    function pickRandomSecondWord(uint256 tokenId) public view returns (string memory) {
        uint256 rand = random(string(abi.encodePacked("SECOND_WORD", Strings.toString(tokenId))));
        rand = rand % secondWords.length;
        return secondWords[rand];
    }

    function pickRandomThirdWord(uint256 tokenId) public view returns (string memory) {
        uint256 rand = random(string(abi.encodePacked("THIRD_WORD", Strings.toString(tokenId))));
        rand = rand % thirdWords.length;
        return thirdWords[rand];
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }
}
