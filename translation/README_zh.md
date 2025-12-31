![Second Me](https://github.com/mindverse/Second-Me/blob/master/images/cover.png)

<div align="center">
  
[![主页](https://img.shields.io/badge/Second_Me-主页-blue?style=flat-square&logo=homebridge)](https://www.secondme.io/)
[![AI原生记忆](https://img.shields.io/badge/AI--native_Memory-arXiv-orange?style=flat-square&logo=academia)](https://arxiv.org/abs/2406.18312)
[![AI原生记忆 2.0](https://img.shields.io/badge/AI--native_Memory_2.0-arXiv-red?style=flat-square&logo=arxiv)](https://arxiv.org/abs/2503.08102)
[![Discord](https://img.shields.io/badge/聊天-Discord-5865F2?style=flat-square&logo=discord&logoColor=white)](https://discord.gg/GpWHQNUwrg)
[![Twitter](https://img.shields.io/badge/关注-@SecondMe_AI-1DA1F2?style=flat-square&logo=x&logoColor=white)](https://x.com/SecondMe_AI1)
[![Reddit](https://img.shields.io/badge/加入-Reddit-FF4500?style=flat-square&logo=reddit&logoColor=white)](https://www.reddit.com/r/SecondMeAI/)
[![查看FAQ](https://img.shields.io/badge/FAQ-GitBook-blue?style=flat-square)](https://secondme.gitbook.io/secondme/faq)

</div>


## 我们的愿景

像OpenAI这样的公司构建了威胁人类独立性的"超级AI"。我们渴望个性化：能够放大而非抹杀**你**的AI。

我们正在用"**Second Me**"挑战这一现状：这是一个开源原型，让你打造自己的**AI自我**——一个保护你、传递你的背景、维护你利益的新AI物种。

它是**本地训练和托管**的——你的数据，你的控制——但**全球连接**，在AI网络中扩展你的智能。除此之外，它还是你的AI身份接口——一个连接你的AI与世界的大胆标准，激发AI自我之间的协作，构建真正原生的明日AI应用。

技术爱好者、AI专业人士、领域专家，加入我们！Second Me是你将思维延伸到数字地平线的发射台。

## 核心功能

### **用AI原生记忆训练你的AI自我** ([论文](https://arxiv.org/abs/2503.08102))
今天就开始用你自己的记忆训练你的Second Me！使用分层记忆建模(HMM)和Me-对齐算法，你的AI自我捕获你的身份，理解你的背景，真实地反映你。

 <p align="center">
  <img src="https://github.com/user-attachments/assets/a84c6135-26dc-4413-82aa-f4a373c0ff89" width="94%" />
</p>


### **在Second Me网络上扩展你的智能**
从你的笔记本电脑启动你的AI自我到我们的去中心化网络——任何人或任何应用都可以在你的许可下连接，分享你的背景作为你的数字身份。

<p align="center">
  <img src="https://github.com/user-attachments/assets/9a74a3f4-d8fd-41c1-8f24-534ed94c842a" width="94%" />
</p>


### 用Second Me构建明日应用
**角色扮演**：你的AI自我切换人格，在不同场景中代表你。  
**AI空间**：与其他Second Me协作，激发想法或解决问题。

<p align="center">
  <img src="https://github.com/user-attachments/assets/bc6125c1-c84f-4ecc-b620-8932cc408094" width="94%" />
</p>

### 100% **隐私和控制**
与传统的中心化AI系统不同，Second Me确保你的信息和智能保持本地化和完全私密。



## 开始使用并与我们保持联系
给我们点星并加入我们，你将及时收到GitHub的所有发布通知！


 <p align="center">
  <img src="https://github.com/user-attachments/assets/5c14d956-f931-4c25-b0b3-3c2c96cd7581" width="94%" />
</p>


## 快速开始

### 📊 模型大小 vs. 内存（参考指南）

*注意：表格中的"B"代表"十亿参数模型"。显示的数据仅为示例；实际支持的模型大小可能因系统优化、部署环境和其他硬件/软件条件而有所不同。*

| 内存 (GB) | Docker部署 (Windows/Linux) | Docker部署 (Mac) | 集成设置 (Windows/Linux) | 集成设置 (Mac) |
|--------------|-----------------------------|-------------------|--------------------------|----------------|
| 8            | ~0.8B (示例)                | ~0.4B (示例)       | ~1.0B (示例)              | ~0.6B (示例)    |
| 16           | 1.5B (示例)                 | 0.5B (示例)        | ~2.0B (示例)              | ~0.8B (示例)    |
| 32           | ~2.8B (示例)                | ~1.2B (示例)       | ~3.5B (示例)              | ~1.5B (示例)    |

> **注意**：低于0.5B的模型可能无法为复杂任务提供令人满意的性能。我们正在持续改进跨平台支持 - 请[提交问题](https://github.com/mindverse/Second-Me/issues/new)以获得反馈或不同操作系统上的兼容性问题。

> **MLX加速**：Mac M系列用户可以使用[MLX](https://github.com/mindverse/Second-Me/tree/master/lpm_kernel/L2/mlx_training)运行更大的模型（仅限CLI）。

### ⚡ 只需3步即可运行你的Second Me：

```bash
# 1. 克隆仓库
git clone https://github.com/mindverse/Second-Me.git
cd Second-Me
# 2. 启动Docker容器
make docker-up
# 3. 访问Web界面
# 打开浏览器访问：http://localhost:3000
```

👉 详细说明——包括集成（非Docker）设置、模型选择、内存要求和平台特定提示，
查看完整的[GitBook部署指南](https://secondme.gitbook.io/secondme/guides/deployment)。

❓ 对设置、模型或任何故障排除有疑问？[查看我们的FAQ](https://secondme.gitbook.io/secondme/faq)。

## 教程和用例
🛠️ 随时关注[用户教程](https://secondme.gitbook.io/secondme/getting-started)来构建你的Second Me。

💡 查看下面的链接，了解Second Me如何在现实场景中使用：
- [Felix AMA（角色扮演应用）](https://app.secondme.io/example/ama)
- [15天欧洲城市行程头脑风暴（网络应用）](https://app.secondme.io/example/brainstorming)
- [速配破冰（网络应用）](https://app.secondme.io/example/Icebreaker)


## 下一步：2025年5月

Second Me继续发展为AI的开源身份基础设施。以下是5月的计划：

- 🗂️ **版本控制**：更智能的记忆和身份状态版本管理  
- 🧠 **持续训练管道**：让你的AI自我随时间演进，基于新的记忆输入持续更新。
- ⚙️ **性能和稳定性改进**：在推理能力、模型对齐和基础模型升级方面的增强
- ☁️ **云解决方案**：探索基于云的模型训练（微调）和模型部署解决方案，减少用户本地机器的硬件负担。

## 贡献

我们希望你能帮助塑造接下来的发展——无论是修复错误、构建新功能还是改进文档。

- 📘 查看我们的[贡献指南](./CONTRIBUTING.md)开始  
- 💻 在[GitHub](https://github.com/mindverse/Second-Me)上提交想法、问题或PR  
- 💬 在我们的[Discord](https://discord.gg/GpWHQNUwrg)中加入对话并保持更新——这是社区的聚集地


## 贡献者

我们要感谢所有为Second Me做出贡献的个人！如果你有兴趣为智能上传的未来做出贡献，无论是通过代码、文档还是想法，请随时向我们的仓库提交拉取请求：[Second-Me](https://github.com/Mindverse/Second-Me)。


<a href="https://github.com/mindverse/Second-Me/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=mindverse/Second-Me" />
</a>

使用[contrib.rocks](https://contrib.rocks)制作。

## 致谢

这项工作利用了开源社区的力量。

对于数据合成，我们使用了微软的[GraphRAG](https://github.com/microsoft/graphrag)。

对于模型部署，我们使用了[llama.cpp](https://github.com/ggml-org/llama.cpp)，它提供了高效的推理能力。

我们的基础模型主要来自[Qwen2.5](https://huggingface.co/Qwen)系列。

我们还要向所有体验过Second Me的用户表示诚挚的感谢。我们认识到整个管道还有很大的优化空间，我们完全致力于迭代改进，确保每个人都能在本地享受最佳体验。

## 许可证

Second Me是在Apache License 2.0下许可的开源软件。更多详情请参见[LICENSE](LICENSE)文件。

[license]: ./LICENSE

## Star历史

<a href="https://www.star-history.com/#mindverse/Second-Me&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=mindverse/Second-Me&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=mindverse/Second-Me&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=mindverse/Second-Me&type=Date" />
 </picture>
</a>
