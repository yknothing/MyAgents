# 聊天完成API

## API概述

此API用于创建聊天完成，处理提供的消息并生成响应。该API支持流式响应并与OpenAI格式兼容。

## 前提条件

在使用此API之前，你需要：

1. **注册**：执行注册操作以创建你的实例
2. **状态检查**：等待直到你的实例状态变为"online"
3. **获取实例ID**：从注册响应中获取你的唯一`{instance_id}`
4. **API访问**：使用实例ID构建API端点：`https://app.secondme.io/api/chat/{instance_id}`

## API端点

```
POST /api/chat/{instance_id}
POST /api/chat/{instance_id}/chat/completions
```

## 路径参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `instance_id` | string | 是 | 模型实例的唯一标识符，在注册期间获得 |

## 请求体

| 字段 | 类型 | 必需 | 默认值 | 描述 |
|------|------|------|------|------|
| `messages` | array | 是 | - | 对话中的消息列表 |
| `metadata` | object | 否 | null | 请求的附加元数据 |
| `temperature` | float | 否 | 0.7 | 控制响应的随机性，值在0和1之间 |
| `max_tokens` | integer | 否 | 2000 | 生成的最大令牌数 |
| `stream` | boolean | 否 | true | 是否流式传输响应 |

### messages字段

每条消息应包含以下字段：

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `role` | string | 是 | 消息发送者的角色。可以是'system'、'user'或'assistant' |
| `content` | string | 是 | 消息的内容 |

### metadata字段

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `enable_l0_retrieval` | boolean | 否 | 是否启用L0级别检索 |
| `role_id` | string | 否 | 用于此聊天的角色ID |

## 响应

- OpenAI兼容格式的服务器发送事件（SSE）流
- 每个事件包含生成响应的一个片段
- 最后一个事件标记为`[DONE]`

### 响应格式示例

```
data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1694268190,"model":"lpm-registry-model","system_fingerprint":null,"choices":[{"index":0,"delta":{"content":"你好"},"finish_reason":null}]}

data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1694268190,"model":"lpm-registry-model","system_fingerprint":null,"choices":[{"index":0,"delta":{"content":"世界！"},"finish_reason":null}]}

data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1694268190,"model":"lpm-registry-model","system_fingerprint":null,"choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}

data: [DONE]
```

## 请求示例

### cURL

```bash
curl -X POST "https://app.secondme.io/api/chat/{instance_id}" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "system", "content": "你是一个有用的助手。"},
      {"role": "user", "content": "你好，请介绍一下你自己。"}
    ],
    "metadata": {
      "enable_l0_retrieval": false,
      "role_id": "default_role"
    },
    "temperature": 0.7,
    "max_tokens": 2000,
    "stream": true
  }'
```

### Python

```python
import http.client
import json

url = "app.secondme.io"
path = "/api/chat/{instance_id}"           

headers = {"Content-Type": "application/json"}
data = {
    "messages": [
        {"role": "system", "content": "你是一个有用的助手。"},
        {"role": "user", "content": "你好，请介绍一下你自己。"}
    ],
    "metadata": {
        "enable_l0_retrieval": False,
        "role_id": "default_role"
    },
    "temperature": 0.7,
    "max_tokens": 2000,
    "stream": True
}

# 准备连接
conn = http.client.HTTPSConnection(url)

# 发送POST请求
conn.request("POST", path, body=json.dumps(data), headers=headers)

# 获取响应
response = conn.getresponse()

# 逐行读取响应体
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

# 完成后关闭连接
conn.close()
```

## 错误代码

| 状态码 | 描述 |
|------|------|
| 404 | 实例未找到 |
| 422 | 无效的请求参数 |
| 503 | 实例未连接或不可用 |

## 注意事项

1. 在使用此API之前，确保实例已注册并连接到服务器（状态："online"）
2. 实例ID是唯一的，所有API调用都需要它
3. 对于流式响应，客户端应能够处理SSE格式的数据
4. 消息列表中的角色应遵循对话顺序，通常以'system'或'user'开始
