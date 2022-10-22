import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useContract, useSigner } from 'wagmi';

import { abi } from './ABI'
const CONTRACT_ADDRESS = '0xABb1F7CD38680191740Bd0f753342160E436d878'

const App = () => {

  const { address } = useAccount()
  const { data: signer } = useSigner();

  const [minted, setMinted] = useState(false)
  const [mintLoader, setMintLoader] = useState(false)

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
			setMintLoader(false);
			setMinted(true);
		});
	};

  const MintComponent = () => (
    <div className='p-4'>
      <div className='flex items-center justify-end'>
        <ConnectButton />
      </div>

      <div style={{ minHeight: '90vh' }} className='flex items-center justify-center'>
        {
          mintLoader ? (
            <p>Loading...</p>
          ) : (
            <button onClick={mintNft} className='bg-black text-white transform hover:scale-105 py-4 px-6 rounded-xl'>Mint NFT</button>
          )

        }
        {minted && (<p>Minted!!</p>)}
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