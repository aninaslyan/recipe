export class LoggingService {
  lastLog: string;

  printLog(message: string) {
    // console.log(message);
    // console.log(this.lastLog, 'Last Log');
    this.lastLog = message;
  }
}
