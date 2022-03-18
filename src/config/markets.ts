import { PublicKey } from "@solana/web3.js"

export const FILTERED_MARKETS = [
    {
        address: new PublicKey("9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT"),
        deprecated: false,
        name: "SOL/USDC",
        programId: new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin")
    },
    {
        name: "ETH/USDC",
        programId: new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin"),
        deprecated: false,
        address: new PublicKey("8Gmi2HhZmwQPVdCwzS7CM66MGstMXPcTVHA7jF19cLZz")
    },
    {
        address: new PublicKey("A8YFbxQYFVqKZaoYJLLUVcQiWP7G2MeEgW5wsAQgMvFw"),
        deprecated: false,
        name: "BTC/USDC",
        programId: new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin")
    },
    {
        address: new PublicKey("77quYg4MGneUdjgXCunt9GgM1usmrxKY31twEy3WHwcS"),
        deprecated: false,
        name: "USDT/USDC",
        programId: new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin")
    },
    {
        address: new PublicKey("AvVJcsk26dYHXS9Uya2tkDdSD3i59ubvo1qYKB2w2j5C"),
        deprecated: false,
        name: "BUNNY/USDC",
        programId: new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin")
    }
]