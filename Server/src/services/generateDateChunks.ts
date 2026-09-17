function generateDateChunks(fromDateStr: string, toDateStr: string, maxDaysPerChunk: number = 30) {
    const chunks: { from: string; to: string }[] = [];
    let currentTo = new Date(toDateStr);
    const targetFrom = new Date(fromDateStr);

    while (currentTo > targetFrom) {
        const currentFrom = new Date(currentTo);
        currentFrom.setDate(currentFrom.getDate() - maxDaysPerChunk);

        // Ensure we don't overshoot targetFrom
        const chunkFrom = currentFrom < targetFrom ? targetFrom : currentFrom;

        chunks.push({
            from: chunkFrom.toISOString().split("T")[0],
            to: currentTo.toISOString().split("T")[0]
        });

        // Move to the next slice
        currentTo = new Date(chunkFrom);
        currentTo.setDate(currentTo.getDate() - 1);
    }

    return chunks;
}

export default generateDateChunks;