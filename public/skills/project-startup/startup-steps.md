# 启动详细步骤

## 第一步：前置环境

### JDK 8
- 必须是 JDK 8（1.8.x），不支持更高版本
- macOS：`brew install --cask zulu8`
- 路径：`/usr/libexec/java_home -v 1.8` 查找
- 系统默认 Java 可能不是 JDK 8，每次执行前显式设置：
```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 1.8)
export PATH=$JAVA_HOME/bin:$PATH
```
- `controlBashProcess` 启动长驻服务时用内联方式：
```bash
JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home PATH=/Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home/bin:$PATH java -jar ...
```

### Maven 3.x
- macOS：`brew install maven`

### Redis
- `brew install redis && brew services start redis`
- 密码从 `.kiro/user-config.md` 获取
- 验证：`redis-cli -a {密码} ping`

## 第二步：Maven 配置

项目根目录 `dsfa.xml` 复制到 `~/.m2/settings.xml` 并修改：

### localRepository
改为本机实际路径。先读取 `~/.m2/settings.xml` 中的 `<localRepository>` 确认。

### 禁用 HTTP 仓库拦截（Maven 3.8+）
```xml
<mirror>
  <id>maven-default-http-blocker</id>
  <mirrorOf>dummy</mirrorOf>
  <name>Disable default HTTP blocker</name>
  <url>https://maven.aliyun.com/nexus/content/groups/public</url>
</mirror>
```

### 阿里云镜像排除公司仓库
```xml
<mirror>
  <id>mirror</id>
  <mirrorOf>central,jcenter,!repo-dvzyv,!dream-nexus-public,!dream-product-release,!dream-product-snapshots,!dream-nexus-release,!maven-3rd_part</mirrorOf>
  <url>https://maven.aliyun.com/nexus/content/groups/public</url>
</mirror>
```

### Snapshot 仓库关闭 releases
```xml
<repository>
  <id>dream-product-snapshots</id>
  <url>http://192.168.0.25:10701/repository/dream-product-snapshot/</url>
  <releases><enabled>false</enabled></releases>
  <snapshots><enabled>true</enabled></snapshots>
</repository>
```

## 第三步：Nacos 启动与配置

**必须先启动 Nacos，再修改配置，再构建后端。**

### 启动 Nacos
```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 1.8)
sh 中小企业代码/nacos/nacos-dev/bin/startup.sh -m standalone
```

控制台：`http://127.0.0.1:8848/nacos`（nacos/nacos）
命名空间：`policy`，分组：`product`

### 配置修改

| 配置文件 | 修改项 | 改为 |
|----------|--------|------|
| platform.yaml | `dubbo.protocol.host` | `127.0.0.1` |
| platform.yaml | `dsfa.meta.file.path` | `/tmp/dsfa/core-base/` |
| gateway.yaml | `dsfa.meta.file.path` | `/tmp/dsfa/core-base/` |
| kms.yaml | `dsfa.meta.file.path` | `/tmp/dsfa/kms-dist/` |
| policy.yaml | `dsfa.meta.file.path` | `/tmp/dsfa/policy-dist/` |

### 通过 Nacos API 修改
```bash
TOKEN=$(curl -s 'http://127.0.0.1:8848/nacos/v1/auth/login' -X POST \
  -d 'username=nacos&password=nacos' | python3 -c "import sys,json; print(json.load(sys.stdin)['accessToken'])")

NS_ID=$(curl -s "http://127.0.0.1:8848/nacos/v1/console/namespaces?accessToken=$TOKEN" \
  | python3 -c "import sys,json; ns=json.load(sys.stdin)['data']; print([n['namespace'] for n in ns if n['namespaceShowName']=='policy'][0])")

CONTENT=$(curl -s "http://127.0.0.1:8848/nacos/v1/cs/configs?dataId=platform.yaml&group=product&tenant=$NS_ID&accessToken=$TOKEN")
NEW_CONTENT=$(echo "$CONTENT" | sed 's|原路径|新路径|g')
curl -s -X POST "http://127.0.0.1:8848/nacos/v1/cs/configs" \
  --data-urlencode "dataId=platform.yaml" --data-urlencode "group=product" \
  --data-urlencode "tenant=$NS_ID" --data-urlencode "content=$NEW_CONTENT" \
  --data-urlencode "type=yaml" --data-urlencode "accessToken=$TOKEN"
```

