import Service from './base'

export default class user extends Service {
    getName() {
        return '张三';
    }
    getAge() {
        return 20;
    }
}
