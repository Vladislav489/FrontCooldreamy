import LOCAL_STORAGE from "./localStorage"

export const deauthorize = () => {
  process?.browser && LOCAL_STORAGE?.removeItem('cooldate-web-token')
  process?.browser && LOCAL_STORAGE?.removeItem('cooldate-web-user-id')
  // location.replace('/start')
}

export const authorize = () => {

}

const authApi = {
  deauthorize,
  authorize
}

export default authApi;