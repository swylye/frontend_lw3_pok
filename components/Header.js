import { ConnectButton } from "@web3uikit/web3"

export default function Header() {
    return (
        <div className="flex justify-between border-b-2 p-5">
            <div className="flex items-center gap-4">
                <img
                    src="/logo-blue.png"
                    className="object-contain w-1/3"
                />
                <div className="text-2xl font-bold">Proof of Knowledge</div>
            </div>
            <ConnectButton MoralisAuth={false} />
        </div>
    )
}