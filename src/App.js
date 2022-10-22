import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useContract, useSigner } from 'wagmi';
import { BigNumber } from 'ethers'

import { abi } from './ABI'
const CONTRACT_ADDRESS = '0xABb1F7CD38680191740Bd0f753342160E436d878'

const App = () => {

  const { address } = useAccount()
  const { data: signer } = useSigner();

  const [minted, setMinted] = useState(false)
  const [mintLoader, setMintLoader] = useState(false)
  const [tokenId, setTokenId] = useState(null)

  console.log('Minted: ', minted)
  console.log('Minted Loader: ', mintLoader)

  const contract = useContract({
		addressOrName: CONTRACT_ADDRESS,
		contractInterface: abi,
		signerOrProvider: signer,
	});
	console.log("contract ", contract);

  const mintNft = async () => {
		setMinted(false);
		setMintLoader(true);
		
		const mintToken = contract.mintNFT()
    console.log(mintToken)
		// console.log(mint)
		contract.on("Transfer", (from, to, value) => {
			console.log(from, to, value);
      const tokenBigNumber = BigNumber.from(value)
      setTokenId(tokenBigNumber.toString())
			setMintLoader(false);
			setMinted(true);
		});
	};

  const MintComponent = () => (
    <div className='p-4'>
      <div className='flex items-center justify-end'>
        <ConnectButton />
      </div>

      <div style={{ minHeight: '90vh' }} className='flex flex-col gap-4 items-center justify-center'>
        {
          mintLoader ? (
            <p>Loading...</p>
          ) : (
            <button onClick={mintNft} className='bg-black text-white transform hover:scale-105 py-4 px-6 rounded-xl'>Mint NFT</button>
          )

        }
        {minted && (<p>Minted!!</p>)}
        {tokenId && (<div>
          <h1>Checkout your NFT!</h1>
          <a href={`https://testnets.opensea.io/assets/goerli/${CONTRACT_ADDRESS}/${tokenId}`} target="_blank" rel="noreferrer">Opensea</a>
        </div>)}
      </div>
    </div>
  )

  return (
    <div>
      {
        address ? (
          <MintComponent />
        ) : (
          <ConnectButton />
        )
      }
    </div>
  )
};

export default App