## 第四步：前端静态文件
```bash
mkdir -p /tmp/dsfa/core-base /tmp/dsfa/kms-dist /tmp/dsfa/policy-dist
cp -r 中小企业代码/中小企业-前端/core-base/* /tmp/dsfa/core-base/
cp -r 中小企业代码/中小企业-前端/dsf-product-kms-dist/* /tmp/dsfa/kms-dist/
cp -r 中小企业代码/中小企业-前端/dsfa-product-policy-dist/* /tmp/dsfa/policy-dist/
```

## 第五步：构建

### 检查 infra 依赖
```bash
LOCAL_REPO=$(grep -oP '(?<=<localRepository>).*(?=</localRepository>)' ~/.m2/settings.xml)
ls "$LOCAL_REPO/com/dsfa/product/dsfa-infra-common-provider/"
```
- 已存在 → 跳过 infra 构建
- 不存在且有源码 → `mvn clean install -DskipTests -f dsfa-infra-starter/pom.xml`
- 不存在且无源码 → 找同事拿

### 构建业务服务
```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 1.8)
mvn clean package -DskipTests -f 中小企业代码/后端代码/dsfa-gateway/pom.xml
mvn clean package -DskipTests -f 中小企业代码/后端代码/dsfa-platform-starter/pom.xml
mvn clean package -DskipTests -f 中小企业代码/后端代码/dsfa-kms-starter/pom.xml
mvn clean package -DskipTests -f 中小企业代码/后端代码/dsfa-policy-starter/pom.xml
```

## 第六步：启动服务

用 `controlBashProcess` 启动，内联传环境变量：

```bash
# Platform（其他服务依赖它）— 约 50 秒
JAVA_HOME=... java -jar dsfa-platform-starter/target/dsfa-platform-starter.jar --spring.profiles.active=dev

# 等待就绪后启动 Gateway — 约 10 秒
JAVA_HOME=... java -jar dsfa-gateway/target/dsfa-gateway-starter.jar --spring.profiles.active=dev

# KMS + Policy 可并行 — 各约 45 秒
JAVA_HOME=... java -jar dsfa-kms-starter/dsfa-kms-bootstrap/target/dsfa-kms-starter.jar --spring.profiles.active=dev
JAVA_HOME=... java -jar dsfa-policy-starter/dsfa-policy-bootstrap/target/dsfa-policy-starter.jar --spring.profiles.active=dev
```

### 等待就绪
```bash
for i in $(seq 1 60); do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:{端口}/ 2>/dev/null)
  if [ "$STATUS" != "000" ]; then echo "Service is up"; break; fi
  sleep 2
done
```

## 第七步：验证

```bash
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8848/nacos/
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:20001/
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:20002/
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:19012/
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:19021/
```

前端：`http://127.0.0.1:20002/platform/index.html`

## 可忽略的警告

- XXL-Job 注册失败 — 本地没有 XXL-Job Server
- Dubbo provider 为空 — 部分平台服务未本地部署
- Gateway 根路径 500 — 根路径无路由是正常的
- RocketMQ 连接失败 — MQ 服务器不可达时消费者会重试

## AI 执行踩坑记录

### 2026-03-05
1. infra 源码不在工作区，但 jar 已在本地仓库 → 先检查仓库再决定是否构建
2. 系统默认 Java 不是 JDK 8 → 每条命令前显式设置 JAVA_HOME
3. Platform BindException → dubbo.protocol.host 没改成 127.0.0.1
4. Maven 本地仓库路径非默认 → 先读 settings.xml 确认
5. KMS 编译失败 WritingSupport → infra API 版本不匹配，跳过
