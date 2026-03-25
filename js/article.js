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

// 加载并渲染文章
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const filePath = urlParams.get('file');
    
    if (!filePath) {
        document.getElementById('article-title').textContent = '文章未找到';
        document.getElementById('article-body').innerHTML = '<p>请从博客列表选择文章阅读。</p>';
        return;
    }
    
    // 查找文章信息
    const post = posts.find(p => p.file === filePath);
    
    try {
        // 获取 Markdown 内容
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error('文章加载失败');
        }
        
        const markdown = await response.text();
        
        // 设置标题和元信息
        document.getElementById('article-title').textContent = post ? post.title : '文章';
        document.getElementById('article-meta').innerHTML = post 
            ? `${post.date} · ${getCategoryName(post.category)}`
            : '';
        
        // 配置 marked
        marked.setOptions({
            highlight: function(code, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    return hljs.highlight(code, { language: lang }).value;
                }
                return hljs.highlightAuto(code).value;
            },
            breaks: true
        });
        
        // 渲染 Markdown
        document.getElementById('article-body').innerHTML = marked.parse(markdown);
        
        // 高亮代码块
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
        
    } catch (error) {
        document.getElementById('article-title').textContent = '加载失败';
        document.getElementById('article-body').innerHTML = `<p>无法加载文章：${error.message}</p>`;
    }
});

function getCategoryName(cat) {
    const names = {
        'tech': '技术日常',
        'miniworld': '迷你世界'
    };
    return names[cat] || '其他';
}
