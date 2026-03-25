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

// 加载最新文章到首页
document.addEventListener('DOMContentLoaded', () => {
    const latestPostsContainer = document.getElementById('latest-posts-list');
    if (latestPostsContainer) {
        // 取最新的3篇文章
        const latestPosts = posts.slice(0, 3);
        
        latestPosts.forEach(post => {
            const postEl = document.createElement('div');
            postEl.className = 'post-item';
            postEl.innerHTML = `
                <h3><a href="/article.html?file=${encodeURIComponent(post.file)}">${post.title}</a></h3>
                <p class="post-meta">${post.date} · ${getCategoryName(post.category)}</p>
                <p>${post.desc}</p>
            `;
            latestPostsContainer.appendChild(postEl);
        });
    }
});

function getCategoryName(cat) {
    const names = {
        'tech': '技术日常',
        'miniworld': '迷你世界'
    };
    return names[cat] || '其他';
}
