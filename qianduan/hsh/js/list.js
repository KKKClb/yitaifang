import '../lib/jquery.js';
import { ajax } from '../utils/ajax.js';

let listBox = $('.list'); // 商品列表容器
let categoryBox = $('.category'); // 分类容器
let filterBox = $('.filterBox').first(); // 热销/折扣筛选框
let saleBox = $('.saleBox'); // 折扣筛选框
let sortBox = $('.sortBox'); // 排序框
let searchBox = $('.search'); // 搜索框

// 首页、末页、上一页、下一页按钮
let firstBtn = $('.first');
let prevBtn = $('.prev');
let nextBtn = $('.next');
let lastBtn = $('.last');

let totalBox = $('.total'); // 显示当前页/总页数
let pagesizeBox = $('.pagesize'); // 每页显示的条数
let jumpBox = $('.jump'); // 跳转页输入框
let jumpBtn = $('.go'); // 跳转按钮

let totalPage; // 总页数变量
// 发送请求的数据对象
let data = {
    current: 1, // 当前页码
    pagesize: 12, // 每页显示条数
    search: '', // 搜索关键字
    filter: '', // 筛选类型，hot:热销, sale:折扣, ''表示全部
    saleType: 10, // 折扣类型，范围5~10
    sortType: 'id', // 排序类型，id || sale || price
    sortMethod: 'ASC', // 排序方式，ASC升序, DESC降序
    category: '', // 分类，空字符串表示全部
};

// 渲染分类列表函数
async function renderCategory() {
    try {
        let { data: { code, list } } = await ajax.get('/goods/category');
        if (code !== 1) throw new Error('获取分类列表失败');

        // 清空原有内容
        categoryBox.empty();

        // 添加“全部”分类选项
        let str = `<li class="active">全部</li>`;
        // 遍历分类列表并添加到字符串
        list.forEach(e => str += `<li>${e}</li>`);
        // 将分类渲染到页面
        categoryBox.html(str);
    } catch (error) {
        console.error(error.message);
    }
}
renderCategory();

// 渲染商品列表函数
async function renderList() {
    try {
        let { data: { code, list, total } } = await ajax.get('/goods/list', { params: data });
        if (code !== 1) throw new Error('获取商品列表失败');

        // 渲染商品列表
        let str = '';
        list.forEach(e => {
            str += `<li data-id="${e.goods_id}">
                        <div class="show">
                            <img src="${e.img_big_logo}">
                            ${e.is_hot ? '<span class="hot">热销</span>' : ''}
                            ${e.is_sale ? '<span class="sale">折扣</span>' : ''}
                        </div>
                        <div class="info">
                            <p class="title">${e.title}</p>
                            <p class="price">
                                <span class="curr">¥ ${e.current_price}</span>
                                <span class="old">${e.price ? `¥ ${e.price}` : ''}</span>
                            </p>
                        </div>
                    </li>`;
        });


        // 没有商品时显示 nothing 图片
        if (list.length === 0) {
            data.current = 0; // 重置当前页为0
            str = '<img src="../img/no.png" alt="No Goods">';
        }

        // 渲染到页面上
        listBox.html(str);

        // 更新分页信息
        totalPage = total;
        totalBox.text(`${data.current} / ${totalPage}`);
        jumpBox.val(data.current);

        // 初始化分页按钮状态
        prevBtn.removeClass('disable');
        nextBtn.removeClass('disable');
        firstBtn.removeClass('disable');
        lastBtn.removeClass('disable');

        // 禁用首页、上一页按钮，如果当前页是第一页
        if (data.current <= 1) {
            prevBtn.addClass('disable');
            firstBtn.addClass('disable');
        }
        // 禁用末页、下一页按钮，如果当前页是最后一页
        if (data.current >= totalPage) {
            nextBtn.addClass('disable');
            lastBtn.addClass('disable');
        }
    } catch (error) {
        console.error(error.message);
    }
}
$(document).ready(function() {
    renderList();
});
// 分类点击事件
categoryBox.on('click', ({ target }) => {
    if (target.nodeName === 'LI') {
        categoryBox.children().removeClass('active');
        $(target).addClass('active');

        let str = target.textContent.trim();
        data.category = str === '全部' ? '' : str;
        data.current = 1;
        renderList();
    }
});

// 首页、末页、上一页、下一页点击事件
firstBtn.on('click', () => {
    data.current = 1;
    renderList();
});

lastBtn.on('click', () => {
    data.current = totalPage;
    renderList();
});

prevBtn.on('click', () => {
    if (data.current > 1) data.current--;
    renderList();
});

nextBtn.on('click', () => {
    if (data.current < totalPage) data.current++;
    renderList();
});

// 跳转按钮点击事件
jumpBtn.on('click', () => {
    const pageNum = parseInt(jumpBox.val().trim());
    if (pageNum >= 1 && pageNum <= totalPage) {
        data.current = pageNum;
        renderList();
    } else {
        alert(`请输入有效的页码 (1-${totalPage})`);
    }
});

// 一页显示几条数据变化事件
pagesizeBox.on('change', () => {
    data.pagesize = parseInt(pagesizeBox.val(), 10);
    data.current = 1;
    renderList();
});

// 热销/折扣点击事件
filterBox.on('click', ({ target }) => {
    if (target.nodeName === 'LI') {
        filterBox.children().removeClass('active');
        $(target).addClass('active');
        data.filter = target.dataset.type || '';
        data.current = 1;
        renderList();
    }
});

// 打几折点击事件
saleBox.on('click', ({ target }) => {
    if (target.nodeName === 'LI') {
        saleBox.children().removeClass('active');
        $(target).addClass('active');
        data.saleType = parseInt(target.dataset.type, 10) || 10;
        data.current = 1;
        renderList();
    }
});

// 排序点击事件
sortBox.on('click', ({ target }) => {
    if (target.nodeName === 'LI') {
        sortBox.children().removeClass('active');
        $(target).addClass('active');
        data.sortType = target.dataset.type || 'id';
        data.sortMethod = target.dataset.method || 'ASC';
        data.current = 1;
        renderList();
    }
});

// 搜索输入事件
searchBox.on('input', () => {
    data.search = searchBox.val().trim();
    data.current = 1;
    renderList();
});

// 商品详情点击事件
listBox.on('click', ({ target }) => {
    if (target.nodeName === 'LI') {
        let id = target.dataset.id;
        sessionStorage.setItem('id', id);
        location.href = './detail.html';
    }
});
