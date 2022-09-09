import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"

export default function NftDisplay() {
    const getNftApi = `https://polygon-mainnet.g.alchemyapi.io/nft/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTs?contractAddresses[]=0x1Ed25648382c2e6Da067313e5DAcb4F138Bc8b33&contractAddresses[]=0x3CD266509D127d0Eac42f4474F57D0526804b44e&owner=`
    const ipfsRegexPattern = `\/ipfs\/[a-zA-Z0-9]{46}\/[a-zA-Z0-9.]+`

    const { account } = useMoralis()
    const [nftImages, setNftImages] = useState([])


    async function getNfts() {
        try {
            const options = { method: 'GET', headers: { Accept: 'application/json' } }
            const res = await fetch(getNftApi + account, options)
            const response = await res.json()
            const nftData = response.ownedNfts
            setNftImages(nftData.map(item => item.media[0].gateway.includes("/ipfs/") ? 'https://cloudflare-ipfs.com' + item.media[0].gateway.match(ipfsRegexPattern)[0] : item.media[0].gateway))
        }
        catch (err) { console.log(err) }
    }

    const renderMedia = () => {
        return (
            nftImages.map((link, index) => {
                return (
                    link.includes(".mp4")
                        ? <video controls autoplay="" loop muted
                            src={link}
                            className="max-w-sm h-auto"
                            type="video/mp4"
                        />
                        :
                        <img
                            src={link}
                            className="max-w-sm h-auto"
                            key={index}
                        />
                )
            })
        )
    }

    useEffect(() => {
        account ? getNfts() : setNftImages([])
    }, [account])

    return (
        <div className="px-10 py-10 min-h-[80vh]">
            {account
                ? (nftImages.length > 0
                    ? (
                        <div className="">
                            <p className="text-xl text-center pb-10">Congrats 🎉, you have earned {nftImages.length} NFTs from LearnWeb3 and Buildspace. Keep up the awesome work! 💪</p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                {renderMedia()}
                            </div>
                        </div>
                    )
                    : <div className="text-xl text-center pt-10">
                        <p>Unfortunately this address does not have any of LearnWeb3 or Buildspace's proof of knowledge NFTs 😔</p>
                        <p className="pt-5">But fret not, you can get some today by learning <a href="https://learnweb3.io/courses" className="underline underline-offset-2 text-blue-700 hover:font-medium">these courses</a> 👀</p>
                    </div>
                )
                : <div className="text-xl text-center pt-10">Please connect your wallet to proceed by clicking on the top right button.</div>
            }
        </div >
    )
}