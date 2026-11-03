# Awesome Mongo Manager [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

<img src="https://raw.githubusercontent.com/mongo-manager/mongo-manager/main/site/assets/icon.svg" align="right" width="96" alt="Mongo Manager">

> 适用于 [Mongo Manager](https://github.com/mongo-manager/mongo-manager) 的插件和资源。Mongo Manager 是一款自托管、在浏览器中运行的 MongoDB 管理工具。

插件为 Mongo Manager 添加视图、操作或页面：例如集合中地点的地图、图表、重复项查找器。插件是一个由静态文件组成的文件夹，应用将它显示在沙盒框架中；它没有服务器端代码，自身也无法访问网络（只能访问管理员设置的地址，例如地图的瓦片服务器），只有在管理员批准了它的确切文件及其请求的权限之后才会运行。

**列在此处并不代表经过审查或认可。** 应用会在管理员批准之前扫描每个插件，但扫描只能发现已知模式，无法判断意图。批准之前，请先阅读插件本身以及它在插件页面上的扫描结果。

[English](README.md) · [Türkçe](README.tr.md) · 简体中文 · [日本語](README.ja.md) · [Español](README.es.md) · [Português](README.pt.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Русский](README.ru.md)

## 目录

<!-- toc:start -->
- [官方插件](#官方插件)
  - [查询与搜索](#查询与搜索)
  - [图表与地图](#图表与地图)
  - [文档与值](#文档与值)
  - [模式与数据质量](#模式与数据质量)
  - [隐私与测试数据](#隐私与测试数据)
  - [运维与性能](#运维与性能)
- [社区插件](#社区插件)
- [安装插件](#安装插件)
- [构建插件](#构建插件)
<!-- toc:end -->

## 官方插件

随 Mongo Manager 一起提供：它们已经在你的服务器上，由管理员在插件页面上逐个启用。

<!-- official:start -->

### 查询与搜索

- [日期筛选](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/date-presets) - 在“文档”查询中，为日期字段设置常用的日期范围，如今天、昨天、最近 7 天、本月、最近 n 小时或 n 天、两天之间；也可对 _id 按文档的创建时间筛选。
- [值搜索](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/value-search) - 在集合文档的每个字段中查找文本、数字或 ObjectId，并显示它出现的位置。
- [SQL 转 MongoDB](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/sql-to-mongodb) - 将 SELECT 语句转换为 MongoDB 查询和驱动代码，在打开的集合中以只读方式运行（JOIN 还会读取其指定的、同一数据库中的集合），并可放入其文档或聚合中。
- [搜索实验台](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/search-playground) - 试用集合的搜索索引：在某个字段或所有字段上进行允许拼写错误并带高亮的全文搜索，或使用粘贴的向量或集合中的某个文档进行向量搜索；结果附带得分，管道可发送到聚合。
- [重塑](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/reshape) - 将集合的字段重命名、展平、嵌套、转换或删除，步骤可在示例文档上预览，再以管道形式交给聚合；在聚合中添加 $out 即可写入新集合。集合本身不会被更改。

### 图表与地图

- [图表](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/charts) - 将集合的值绘制成图表——柱状图、时间趋势线、环形图、直方图、散点图——并附汇总表,范围限于当前查询。
- [地图](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/geojson-map) - 在地图上绘制集合中文档的 GeoJSON 字段和 \[lng, lat\] 坐标对，并可按在地图上绘制的区域筛选。

### 文档与值

- [文档比较](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/document-diff) - 将一个文档与同一集合中的另一个文档逐字段比较：新增、删除或更改了什么，包括嵌套值和数组。
- [引用](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/references) - 查找保存其他文档 ObjectId 的字段及其所引用的集合；在每个 ID 旁显示被引用文档的名称，找不到的也会如实标出；列出引用某个文档的文档。
- [时间提示](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/time-hints) - 将鼠标指向 ObjectId 时显示其创建时间，指向可视为 Unix 时间的数字时显示对应日期。
- [本地时间](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/local-time) - 以本地时间（或您设置的时区）显示每个日期，并附带相对 UTC 的偏移，显示在提示框或值旁边；还可选择显示距今多久。
- [二进制数据预览](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/binary-preview) - 将指针悬停在二进制值上时，会说明它是什么——图片的类型和尺寸、PDF、压缩包——并显示集合文档或单个文档中存储的图片，直接由其字节绘制。
- [旧版 UUID](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/legacy-uuid) - 按 Java、C# 和 Python 的字节顺序读取旧版驱动程序存储的旧版 UUID（二进制子类型 3），判断字段是按哪种顺序写入的，并可查找以任意方式存储的 UUID。
- [文档大小](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/document-size) - 集合中的文档有多大——分布、最大的文档、距 16 MB 上限有多近——以及字节都用在了哪里：逐个字段、并深入对象字段，包括字段名，均在服务器上测量。

### 模式与数据质量

- [模式健康度](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/schema-health) - 检查集合的采样、文档大小和索引，查找 MongoDB 文档所述的模式反模式：大文档和大数组、嵌套过深、混合类型、未使用和冗余的索引。
- [验证检查](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/validation-inspector) - 按验证规则逐条检查集合中的文档（可对随机采样或全部文档进行检查），并统计每条规则有多少文档违反，只需一次点击即可在文档中查看这些文档。
- [重复记录查找器](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/duplicate-finder) - 查找在本应唯一的字段中共有相同值的文档并统计数量，共有最多的排在前面。
- [数据字典](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/data-dictionary) - 为数据库生成文档：每个集合的字段及其类型和出现率、验证规则对字段的约束、集合之间的引用、索引和规则——在标签页中显示，可保存为 Markdown 或 HTML。

### 隐私与测试数据

- [个人数据查找器](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/personal-data) - 在随机样本中找出集合里包含个人数据的字段——电子邮件地址、电话和银行卡号、IBAN、身份证号、姓名、地址、密码——只显示掩码后的示例，并可将所选字段建议为个人数据规则。
- [数据匿名化](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/anonymiser) - 为测试或共享生成集合的匿名副本：保持原有格式的逼真虚构值、一致性哈希、打乱的值、平移的日期、数字噪声；可保存为 NDJSON 或 JSON，也可导入到新集合。
- [测试数据](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/mock-data) - 根据集合的文档结构生成逼真的测试文档——姓名、电子邮件、地址、价格、日期等，来自 100 多个模板，支持十种语言——并交给导入向导，由你检查后开始导入。

### 运维与性能

- [索引脚本](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/index-script) - 将集合或整个数据库的索引写成可重新创建它们的命令——适用于 mongosh、Node.js 或 Python 驱动，或输出为 JSON——可复制或保存，用于其他环境或迁移。
- [存储报告](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/storage-report) - 显示数据库中每个集合占用的磁盘空间、WiredTiger 在其文件及索引文件中保留的空闲空间及其占比；对单个集合可估算压缩能释放的空间，并在应用确认、您输入集合名称后执行压缩。
- [到期 (TTL)](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/ttl-view) - 显示集合的 TTL 索引何时删除其文档——已到期、1 小时内、1 天内、1 周内、更晚——以及哪些文档永不删除，每组一键即可在“文档”中查看。
- [分片键分析器](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/shard-key-analyzer) - 依据 MongoDB 的 analyzeShardKey 给出的结果比较集合的候选分片键——不同值的数量、最常见值的占比、键是否随每次插入而增长——并按 MongoDB 的指南逐一评判。
- [日志分析器](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/log-analyzer) - 在浏览器中读取 mongod 或 mongos 日志文件（文件不会离开浏览器），并显示按查询形状分组的慢操作、错误和警告、连接以及时间线。

<!-- official:end -->

## 社区插件

由他人制作、各自位于独立仓库中的插件列在[英文列表](README.md#community-plugins)中。每个条目都会用应用自己的代码、按最新的 Mongo Manager 版本进行检查：其最新发布版本只包含一个插件归档，应用接受其清单，并且应用的扫描未在其中发现高风险。

## 安装插件

在**插件**页面上，管理员可以选择**上传插件**并提供插件 GitHub 发布版本中的 `.tgz` 文件，或选择**从 GitHub 安装**并提供仓库地址（除非服务器设置了 `MM_PLUGINS_GITHUB=1`，否则此方式处于关闭状态）。

也可以直接在服务器上，将以插件 id 命名的插件文件夹放入数据目录的 `plugins` 文件夹中，然后选择**重新扫描**。

无论采用哪种方式，插件到达时都处于关闭状态，会先被扫描，并等待管理员批准。其文件的任何更改都需要重新批准。

## 构建插件

在插件页面的**构建自己的插件**下，选择**阅读开发者指南**，即可了解插件能做的一切：清单、桥接、权限、沙盒、扫描、打包和发布。

- [入门模板](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/starter) - 一个用纯 JavaScript 编写、无需构建步骤和依赖的可运行插件，并附有给 AI 编程助手的说明。也可在插件页面上通过**下载入门模板（.zip）**获取。
- [官方插件源代码](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins) - 上面列出的每个插件及其测试。

## 参与贡献

欢迎参与贡献！请先阅读[贡献指南](CONTRIBUTING.md)（英文）。要添加插件，请提交一个在 README.md 中添加一行的拉取请求。
