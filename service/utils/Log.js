import log4js from "log4js";
import Help from "./Help";
class Log {
  static initLog(type, withDate = true) {
    const filename = withDate
      ? `${global.config.logDir}/${type}.${Help.newDateYYMMDD()}.log`
      : `${global.config.logDir}/${type}.log`;
    log4js.configure({
      appenders: {
        logs: {
          type: "dateFile",
          filename,
          pattern: ".yyyy-MM-dd",
          alwaysIncludePattern: false
        }
      },
      categories: {
        default: { appenders: ["logs"], level: "debug" }
      }
    });
    return log4js.getLogger("SERVICELOG");
  }
  static error(errorMsg) {
    Log.initLog("Error").error(errorMsg);
    Log.initLog("Log", false).error(errorMsg);
  }
  static info(infoMsg) {
    Log.initLog("Info").info(infoMsg);
    Log.initLog("Log", false).info(infoMsg);
  }
}
export default Log;
