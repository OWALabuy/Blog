# xray-core反向代理/内网穿透教程

## 内网穿透是什么

假设你玩MC 想和异地的朋友联机 但是你的机器和你朋友的机器都没有公网ip 又不在同一个局域网下 这时候要怎么办呢...

> 肯定有人会说 用小蓝盾做vlan就好啦 但是如果你们用的是linux的机器 无法使用only windows的蓝盾 你又该如何应对

这个时候 就需要用到内网穿透了 就是 使用一个有公网ip的云服务器来做中转节点 你和你的朋友都能直接访问到那台服务器 这样 你就能在自己电脑上开mc联机 通过那个云服务器向外提供服务 将房间暴露在公网中 这样你朋友们就能加入进来了

内网穿透的核心是**反向代理** **代理**相信大家都懂吧 就是你无法直接访问GFW外的内容 但是有一个机器能 而你又刚好能访问到那台机器 那就能通过那台机器代理你的网络流量 随心所欲地访问那些本来无法访问的网站

反向代理就是 别人无法访问你自己局域网里面的服务 但是你的局域网和一个公网服务器主动建立连接 进行数据的交换 这样别人就能通过那台服务器连接到你内网中的服务 就像别人通过一个特定的狗洞钻进你家 它和代理的原理类似 但是方向不一样 实现的细节也不一样

## xray-core

xray-core是很常用的反审查工具 *(别和我说你们用的是2dust的V2rayN&G v2rayN/NG的默认内核还是RPRX家的xray-core)* 它不仅有代理网络流量的功能 同样有路由控制和反向代理的功能 在~~Porn-jet X~~Project X的官方文档里面 有反向代理的教程 但是本喵在实操的时候还是出了一些问题 所以现在我要把问题和解决方法贴出来 保证你们不到半个小时就能搭建好自己的内网穿透线路 和朋友们快乐联机玩游戏

## 前置准备

为了实现内网穿透功能 你首先得有一台有公网ip的机器 获取公网ip的主流方法有两种:

1. 如果你家的宽带有500M以上 打电话去和运营商理论 索要公网ip 很大概率能办下来 就算狡猾的运营商封了80和443端口 也不影响游戏联机 你自己的电脑经过一系列的配置之后就能直接在公网中访问了 不需要搭建内网穿透了 所以请退出这篇文章 寻找路由器光猫和你自己主机的配置教程吧
2. 如果你像我一样居无定所 没有条件拉宽带到你家 或者不是500M以上的vip客户 那就需要去云服务器(vps)供应商那买一个云服务器实例(俗称小鸡) 买小鸡一般会附带一个公网ip 如果你只用于和国内的朋友们联机 不用于科学上网的话 在国内的供应商处买个便宜点的就好了(不是打广告 本喵就是用这家的...阿某云家的小鸡很便宜 99r一年 续费也是这个价钱 可是每个人只能买一台 不过已经足够4到8个人一起玩游戏了 但是阿某云的短信推广还是挺多的...)

购买小鸡时 可以选择操作系统 选一个你喜欢的linux发行版就好了 不要选择windows server 也不要安装面板 以节约性能损耗 到时候直接用ssh连接就好了 和自己电脑的操作都是一样的 下单后一段时间 应该会有短信或邮件通知你的服务器主机名和公网ip的

进入供应商的小鸡管理页面 修改一下你的机器的root密码 千万不要过于简单!!! 否则后果不堪设想(要是别人用root在你的小鸡上执行`rm -rf /` 那就好玩了)

然后打开你自己电脑的终端 用ssh连接你的小鸡 `ssh root@111.222.333.444` (111.222.333.444替换成你的小鸡的公网ip) 然后输入你刚设置好的root密码 应该就能登录上小鸡的命令行了

使用root登录会有风险的 所以你应该创建一个普通用户用于日常使用 给这个用户sudo权限 然后禁用root的远程登录权限 将来一切需要用到root的地方都用sudo 以保证安全性 可以自己去谷歌搜索一下linux创建用户的教程

按ctrl+d掐断ssh 然后用你刚刚创建的普通用户ssh登录你的小鸡 `ssh yourusername@11.22.33.44` 输入你设置的普通用户密码

登录上去应该是在主目录`~` 你可以创建一个名为xray的文件夹`mkdir xray` 输入`ls`就可以查看到你刚刚创建的文件夹

在github上的xray-core repo的release中选择一个版本 找到适合你小鸡系统的发行包 一般是linux-amd64之类的 下载到自己电脑上 用`tar -zxvf xray*tar.gz`解包 用`cd`命令导航到你刚刚解压生成的文件夹 `ls`列出里面的文件 应该会有一个xray可执行文件 也就是绿色的字显示的文件 用scp命令把它上传到你的小鸡的指定目录上

```bash
scp file username@11.22.33.44:/home/username/xray
```

把上面的file换成你要上传的文件名(xray) 用户名和ip替换成你自己的

上传完成后 在ssh上检查该文件是否成功上传到小鸡上 然后把这个xray可执行文件移到你自己电脑的主目录下的一个目录里面 (这样你自己电脑和小鸡上都有这个文件了)

## 编写配置文件



没写完 有时间再写
