# BarnithWallet Smart Contract

## Overview

The BarnithWallet Smart Contract is a basic Ethereum-based wallet that allows users to deposit and withdraw tokens, check the balance, and purchase NFTs.

## Features

- Deposit tokens into the wallet
- Withdraw tokens from the wallet
- Check the wallet balance
- Purchase NFTs using tokens

## Usage

### Deposit Tokens

Allows the wallet owner to deposit tokens into the wallet.

Emits a `Deposit_Event` indicating the amount deposited.

### Withdraw Tokens

Allows the wallet owner to withdraw tokens from the wallet.

Emits a `Withdrawal_Event` indicating the amount withdrawn.

### Check Wallet Balance

Returns the current balance of the wallet.

### Purchase NFT

Allows users to purchase NFTs using tokens from their wallet.

Emits an `NFT_Purchase_Event` indicating the number of NFTs purchased.

## Error Handling

- `Insufficient_Funds`: Raised when attempting to withdraw more tokens than available in the wallet.

## Contract Information

- `walletOwner`: Address of the wallet owner.
- `walletBalance`: Current balance of the wallet.


# Running the Project Locally

Follow these steps to run the project on your computer after cloning the GitHub repository:

1. Open your terminal and navigate to the project directory.
2. Run `npm i` to install the necessary dependencies.

Next, open two additional terminals in your Visual Studio Code (VS Code) for the following steps:

3. In the second terminal, execute `npx hardhat node` to start a local Ethereum node.

4. In the third terminal, run `npx hardhat run --network localhost scripts/deploy.js` to deploy the smart contract.

Return to the first terminal:

5. Type `npm run dev` to launch the front-end of the project.

After completing these steps, the project will be up and running on your localhost, typically accessible at [http://localhost:3000/](http://localhost:3000/).

