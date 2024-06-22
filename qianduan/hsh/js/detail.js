import { ajax } from '../utils/ajax.js';  
import '../lib/jquery.js';  
  
// 渲染函数  
async function render() {  
    // 检查商品ID是否存在  
    const id = sessionStorage.getItem('id');  
    if (!id) {  
        alert('非法访问');  
        location.href = './list.html'; // 直接跳转，无需return  
        return; // 这里其实不需要return，因为已经跳转了  
    }  
  
    // 请求商品详细信息  
    try {  
        const response = await ajax.get(`/goods/item/${id}`);  
        if (response.data.code !== 1) {  
            throw new Error('获取商品详情失败');  
        }  
  
        const info = response.data.info;  
  
        // 设置页面元素内容  
        $('.title').text(info.title);  
        $('.middleimg').attr('src', info.img_big_logo);  
        $('.desc').html(info.goods_introduce);  
  
        // 格式化并设置价格信息  
        $('.old').text(info.price.toFixed(2)); // 假设价格为数字类型，并保留两位小数  
        $('.discount').text(((info.current_price / info.price) * 100).toFixed(2) + '%'); // 转换为百分比并保留两位小数  
        $('.curprice').text(info.current_price.toFixed(2)); // 假设价格为数字类型，并保留两位小数  
  
    } catch (error) {  
        // 如果请求失败或数据验证失败，显示错误并跳转回商品列表页  
        alert(error.message || '获取商品详情时发生错误');  
        location.href = './list.html';  
    }  
}  
  
// 调用渲染函数  
render();