import {DeviceEventEmitter, NativeModules, Platform} from 'react-native';

const RNOtpVerify = NativeModules.RNOtpVerify;

interface OtpVerify {
    getOtp: () => Promise<boolean>;
    getHash: () => Promise<string[]>;
    addListener: (handler: (value: string) => any) => void;
    removeListener: () => void;
}

// @ts-ignore
let OtpVerify: OtpVerify = null;
if (Platform.OS === "android") {
    OtpVerify = {
        getOtp: RNOtpVerify.getOtp,
        getHash: RNOtpVerify.getHash,

        addListener: (handler) =>{
            RNOtpVerify.registerReceiver();
            DeviceEventEmitter
                .addListener('com.faizalshap.otpVerify:otpReceived', handler)
        },

        removeListener: () => {
            DeviceEventEmitter.removeAllListeners('com.faizalshap.otpVerify:otpReceived')
            RNOtpVerify.unregisterReceiver();
        },
    }
}
export default OtpVerify;
