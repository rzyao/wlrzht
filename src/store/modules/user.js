import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: '',
        roles: []
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                console.log(' response')
                const { data } = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                console.log(' setToken(data.token)')
                resolve()
            }).catch(error => {
                console.log(' error')
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                console.log(' getInfo(state.token)')
                const { data } = response
                console.log('const { data } = response')
                console.log(typeof data)
                if (!data) {
                    return reject('Verification failed, please Login again.')
                }

                const { roles, name, avatar } = data
                console.log(name)
                commit('SET_NAME', name)
                console.log(avatar)
                commit('SET_AVATAR', avatar)
                console.log(roles)
                console.log(typeof roles)
                console.log(typeof JSON.parse(roles))
                commit('SET_ROLES', JSON.parse(roles))
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    },
    // 变更角色时动态更新路由表，这个也先复制过来
    async changeRoles({ commit, dispatch }, role) {
        const token = role + '-token'
        commit('SET_TOKEN', token)
        setToken(token)
        const { roles } = await dispatch('getInfo')
        resetRouter()
        // generate accessible routes map based on roles
        const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        // reset visited views and cached views
        dispatch('tagsView/delAllViews', null, { root: true })
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

