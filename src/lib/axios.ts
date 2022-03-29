import axios from "axios"

const requestApiList = [] // 请求中的api
const CancelToken = axios.CancelToken // cancel属性
const isIncludeType = (config) => {
    const { method, params = {} } = config
    let cancelType = 2; // 1 首次请求有效  2：最后一次请求有效  3：不做处理
    if (method == 'get') {
        cancelType = params.cancelType || 2
    }
    let isInclude = [1, 2].includes(cancelType)
    return {
        cancelType,
        isInclude
    }
}

const cancelHandle = (config, c, cancelType) => {
    if (!config) return;
    var url = config.url;
    var index = requestApiList.findIndex((i) => {
        return i.url === url;
    });
    // 首次请求有效，取消后面所有请求
    if (cancelType === 1) {
        if (index > -1) {
            // 后面匹配到的请求，执行取消
            c ? c('数据请求中，请稍后') : requestApiList.splice(index, 1);
        } else {
            // 向数组推入一个当前url记录
            requestApiList.push({
                url: url,
                params: config.params,
                c: c
            });
        }
    }
    // 最后一次请求有效，取消前面所有请求
    if (cancelType === 2) {
        if (index > -1) {
            // 将最早推入的记录进行取消请求
            c && requestApiList[index].c('数据请求中，请稍后');
            requestApiList.splice(index, 1);
        }
        // 每次推入一条记录
        c && requestApiList.push({
            url: url,
            params: config.params,
            c: c
        });
    }
}
const cancelRasetHandle = (config) => {
    if (!config) return;
    var url = config.url;
    var index = requestApiList.findIndex((i) => {
        return i.url === url;
    });
    requestApiList.splice(index, 1);
}


axios.interceptors.request.use((config) => {
    const { isInclude, cancelType } = isIncludeType(config)
    // 需要设置取消拦截方式
    if (isInclude) {
        config.cancelToken = new CancelToken((c) => {
            cancelHandle(config, c, cancelType)
        })
    }
    return config
})
axios.interceptors.response.use((res) => {
    // cancelRasetHandle(res.config)
    return res
})

export default axios