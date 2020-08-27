import Axios from 'axios';
import qs from 'qs';
export function myAxios(url, param) {
  return new Promise(function (resolve) {
    Axios.post('http://127.0.0.1:3000' + url, qs.stringify(param))
    // Axios.post('http://47.106.200.29:8080/PHK' + url, qs.stringify(param))
    // Axios.post('/api/PHK' + url, qs.stringify(param))
      .then(res => {
        resolve(res);
      })
  })
}

export function myFormAxios(url,formData){
  return new Promise(function (resolve) {
    Axios.post('http://127.0.0.1:3000' + url, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    // Axios.post( 'http://47.106.200.29:8080/PHK' + url, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    // Axios.post( '/api/PHK' + url, formData, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(res => {
        resolve(res);
      })
  })
}


export function uploadBigPic(url,formData){
  return new Promise(function (resolve) {
    // Axios.post( 'http://milkwu.cn/PHK' + url, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    // Axios.post( 'http://47.106.200.29:8080/PHK' + url, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    Axios.post( '/api/PHK' + url, formData, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(res => {
        resolve(res.data);
      });
  })
}
export function downloadIamge(imgsrc){//下载图片地址和图片名
  return new Promise(function () {
    console.log(imgsrc);
    let image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = function() {
      let canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      let context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, image.width, image.height);
      let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

      let a = document.createElement("a"); // 生成一个a元素
      let event = new MouseEvent("click"); // 创建一个单击事件
      // a.download = name || "photo"; // 设置图片名称
      a.download = "headPhoto"; // 设置图片名称
      a.href = url; // 将生成的URL设置为a.href属性
      a.dispatchEvent(event); // 触发a的单击事件
    };
    image.src = imgsrc;
  })
}


