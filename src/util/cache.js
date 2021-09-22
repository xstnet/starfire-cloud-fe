class Cache  {
    static get = name => localStorage.getItem(name)
    static getJson = name => JSON.parse(localStorage.getItem(name))
    static set = (name, value) => localStorage.setItem(name, value)
    static setJson = (name, value) => localStorage.setItem(name, JSON.stringify(value))
    static remove = name => localStorage.removeItem(name)
    static setSession = (name, value) => sessionStorage.setItem(name, value)
    static removeSession = (name) => sessionStorage.removeItem(name)

    static getSession = (name) => {
        let data = this.get(name);
        if (data) {
            return data;
        } else {
            return false;
        }
    }

    static getToken = () => {
        let token = this.get('token');
        if (token === null || token === false || token.length < 10) {
            token = '';
        }
        return token;
    }
}

export default Cache;