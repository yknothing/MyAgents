# 使用Ollama的自定义模型端点指南

## 1. 前提条件：Ollama设置

首先，从官方网站下载并安装Ollama：

🔗 **下载链接**：[https://ollama.com/download](https://ollama.com/download)

📚 **其他资源**：
- 官方网站：[https://ollama.com](https://ollama.com/)
- 模型库：[https://ollama.com/library](https://ollama.com/library)
- GitHub仓库：[https://github.com/ollama/ollama/](https://github.com/ollama/ollama)

---

## 2. 基本Ollama命令

| 命令 | 描述 |
|------|------|
| `ollama pull model_name` | 下载模型 |
| `ollama serve` | 启动Ollama服务 |
| `ollama ps` | 列出运行中的模型 |
| `ollama list` | 列出所有已下载的模型 |
| `ollama rm model_name` | 删除模型 |
| `ollama show model_name` | 显示模型详情 |

## 3. 使用Ollama API进行自定义模型配置

### OpenAI兼容API

#### 聊天请求

```bash
curl http://127.0.0.1:11434/v1/chat/completions -H "Content-Type: application/json" -d '{
  "model": "qwen2.5:0.5b",
  "messages": [
    {"role": "user", "content": "为什么天空是蓝色的？"}
  ]
}'
```

#### 嵌入请求

```bash
curl http://127.0.0.1:11434/v1/embeddings -d '{
  "model": "snowflake-arctic-embed:110m",
  "input": "为什么天空是蓝色的？"
}'
```

更多详情：[https://github.com/ollama/ollama/blob/main/docs/openai.md](https://github.com/ollama/ollama/blob/main/docs/openai.md)

## 4. 在Second Me中配置自定义嵌入

1. 启动Ollama服务：`ollama serve`
2. 检查你的Ollama嵌入模型上下文长度：

```bash
# 示例：ollama show snowflake-arctic-embed:110m
$ ollama show snowflake-arctic-embed:110m

Model
  architecture        bert       
  parameters          108.89M    
  context length      512        
  embedding length    768        
  quantization        F16        

License
  Apache License               
  Version 2.0, January 2004
```

3. 修改`Second_Me/.env`中的`EMBEDDING_MAX_TEXT_LENGTH`以匹配你的嵌入模型的上下文窗口。这可以防止块长度溢出并避免服务器端错误（500内部服务器错误）。

```bash
# 嵌入配置

EMBEDDING_MAX_TEXT_LENGTH=embedding_model_context_length
```

4. 在设置中配置自定义嵌入

```
聊天：
模型名称：qwen2.5:0.5b
API密钥：ollama
API端点：http://127.0.0.1:11434/v1

嵌入：
模型名称：snowflake-arctic-embed:110m
API密钥：ollama
API端点：http://127.0.0.1:11434/v1
```

**在Docker环境中运行Second Me时**，请将API端点中的`127.0.0.1`替换为`host.docker.internal`：

```
聊天：
模型名称：qwen2.5:0.5b
API密钥：ollama
API端点：http://host.docker.internal:11434/v1

嵌入：
模型名称：snowflake-arctic-embed:110m
API密钥：ollama
API端点：http://host.docker.internal:11434/v1
```
