# NFT Gated Data Warehouse Prototype
# Back End
Software Development Intern Project

---

**_Author:_** <br>
&nbsp; Devin Downs (Intern) <br> 
&nbsp; Software Development

---

**_Description:_** <br>
&nbsp; This is a simple project using the ERC 1155 token standard for <br>
&nbsp; Decentralized Identification. This project uses NFT's to give <br>
&nbsp; access to data and other resources promised by the minter.<b>

---

**_Project Structure_** <br>
<b>contracts:</b>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Solidity contracts for the project <br>
<b>lib:</b>          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Library with helpers and other dependencies <br>
<b>tasks:</b>        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TypeScript file with hardhat tasks for deployment and minting <br>
<b>media:</b>        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Any media for webapp portion <br>
<b>scripts:</b>      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Misc. JS files for ethers provider injection, etc. <br>
<b>tests:</b>        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hardhat tests <br>

---

Install Dependencies: _(Ubuntu Server LTS)_
1. Node Version Manager (NVM):
~~~
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
~~~
2. Node.js and Node Package Manager (NPM)
~~~
nvm install node
npm install --save-dev ts-node typescript
~~~
3. Install packages
~~~
npm install
~~~
4. Initialize directory and install Hardhat
~~~
npm init --yes
npm install --save-dev hardhat
~~~
  
Configutre Hardhat:
1. Go to your project folder
~~~
mkdir DESIRED_REPO_NAME
cd DESIRED_REPO_NAME
~~~
2. Create a new hardhat.config
~~~
npx hardhat
~~~

Create Environment Variables: _(Ubuntu Server LTS)_<br>
1. Create new .env file
  ~~~
touch .env
~~~
2. Open .env in a text editor
~~~
sudo nano ~/PROJECT_ROOT_DIRECTORY/.env
------------------OR------------------
vim ~/PROJECT_ROOT_DIRECTORY/.env
~~~
3. Add the relevant enviroment variables
~~~
ETH_PRIVATE_KEY =   // The private key of the account you intend to use
API_URL =           // URL output from the Alchemy configuration 
TEST_NET_NAME =     //The plaintext name of the testnet you are using (must match Alchemy config)
ETH_PUBLIC_KEY      //Public address to send all NFT's minted via Hardhat task 
~~~

---

Compile Contracts: _(Ubuntu Server LTS)_
~~~
npx hardhat compile
~~~

---
