const setCookie = (name, data) => {
  const date = new Date();
  const endTime = new Date(
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`
  );
  let updateCookie = `${encodeURIComponent(name)} = ${encodeURIComponent(
    data
  )}; expires = ${endTime}; path=/`;
  return (document.cookie = updateCookie);
};

function getCookie(name) {
 
  let copyCookie = document.cookie;

  let indexName = copyCookie.lastIndexOf(`${name}=`);
  if (indexName !== -1) {
    let strData = decodeURIComponent(
      copyCookie.slice(indexName + `${name}=`.length)
    );
    return strData;
  }
  return "";
}

export { setCookie, getCookie };
