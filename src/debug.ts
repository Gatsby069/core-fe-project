import {app} from "./app";

if (process.env.NODE_ENV === "development") {
    (window as any).__PRINT_LOGS__ = () => {
        const logs = app.logger.collect();
        if (logs.length === 0) {
            console.warn("No logs currently");
        } else {
            console.info("#### [" + new Date().toLocaleString() + "] Logs, Total " + logs.length);
            logs.forEach((_, index) => {
                let colorString: string;
                if (_.result === "OK") {
                    colorString = "background:green; color:#fff";
                } else {
                    colorString = "background:red; color:#fff";
                }
                console.info(`%c (${index + 1}) ${_.result} `, colorString, _.date.toLocaleString());
                if (_.errorCode) {
                    console.info(`%c CODE `, "background:red; color:#fff", _.errorCode);
                }
                if (_.action) {
                    console.info(`%c ACTION `, "background:#ddd; color:#111", _.action);
                }
                if (Object.keys(_.info).length > 0) {
                    console.info(`%c INFO `, "background:#ddd; color:#111", _.info);
                }
            });
        }
    };
}
