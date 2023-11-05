function getBase64(file: File) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    return reader.result
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

export default getBase64;