export const contract_abi = [
  {
    type: "constructor",
    name: "",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "beatBought",
    inputs: [
      {
        type: "address",
        name: "producer",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "buyer",
        indexed: true,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "beatId",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "beatListed",
    inputs: [
      {
        type: "address",
        name: "producer",
        indexed: true,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "beatId",
        indexed: false,
        internalType: "uint256",
      },
      {
        type: "address",
        name: "tokenContract",
        indexed: false,
        internalType: "address",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "function",
    name: "beatsCounter",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "buyBeat",
    inputs: [
      {
        type: "uint256",
        name: "_beatId",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "getAllBeats",
    inputs: [],
    outputs: [
      {
        type: "tuple[]",
        name: "",
        components: [
          {
            type: "uint256",
            name: "beatId",
            internalType: "uint256",
          },
          {
            type: "string",
            name: "name",
            internalType: "string",
          },
          {
            type: "address",
            name: "producer",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "maxSupply",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "usdPrice",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "sales",
            internalType: "uint256",
          },
          {
            type: "string",
            name: "uri",
            internalType: "string",
          },
          {
            type: "address",
            name: "tokenContract",
            internalType: "contract TokenBeatsNFT",
          },
        ],
        internalType: "struct TokenBeatsFactory.Beat[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getEthPrice",
    inputs: [
      {
        type: "uint256",
        name: "_usdPrice",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLastBeats",
    inputs: [],
    outputs: [
      {
        type: "tuple[]",
        name: "",
        components: [
          {
            type: "uint256",
            name: "beatId",
            internalType: "uint256",
          },
          {
            type: "string",
            name: "name",
            internalType: "string",
          },
          {
            type: "address",
            name: "producer",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "maxSupply",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "usdPrice",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "sales",
            internalType: "uint256",
          },
          {
            type: "string",
            name: "uri",
            internalType: "string",
          },
          {
            type: "address",
            name: "tokenContract",
            internalType: "contract TokenBeatsNFT",
          },
        ],
        internalType: "struct TokenBeatsFactory.Beat[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "listBeat",
    inputs: [
      {
        type: "string",
        name: "_name",
        internalType: "string",
      },
      {
        type: "uint256",
        name: "_maxSupply",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_usdPrice",
        internalType: "uint256",
      },
      {
        type: "string",
        name: "_uri",
        internalType: "string",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
];
