// import React from "react"

type Props = {
    Stocks: any[]
}
export default function FloatingWindow({Stocks=[]}:Props){

    if (Stocks.length === 0) return null;

    return (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-72 overflow-y-auto rounded-lg border border-[#252b33] bg-[#11161c] shadow-2xl shadow-black/60">
            {Stocks.map((item)=>{
                return(
                    <div
                        key={item.instrument_key}
                        className="flex cursor-pointer items-center gap-3 border-b border-[#1a2028] px-3 py-2.5 transition-colors last:border-b-0 hover:bg-[#1a2028]"
                    >
                        <div className="flex min-w-0 flex-1 flex-col">
                            <span className="truncate text-sm font-medium text-gray-200">
                                {item.name}
                            </span>
                            {item.instrument_key && (
                                <span className="truncate text-[11px] text-gray-500">
                                    {item.instrument_key}
                                </span>
                            )}
                        </div>
                        {item.exchange && (
                            <span className="shrink-0 rounded border border-[#252b33] px-1.5 py-0.5 text-[10px] font-medium uppercase text-gray-500">
                                {item.exchange}
                            </span>
                        )}
                    </div>
                )
            })}
        </div>
    )
   
}