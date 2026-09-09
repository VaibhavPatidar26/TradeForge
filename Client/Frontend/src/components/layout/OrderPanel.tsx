import { useStockStore } from "../../store/stockStore";

export default function OrderPanel() {

  const currentStock = useStockStore(function(state){
    return state.stock
  })
console.log(currentStock);
  
  return (
    <div className="w-[300px] h-full bg-[#0b0e14] border-l border-[#1f2937] p-4 flex flex-col">
      
      {/* Header */}
      <h2 className="text-lg font-semibold text-white mb-6">
        Market Order
      </h2>
      {//stock details
      }
      <div className="bg-white">
        {currentStock?.name} {currentStock?.exchange}
      </div>
      {/* Input Section */}
      <div className="flex flex-col gap-2 mb-6">
        <label className="text-xs text-gray-400 font-medium uppercase tracking-wider">
          Quantity
        </label>
        <input 
          type="number" 
          placeholder="0" 
          className="h-10 w-full bg-[#131722] text-white border border-[#2a2e39] rounded px-3 focus:outline-none focus:border-[#089981] placeholder-gray-600 transition-colors" 
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-auto mb-4">
        <button className="flex-1 bg-[#089981] hover:bg-[#067a67] text-white font-semibold py-2.5 rounded transition-colors">
          BUY
        </button>
        <button className="flex-1 bg-[#f23645] hover:bg-[#c22b37] text-white font-semibold py-2.5 rounded transition-colors">
          SELL
        </button>
      </div>

    </div>
  );
}