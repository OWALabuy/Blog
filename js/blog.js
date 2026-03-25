// 文章数据配置
const posts = [
    {
        title: "如何将vim内容复制到系统剪贴板",
        file: "Daily/如何将vim内容复制到系统剪贴板.md",
        category: "tech",
        date: "2024-07-10",
        desc: "解决 vim 与系统剪贴板互通的问题"
    },
    {
        title: "文字终端大法好",
        file: "Daily/文字终端大法好.md",
        category: "tech",
        date: "2024-07-10",
        desc: "文字终端使用指南"
    },
    {
        title: "xray-core反向代理-内网穿透教程",
        file: "Daily/xray-core反向代理-内网穿透教程.md",
        category: "tech",
        date: "2024-07-10",
        desc: "内网穿透实战教程"
    },
    {
        title: "在Linux系统中使用wine运行迷你世界的方法和问题解决",
        file: "Miniworld/在Linux系统中使用wine运行迷你世界的方法和问题解决.md",
        category: "miniworld",
        date: "2024-07-10",
        desc: "Linux 上玩迷你世界的完整方案"
    },
    {
        title: "关于调整玩家速度的接口的迷思",
        file: "Miniworld/关于调整玩家速度的接口的迷思.md",
        category: "miniworld",
        date: "2024-07-10",
        desc: "迷你世界游戏机制研究"
    }
];

// 渲染文章列表
function renderPosts(filterCategory = 'all') {
    const container = document.getElementById('posts-list');
    container.innerHTML = '';
    
    const filteredPosts = filterCategory === 'all' 
        ? posts 
        : posts.filter(p => p.category === filterCategory);
    
    if (filteredPosts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-muted);">暂无文章</p>';
        return;
    }
    
    filteredPosts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.className = 'post-item';
        postEl.innerHTML = `
            <h3><a href="/article.html?file=${encodeURIComponent(post.file)}">${post.title}</a></h3>
            <p class="post-meta">${post.date} · ${getCategoryName(post.category)}</p>
            <p>${post.desc}</p>
        `;
        container.appendChild(postEl);
    });
}

function getCategoryName(cat) {
    const names = {
        'tech': '技术日常',
        'miniworld': '迷你世界'
    };
    return names[cat] || '其他';
}

// 分类筛选
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPosts(btn.dataset.category);
        });
    });
});
