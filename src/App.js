import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useContract, useSigner } from 'wagmi';

import { abi } from './ABI'
const CONTRACT_ADDRESS = '0x6A2663dFC6f1682DDC08F21C2282b2e69722ca9b'

const App = () => {

  const { address } = useAccount()
  const { data: signer } = useSigner();

  const contract = useContract({
		addressOrName: CONTRACT_ADDRESS,
		contractInterface: abi,
		signerOrProvider: signer,
	});
	console.log("contract ", contract);

  const MintComponent = () => (
    <div className='p-4'>
      <div className='flex items-center justify-end'>
        <ConnectButton />
      </div>

      <div style={{ minHeight: '90vh' }} className='flex items-center justify-center'>
        <button className='bg-black text-white transform hover:scale-105 py-4 px-6 rounded-xl'>Mint NFT</button>
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