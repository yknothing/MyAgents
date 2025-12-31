# 聊天API文档

## 概述

此API提供与OpenAI V1聊天完成API兼容的聊天功能，支持流式响应以实现与AI助手的交互式对话。

## API详情

- **URL**：`/api/kernel2/chat`
- **方法**：POST
- **描述**：聊天接口 - 流式响应（与OpenAI V1 API兼容）
- **访问**：通过本地端点`localhost:8002`可用

## 请求参数

请求体与OpenAI聊天完成API兼容，使用JSON格式：

```json
{
  "messages": [
    {"role": "system", "content": "你是一个有用的助手。"},
    {"role": "user", "content": "你好，你是谁？"},
    {"role": "assistant", "content": "我是一个有用的助手。"},
    {"role": "user", "content": "你能为我做什么？"}  
  ],
  "metadata": {
    "enable_l0_retrieval": true,
    "role_id": "uuid-string"
  },
  "stream": true,
  "model": "gpt-3.5-turbo",
  "temperature": 0.1,
  "max_tokens": 2000
}
```

### 参数描述

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| messages | Array | 是 | 包含对话历史的标准OpenAI消息列表 |
| metadata | Object | 否 | 请求处理的附加参数 |
| metadata.enable_l0_retrieval | Boolean | 否 | 是否启用基础知识检索 |
| metadata.role_id | String | 否 | 系统自定义角色UUID |
| stream | Boolean | 否 | 是否返回流式响应（默认：true） |
| model | String | 否 | 模型标识符（默认：配置的模型） |
| temperature | Float | 否 | 控制随机性（默认：0.1） |
| max_tokens | Integer | 否 | 生成的最大令牌数（默认：2000） |

## 响应格式

响应格式与OpenAI聊天完成API兼容，使用服务器发送事件（SSE）格式进行流式响应：

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion.chunk",
  "created": 1677652288,
  "model": "gpt-3.5-turbo",
  "system_fingerprint": "fp_44709d6fcb",
  "choices": [
    {
      "index": 0,
      "delta": {"content": "你好"},
      "finish_reason": null
    }
  ]
}
```

### 流式响应中每个块的格式

| 字段 | 类型 | 描述 |
|------|------|------|
| id | String | 响应的唯一标识符 |
| object | String | 固定为"chat.completion.chunk" |
| created | Integer | 时间戳 |
| model | String | 模型标识符 |
| system_fingerprint | String | 系统指纹 |
| choices | Array | 生成结果列表 |
| choices[0].index | Integer | 结果索引，通常为0 |
| choices[0].delta | Object | 当前块的增量内容 |
| choices[0].delta.content | String | 增量文本内容 |
| choices[0].finish_reason | String | 完成原因，null或"stop" |

## 使用示例

### cURL请求示例

```bash
curl -X POST \
  'http://localhost:8002/api/kernel2/chat' \
  -H 'Content-Type: application/json' \
  -H 'Accept: text/event-stream' \
  -d '{
    "messages": [
      {"role": "system", "content": "你是一个有用的助手。"},
      {"role": "user", "content": "告诉我关于人工智能的信息。"}
    ],
    "stream": true
  }'
```

### Python请求示例

```python
import json
import http.client

url = "localhost:8002"
path = "/api/kernel2/chat"
headers = {
    "Content-Type": "application/json",
    "Accept": "text/event-stream"
}
data = {
    "messages": [
        {"role": "system", "content": "你是一个有用的助手。"},
        {"role": "user", "content": "告诉我关于人工智能的信息。"}
    ],
    "stream": True
}

conn = http.client.HTTPConnection(url)

conn.request("POST", path, body=json.dumps(data), headers=headers)

response = conn.getresponse()

for line in response:
    if line:
        decoded_line = line.decode('utf-8').strip()
        if decoded_line == 'data: [DONE]':
            break
        if decoded_line.startswith('data: '):
            try:
                json_str = decoded_line[6:]
                chunk = json.loads(json_str)
                content = chunk['choices'][0]['delta'].get('content', '')
                if content:
                    print(content, end='', flush=True)
            except json.JSONDecodeError:
                pass

conn.close()
```

## 错误处理

当发生错误时，API将返回标准HTTP错误状态码和JSON格式的错误详情：

```json
{
  "success": false,
  "message": "错误消息",
  "code": 400
}
```

| 错误代码 | 描述 |
|------|------|
| 400 | 错误请求 |
| 401 | 未授权 |
| 404 | 未找到 |
| 500 | 内部服务器错误 |
