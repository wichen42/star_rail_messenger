import { isWithinTokenLimit } from "gpt-tokenizer";

function useTruncateHistory () {

    function truncateHistory (context, token_size) {
        let truncatedContext = context;
        let token_length = isWithinTokenLimit(context, token_size);

        console.log(truncatedContext);

        let startIndex = truncatedContext.indexOf('|||');
        let endIndex = truncatedContext.indexOf('|||', (startIndex + 1)) + 3;

        // Truncate string until withing token_size limit
        while (!token_length) {
            let startIndex = truncatedContext.indexOf('|||');
            let endIndex = truncatedContext.indexOf('|||', (startIndex + 1)) + 3;

            if (startIndex === -1 || endIndex === -1) {
                break;
            };

            truncatedContext = truncatedContext.substring(endIndex);
            
            token_length = isWithinTokenLimit(truncatedContext, token_size);
        };
        
        console.log(truncatedContext);
        return truncatedContext;

    };

    return truncateHistory;
};

export default useTruncateHistory;


