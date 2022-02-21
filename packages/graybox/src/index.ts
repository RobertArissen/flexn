import ios from './implementations/wdio/IosRunner';
import tvos from './implementations/wdio/TvosRunner';
import android from './implementations/wdio/AndroidRunner';
import androidtv from './implementations/wdio/AndroidtvRunner';
import macos from './implementations/wdio/MacosRunner';
import macosElectron from './implementations/wdio/MacosElectronRunner';
import web from './implementations/wdio/WebRunner';

const selectRunner = (): any => {
    if (process.env.PLATFORM === 'ios') {
        return ios;
    }
    if (process.env.PLATFORM === 'tvos') {
        return tvos;
    }
    if (process.env.PLATFORM === 'android') {
        return android;
    }
    if (process.env.PLATFORM === 'androidtv') {
        return androidtv;
    }
    if (process.env.PLATFORM === 'macos') {
        if (process.env.ENGINE === 'macos') {
            return macos;
        }
        if (process.env.ENGINE === 'electron') {
            return macosElectron;
        }
    }
    if (process.env.PLATFORM === 'web') {
        return web;
    }
};

const FlexnRunner = selectRunner();

export default new FlexnRunner();
