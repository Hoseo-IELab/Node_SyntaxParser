//* UserDefine Start *//
const userDefine = {
	
};
//* UserDefine End *//

isAlive () {
    return false;
}

async run (input) {
    //* Input Start *//
	const $ip = input['ip'];
	const $port = input['port'];
	const $user = input['user'];
	const $pwd = input['pwd'];
	const $search = input['search'];
	//* Input End *//
    let cmd = 'apropos ' + search;

    let url ='/api/ssh/command';

    let data = {
		ip:$ip,
		port:$port,
		user:$user,
		pwd:$pwd,
		cmd: cmd,
    }

    let h = new HttpClient()
    try {
        const res = await h.api(url, data)
        return {
            result: res.resultData
        }
    } catch(e) {
        throw e
    }
}
