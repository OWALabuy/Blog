# 如何将vim中的内容复制到系统剪贴板

vim是我们常用的文本编辑器 它有独特的基于键盘的操作 但是部分vim版本不支持剪贴板 那如何将vim中的内容复制出去呢

作者的环境: ubuntu focal/jammy/noble, gnome terminal

首先安装`xclip`

```sh
sudo apt install xclip
```

然后配置vim的键位映射

在你的vim配置文件(通常是~/.vimrc)中添加下面的内容

```vim script
vmap <leader>y :w !xclip -selection clipboard<CR><CR>
```

写入后 输入:source %

现在 按v进入可视模式 选中一些文字 按下<leader>(通常是`\`) 再按y 选中的东西就会自动被复制到你的剪贴板了
