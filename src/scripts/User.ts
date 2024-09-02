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

    constructor(data: any) {
        this.id = data.id;
        this.furwazId = data.furwazId;
        this.products = data.products;
        this.cart = data.cart;
        this.checkouts = data.checkouts;
        this.token = data.token;
    }

    public save() {
        localStorage.setItem('user', JSON.stringify({
            id: this.id,
            furwazId: this.furwazId,
            token: this.token
        }));
    }

    public update(data: any) {
        this.id = data.id ?? this.id;
        this.furwazId = data.furwazId ?? this.furwazId;
        this.products = data.products ?? this.products;
        this.cart = data.cart ?? this.cart;
        this.checkouts = data.checkouts ?? this.checkouts
        this.token = data.token ?? this.token;
        this.save();
    }

    // TODO : Implement this
    // public async fetch() {
    //     this.save();
    //     const res = await API.RequestLogged(ROUTES.USERS.ME.GET());
    //     if (res.status !== 200) return;
    //     this.update(await res.data);
    // }
}

export default User;