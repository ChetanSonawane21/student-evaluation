const process = require('process');

const Exceptions =  { 
    UNCAUGHT_EXCEPTION : 'uncaughtException', 
    UNHANDLED_REJECTION : 'unhandledRejection' 
};

const handleExceptions = () => {
    process.on(Exceptions.UNCAUGHT_EXCEPTION, async (ex) => {
        const stack = JSON.stringify(ex, Object.getOwnPropertyNames(ex));
        console.log(`${Config.COLOUR.red} Exception Occured: ${stack} ${Config.COLOUR.reset}`);
        setTimeout(() => process.exit(), 5000);
    });
    
    process.on(Exceptions.UNHANDLED_REJECTION, async (ex) => {
        const stack = JSON.stringify(ex, Object.getOwnPropertyNames(ex));
        console.log(`${Config.COLOUR.red} Exception Occured: ${stack} ${Config.COLOUR.reset}`);
        setTimeout(() => process.exit(), 5000);
    });
};

module.exports = {
    handleExceptions
};