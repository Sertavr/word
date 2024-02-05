const setCookie = (name, data) => {
    const date = new Date();
    const endTime = new Date(`${date.getFullYear()}-${date.getMonth()}-${date.getDate} 23:59:59`)
    let updateCookie = `${encodeURIComponent(name)} = ${ encodeURIComponent(data)}; expires = ${endTime}`;
    return document.cookie = updateCookie;
};


/* const getCookie = () => {
    return decodeURIComponent(document.cookie);
}
 */
function getCookie(name) {
  /* let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  ); */
    if (document.cookie) {
        let strCookie = decodeURIComponent(document.cookie);
        //return matches ? decodeURIComponent(matches[1]) : undefined;
        return strCookie.split(`${name}=`).at(-1);
    }
    
}

export { setCookie, getCookie };
