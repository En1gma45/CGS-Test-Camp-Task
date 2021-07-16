export const isLogin = () => {
    if (localStorage.getItem("token")) {
        console.log(localStorage.getItem("token"));
        return true;
    }
    console.log('no');
    return false;
}
export const resetLocal = () => {
    window.localStorage.clear()
    window.location.reload(false)
}

