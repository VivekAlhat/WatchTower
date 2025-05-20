interface IMonitor {
  id: string;
  url: string;
  lastPingedAt: Date;
  logs: { isUp: boolean }[];
}
