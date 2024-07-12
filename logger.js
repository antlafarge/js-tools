// logger.js v0.2

export default class Logger
{
    static LogLevel =
    {
        TRACE: 0,
        DEBUG: 1,
        INFO: 2,
        WARN: 3,
        ERROR: 4,
        TTY_ONLY: 5,
        NO_LOGS: 6
    };

    static #LogLevelStr =
    {
        0: `T`,
        1: `D`,
        2: `I`,
        3: `W`,
        4: `E`,
        5: `C`,
        6: `N`
    }

    static minLogLevel = Logger.LogLevel.TRACE;
    static progressStarted = false;

    static log(logLevel, moduleName, ...messages)
    {
        switch(logLevel)
        {
            case LogLevel.TRACE:
                Logger.logTrace(moduleName, ...messages);
                break;
        }
    }

    static logTrace(moduleName, ...messages)
    {
        if (Logger.minLogLevel <= Logger.LogLevel.TRACE)
        {
            Logger.endProgress();
            console.log(Logger.createLogHeader(Logger.LogLevel.TRACE, moduleName), ...messages);
        }
        else
        {
            Logger.logProgress(moduleName, ...messages);
        }
    }

    static logDebug(moduleName, ...messages)
    {
        if (Logger.minLogLevel <= Logger.LogLevel.DEBUG)
        {
            Logger.endProgress();
            console.log(Logger.createLogHeader(Logger.LogLevel.DEBUG, moduleName), ...messages);
        }
        else
        {
            Logger.logProgress(moduleName, ...messages);
        }
    }

    static logInfo(moduleName, ...messages)
    {
        if (Logger.minLogLevel <= Logger.LogLevel.INFO)
        {
            Logger.endProgress();
            console.info(Logger.createLogHeader(Logger.LogLevel.INFO, moduleName), ...messages);
        }
        else
        {
            Logger.logProgress(moduleName, ...messages);
        }
    }

    static logWarn(moduleName, ...messages)
    {
        if (Logger.minLogLevel <= Logger.LogLevel.WARN)
        {
            Logger.endProgress();
            console.warn(Logger.createLogHeader(Logger.LogLevel.WARN, moduleName), ...messages);
        }
        else
        {
            Logger.logProgress(moduleName, ...messages);
        }
    }

    static logError(moduleName, ...messages)
    {
        if (Logger.minLogLevel <= Logger.LogLevel.ERROR)
        {
            Logger.endProgress();
            console.error(Logger.createLogHeader(Logger.LogLevel.ERROR, moduleName), ...messages);
        }
        else
        {
            Logger.logProgress(moduleName, ...messages);
        }
    }

    static logProgress(moduleName, ...messages)
    {
        if (Logger.minLogLevel <= Logger.LogLevel.TTY_ONLY && process.stdout.isTTY)
        {
            if (Logger.progressStarted)
            {
                process.stdout.clearLine(0);
                process.stdout.cursorTo(0);
            }
            Logger.progressStarted = true;
            process.stdout.write(`${Logger.createLogHeader(Logger.LogLevel.TRACE, moduleName)} ${Array.prototype.join.call(messages, ` `)}`);
        }
    }

    static endProgress()
    {
        if (Logger.progressStarted)
        {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            Logger.progressStarted = false;
        }
    }

    static createLogHeader(logLevel, moduleName)
    {
        let logMessage = `${(new Date()).toISOString()}|${Logger.#LogLevelStr[logLevel]}|`;
        if (moduleName != null && moduleName.length > 0)
        {
            logMessage += `${moduleName}|`;
        }
        return logMessage;
    }
}
