import { NativeEventEmitter } from 'react-native';
declare class TVRemoteHandler {
    __listener: any;
    __eventEmitter: NativeEventEmitter;
    enable(component: any, callback: any): void;
    disable(): void;
}
declare const useTVRemoteHandler: (callback: any) => {};
export { useTVRemoteHandler, TVRemoteHandler };
//# sourceMappingURL=index.tvos.d.ts.map