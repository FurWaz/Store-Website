import { API } from "~/composables/API";
import ROUTES from "~/composables/ROUTES";

type TokensPair = {access: string, refresh: string};
export default class User {
    public static FromLocalStorage() {
        if (!import.meta.client) return null;
        
        const user = localStorage.getItem('user');
        if (user) {
            const json = JSON.parse(user);
            if (!json || !json.id)
                return null;
            return new User(json);
        }
        return null;
    }

    public static ToLocalStorage(user: any) {
        localStorage.setItem(
            'user',
            JSON.stringify({
                id: user._id,
                furwazId: user._furwazId,
                token: user._token,
                pseudo: user._pseudo,
                firstName: user._firstName,
                lastName: user._lastName,
                email: user._email,
                phone: user._phone,
                address: user._address,
                city: user._city,
                postalCode: user._postalCode,
                country: user._country
            })
        );
    }

    public static Forget() {
        localStorage.removeItem('user');
        this.CurrentUser = null;
        window.location.reload();
    }

    private static CurrentUser: User|null = null;

    public static get Current() {
        if (!this.CurrentUser) {
            this.CurrentUser = this.FromLocalStorage();
        }
        return this.CurrentUser;
    }

    public static set Current(user: User|null) {
        this.CurrentUser = user;
        this.ToLocalStorage(user);
    }

    public static get IsAuthenticated() {
        return this.Current !== null;
    }
    
    public _id: number;
    public _furwazId: number;
    public _firstName: string;
    public _lastName: string;
    public _email: string;
    public _phone: string;
    public _address: string;
    public _city: string;
    public _postalCode: string;
    public _country: string;
    public _token: string;
    public _pseudo: string;

    constructor(data: any) {
        this._id = data.id;
        this._furwazId = data.furwazId;
        this._token = data.token;
        this._pseudo = data.pseudo;
        this._firstName = data.firstName;
        this._lastName = data.lastName;
        this._email = data.email;
        this._phone = data.phone;
        this._address = data.address;
        this._city = data.city;
        this._postalCode = data.postalCode;
        this._country = data.country
    }

    public async fetchInformations() {
        const res = await API.Request(ROUTES.FURWAZ.USER.GET(this._furwazId));
        if (res.error) {
            console.log("Error while fetching user informations", res);
            return;
        }
        this.updateInformations(res.data);
    }

    public updateInformations(infos: any) {
        this._id = infos.id ?? this._id;
        this._furwazId = infos.furwazId ?? this._furwazId;
        this._token = infos.token ?? this._token;
        this._pseudo = infos.pseudo ?? this._pseudo;
        this._firstName = infos.firstName ?? this._firstName;
        this._lastName = infos.lastName ?? this._lastName;
        this._email = infos.email ?? this._email;
        this._phone = infos.phone ?? this._phone;
        this._address = infos.address ?? this._address;
        this._city = infos.city ?? this._city;
        this._postalCode = infos.postalCode ?? this._postalCode;
        this._country = infos.country ?? this._country;
        this.save();
    }

    public async fetch() {
        const res = await API.Request(ROUTES.FURWAZ.USER.GET(this._furwazId));
        if (res.error) {
            console.error('User fetch error', res.message);
            return;
        }
        this.updateInformations(res.data);
    }

    public save() {
        User.Current = this;
        User.ToLocalStorage(this);
    }

    public get id() {
        return this._id;
    }

    public get pseudo() {
        return this._pseudo;
    }

    public get email() {
        return this._email;
    }

    public get furwazId() {
        return this._furwazId;
    }

    public get token() {
        return this._token;
    }

    public get phone() {
        return this._phone;
    }

    public get address() {
        return this._address;
    }
    
    public get city() {
        return this._city;
    }

    public get postalCode() {
        return this._postalCode;
    }

    public get country() {
        return this._country;
    }

    public get lastName() {
        return this._lastName;
    }

    public get firstName() {
        return this._firstName;
    }
};