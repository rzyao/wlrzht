import Vue from 'vue'
import MyAlert from './alert.vue'
const MyAlertConstructor = Vue.extend(MyAlert)

const confirmer = function(options) {
    const confirmChoose = new Promise((resolve, reject) => {
        options = options || {} // 获取参数

        // 基于我们写好的 alert 组件实例化一个新的 alert 实例
        const instance = new MyAlertConstructor({
            data: options // 这里解释了为什么参数不用 props 而用 data
        })
        instance.$mount() // 加载实例，不能加参数，如果加了 body 参数会把整个 body 覆盖重写
        document.body.appendChild(instance.$el) // 将上一步加载的实例添加到 body 上
        instance.visible = true // 设置 data 里的 visible 为 true 显示弹框
        // return instance
        instance.confirm = function() {
            resolve()
            instance.resetAlert()
        }
    }).catch(error => {
        console.log('error', error) // 这里会打印捕获的异常是什么，我这里是false
    })
    return confirmChoose
}
// async function confirmChoose(options) {
//     let res = true
//     try {
//         // await后面是一个promise对象
//         res = await confirmer(options)
//         return res
//     } catch (e) {
//         // 捕获到错误 转为立即resolve的promise对象
//         return
//     }
// }

export default confirmer
