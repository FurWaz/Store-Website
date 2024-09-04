import { API } from './API';
import ROUTES from './routes';

type FurWazPortalEvent = 'success' | 'error' | 'ready';
type FurWazPortalOpenMode = 'popup' | 'redirect' | 'tab';
type FurWazPortalCallback = (data: any) => void;

function isMobile() {
    return window.innerWidth <= 768;
}

export default class FurWazPortal {
    private eventListeners: { [key: string]: FurWazPortalCallback[] } = {};
    private portalToken: string | null = null;

    private triggerEvent(event: FurWazPortalEvent, data: any) {
        if (this.eventListeners[event]) {
            this.eventListeners[event].forEach((callback) => {
                callback(data);
            });
        }
    }

    private waitForAuth(recursive: number = 5) {
        if (!this.portalToken) {
            console.error('FurWazPortal waitForAuth error', 'portalToken not found');
            this.triggerEvent('error', 'portalToken not found');
            return;
        }

        API.Request(ROUTES.AUTH.TOKEN(this.portalToken))
            .then((authRes) => {
                if (authRes.error) {
                    console.error('FurWazPortal waitForAuth error', authRes.message);
                    return;
                }
                this.triggerEvent('success', authRes.data);
            })
            .catch((err) => {
                if (recursive > 0) {
                    setTimeout(() => {
                        this.waitForAuth(recursive - 1);
                    }, 1000);
                } else {
                    console.error('FurWazPortal waitForAuth error', err);
                    this.triggerEvent('error', err);
                }
            });
    }

    constructor() {
        API.Request(ROUTES.AUTH.GENERATE)
            .then((portalRes) => {
                if (portalRes.error) {
                    console.error('FurWazPortal constructor error', portalRes.message);
                    this.triggerEvent('error', portalRes.message);
                    return;
                }
                this.portalToken = portalRes.data;
                this.triggerEvent('ready', this.portalToken);
            })
            .catch((err) => {
                console.error('FurWazPortal constructor error', err);
                this.triggerEvent('error', err);
            });
    }

    open(mode: FurWazPortalOpenMode = (isMobile()? 'tab': 'popup')) {
        if (!this.portalToken) {
            console.error('FurWazPortal open error', 'portalToken not found');
            this.triggerEvent('error', 'portalToken not found');
            return;
        }

        this.waitForAuth();

        const url = `https://furwaz.fr/portal?token=${this.portalToken}`;
        switch (mode) {
            case 'tab': {
                const tab = window.open(url, '_blank');
                if (!tab) {
                    console.error('FurWazPortal open error', 'tab blocked');
                    this.triggerEvent('error', 'tab blocked');
                    return;
                }
                break;
            }

            case 'redirect':
                window.location.href = url + '&redirect=' + window.location.href;
                break;

            default: {
                const width = 400;
                const height = 650;
                const left = window.screen.width / 2 - width / 2;
                const top = window.screen.height / 2 - height / 2;
                const features = `popup,width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=no,status=no,toolbar=no,location=no,menubar=no`;
                const popup = window.open(url, 'FurWazPortal', features);
                if (!popup) {
                    console.error('FurWazPortal open error', 'popup blocked');
                    this.triggerEvent('error', 'popup blocked');
                    return;
                }
                popup.focus();
                break;
            }
        }
    }

    on(event: FurWazPortalEvent, callback: FurWazPortalCallback) {
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        this.eventListeners[event].push(callback);
    }
}
