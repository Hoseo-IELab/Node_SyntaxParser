//* UserDefine Start *//
const userDefine = {
	
};
//* UserDefine End *//

isAlive () {
	return false
}
async run (input) {
	//* Input Start *//
    const $node = input['node']
    const $pool_group_id = input['pool_group_id']
    const $from = input['from']
	//* Input End *//

    let url = '/api/BD1AIPlus/deviceCustomer';

    let data = {
        node: $node,
        pool_group_id: $pool_group_id,
        from: $from
    }

    let h = new HttpClient()
    try {
        const res = await h.api(url, data)
        this.console.log('response:', JSON.stringify(res));
        this.console.log('response status:', res.status);
        this.console.log('response data:', JSON.stringify(res.data));

        const _data = res.data.resultData;
        
        return {
            id: _data.id,
            rdate: _data.rdate,
            udate: _data.udate,
            pnode: _data.pnode,
            name: _data.name,
            flag: _data.flag,
            device_type_id: _data.device_type_id,
            sensor_id: _data.sensor_id,
            nat_ip: _data.nat_ip,
            device_ip: _data.device_ip,
            delimiter: _data.delimiter,
            port: _data.port,
            ssh_id: _data.ssh_id,
            ssh_pwd: _data.ssh_pwd,
            ssh_port: _data.ssh_port,
            network_img: _data.network_img,
            img_data_url: _data.img_data_url,
            img_size: _data.img_size,
            user_id: _data.user_id,
            delete_flag: _data.delete_flag,
            ip_type: _data.ip_type,
            admin_mail: _data.admin_mail
        }
    } catch(e) {
        throw e
    }
}