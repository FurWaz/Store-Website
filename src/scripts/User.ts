import { API } from "./API";
import ROUTES from "./routes";

class User {
    /** @type {User} */
    static #currentUser: User | null = null;
    static get CurrentUser() {
        return User.#currentUser || User.FromLocalStorage();
    }

    public static FromLocalStorage() {
        const data = localStorage.getItem('user');
        if (!data) return null;
        return new User(JSON.parse(data));
    }

    public static Forget() {
        localStorage.removeItem('user');
        User.#currentUser = null;
        window.location.reload();
    }

    public id: number;
    public furwazId: number;
    public products: any[];
    public cart: any[];
    public checkouts: any[];
    public token: string;
    public pseudo: string;

    constructor(data: any) {
        this.id = data.id;
        this.furwazId = data.furwazId;
        this.products = data.products;
        this.cart = data.cart;
        this.checkouts = data.checkouts;
        this.token = data.token;
        this.pseudo = data.pseudo;
    }

    public save() {
        localStorage.setItem('user', JSON.stringify({
            id: this.id,
            furwazId: this.furwazId,
            token: this.token,
            pseudo: this.pseudo
        }));
    }

    public update(data: any) {
        this.id = data.id ?? this.id;
        this.furwazId = data.furwazId ?? this.furwazId;
        this.products = data.products ?? this.products;
        this.cart = data.cart ?? this.cart;
        this.checkouts = data.checkouts ?? this.checkouts
        this.token = data.token ?? this.token;
        this.pseudo = data.pseudo ?? this.pseudo;
        this.save();
    }

    public async fetch() {
        const res = await API.Request(ROUTES.FURWAZ.USER.GET(this.furwazId));
        if (res.error) {
            console.error('User fetch error', res.message);
            return;
        }
        this.update(res.data);
    }
}

export default User;