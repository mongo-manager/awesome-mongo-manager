# Awesome Mongo Manager [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

<img src="https://raw.githubusercontent.com/mongo-manager/mongo-manager/main/site/assets/icon.svg" align="right" width="96" alt="Mongo Manager">

> セルフホストでブラウザーから使う MongoDB 管理ツール、[Mongo Manager](https://github.com/mongo-manager/mongo-manager) のためのプラグインとリソース。

プラグインは Mongo Manager にビュー、アクション、ページを追加します。たとえば、コレクション内の場所を示すマップ、グラフ、重複の検出などです。プラグインは静的ファイルのフォルダーで、アプリはそれをサンドボックス化されたフレームに表示します。サーバー側のコードはなく、自分からネットワークにアクセスすることもできません（管理者が設定したアドレス、たとえばマップのタイル サーバーだけは例外です）。管理者がそのファイルと要求する権限をそのまま承認した後にだけ動作します。

**ここに掲載されていることは、審査や推奨を意味しません。** アプリは管理者が承認する前にすべてのプラグインをスキャンしますが、スキャンが見つけるのは既知のパターンであり、意図ではありません。承認する前に、プラグイン自体と、プラグイン ページでのスキャン結果を確認してください。

[English](README.md) · [Türkçe](README.tr.md) · [简体中文](README.zh.md) · 日本語 · [Español](README.es.md) · [Português](README.pt.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Русский](README.ru.md)

## 目次

<!-- toc:start -->
- [公式プラグイン](#公式プラグイン)
  - [クエリと検索](#クエリと検索)
  - [グラフとマップ](#グラフとマップ)
  - [ドキュメントと値](#ドキュメントと値)
  - [スキーマとデータ品質](#スキーマとデータ品質)
  - [プライバシーとテストデータ](#プライバシーとテストデータ)
  - [運用とパフォーマンス](#運用とパフォーマンス)
- [コミュニティ プラグイン](#コミュニティ-プラグイン)
- [プラグインのインストール](#プラグインのインストール)
- [プラグインの作成](#プラグインの作成)
<!-- toc:end -->

## 公式プラグイン

Mongo Manager に同梱されています。すでにサーバー上にあり、管理者がプラグイン ページでそれぞれを有効にします。

<!-- official:start -->

### クエリと検索

- [日付フィルター](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/date-presets) - ドキュメントのクエリで、今日・昨日・過去 7 日間・今月・過去 n 時間または n 日・2 つの日付の間といった日付範囲を、日付フィールドに、または作成時刻を使って _id に設定します。
- [値の検索](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/value-search) - コレクション内のドキュメントのすべてのフィールドからテキスト、数値、ObjectId を探し、見つかった場所を表示します。
- [SQL から MongoDB へ](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/sql-to-mongodb) - SELECT 文を MongoDB クエリとドライバーコードに変換し、開いているコレクションで読み取り専用で実行します（JOIN は、指定された同じデータベースのコレクションも読み取ります）。結果はドキュメントまたは集計に取り込めます。
- [検索プレイグラウンド](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/search-playground) - コレクションの検索インデックスを試します。1 つまたはすべてのフィールドでの誤字を許容しハイライト付きの全文検索、貼り付けたベクトルやコレクションのドキュメントによるベクトル検索。結果はスコア付きで、パイプラインは集計に渡されます。
- [リシェイプ](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/reshape) - コレクションのフィールドの名前変更、フラット化、ネスト、変換、削除を、サンプルドキュメントでプレビューできるステップとして組み立て、パイプラインとして集計に渡します。集計で $out を追加すると新しいコレクションに書き込めます。コレクション自体は変更されません。

### グラフとマップ

- [グラフ](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/charts) - コレクションの値をグラフにします。棒、時系列の折れ線、ドーナツ、ヒストグラム、散布図に対応し、集計表も付きます。対象は現在のクエリの範囲内です。
- [マップ](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/geojson-map) - コレクションのドキュメントの GeoJSON フィールドと \[lng, lat\] のペアをマップに描画し、マップ上で描いた領域でフィルターします。

### ドキュメントと値

- [ドキュメント比較](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/document-diff) - ドキュメントを同じコレクションの別のドキュメントとフィールドごとに比較します。追加・削除・変更された内容を、ネストされた値や配列も含めて確認できます。
- [参照](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/references) - 他のドキュメントの ObjectId を保持するフィールドと、それらが参照するコレクションを検索します。各 ID の横に参照先ドキュメントの名前を表示し、見つからないものもそのように示します。あるドキュメントを参照しているドキュメントも一覧表示します。
- [時刻のヒント](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/time-hints) - ObjectId にポインターを合わせると作成された日時を、Unix 時間に見える数値に合わせるとその日付を表示します。
- [ローカル時刻](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/local-time) - 各日付をローカル時刻（または設定したタイムゾーン）で、UTC からのオフセットとともにツールチップまたは値の横に表示します。経過時間を加えることもできます。
- [バイナリプレビュー](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/binary-preview) - バイナリ値にポインターを合わせると、その中身（画像の種類とサイズ、PDF、アーカイブなど）を表示します。また、コレクションのドキュメントや 1 件のドキュメントに保存された画像を、そのバイト列から描画して表示します。
- [旧形式 UUID](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/legacy-uuid) - 古いドライバーが保存した旧形式の UUID（バイナリのサブタイプ 3）を Java、C#、Python のバイト順で読み取り、フィールドがどの順序で書き込まれたかを判定し、どの形式で保存された UUID も検索します。
- [ドキュメントサイズ](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/document-size) - コレクション内のドキュメントの大きさ（分布、最大のもの、16 MB 上限への近さ）と、バイトの内訳を、フィールドごと、さらにオブジェクトフィールドの内側まで、名前も含めて、サーバー上で測定します。

### スキーマとデータ品質

- [スキーマの健全性](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/schema-health) - コレクションのサンプル、ドキュメントのサイズ、インデックスを調べ、MongoDB のドキュメントに挙げられているスキーマのアンチパターンを見つけます。大きなドキュメントや配列、深いネスト、型の混在、未使用や冗長なインデックスなどです。
- [検証チェック](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/validation-inspector) - コレクションのドキュメントを検証ルールに照らして 1 件ずつ（ランダムサンプルまたはすべてを対象に）チェックし、ルールごとの違反件数を表示します。該当ドキュメントはワンクリックでドキュメントに表示できます。
- [重複ドキュメント検索](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/duplicate-finder) - 一意であるべきフィールドで値を共有しているドキュメントを見つけて数え、共有数の多い順に表示します。
- [データ辞書](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/data-dictionary) - データベースをドキュメント化します。各コレクションのフィールドの型と出現率、検証ルールの内容、コレクション間の参照、インデックスとルールをタブに表示し、Markdown または HTML として保存できます。

### プライバシーとテストデータ

- [個人データ検索](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/personal-data) - コレクション内で個人データを含むフィールド（メールアドレス、電話番号、カード番号、IBAN、身分証明書番号、氏名、住所、パスワード）をランダムなサンプルから見つけます。例はマスクして表示し、選択したフィールドを個人データのルールとして提案します。
- [匿名化](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/anonymiser) - テストや共有のために、コレクションの匿名化コピーを作成します。形式を保ったダミー値、一貫したハッシュ、シャッフルした値、シフトした日付、数値ノイズに対応し、NDJSON または JSON で保存するか、新しいコレクションにインポートできます。
- [テストデータ](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/mock-data) - コレクションのドキュメントに似せたリアルなテストドキュメントを作成します。氏名、メールアドレス、住所、価格、日付など 100 以上のテンプレートから 10 の言語で生成し、インポートウィザードに渡します。確認してからインポートを開始できます。

### 運用とパフォーマンス

- [インデックススクリプト](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/index-script) - コレクションまたはデータベース全体のインデックスを、再作成するコマンドとして出力します。mongosh、Node.js や Python のドライバー、または JSON に対応し、別の環境や移行のためにコピーまたは保存できます。
- [ストレージレポート](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/storage-report) - データベースの各コレクションがディスク上で使用している容量、WiredTiger がファイルとインデックスのファイル内に保持している空き領域とその割合を表示します。1 つのコレクションについては、コンパクトで解放できる容量を見積もり、アプリの確認とコレクション名の入力のあとでコンパクトを実行します。
- [有効期限 (TTL)](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/ttl-view) - コレクションの TTL インデックスがドキュメントを削除するタイミング（期限切れ、1 時間以内、1 日以内、1 週間以内、それ以降）と、削除されないドキュメントを表示します。各グループはワンクリックで［ドキュメント］に表示できます。
- [シャードキーアナライザー](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/shard-key-analyzer) - MongoDB の analyzeShardKey の結果に基づいて、コレクションのシャードキー候補を比較します。一意な値の数、最頻値の割合、挿入のたびにキーが増加するかどうかを調べ、MongoDB のガイダンスに沿って評価します。
- [ログアナライザー](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/log-analyzer) - mongod または mongos のログファイルをブラウザー内で読み取り（ファイルは外部に送信されません）、クエリのシェイプ別にまとめた低速操作、エラーと警告、接続、タイムラインを表示します。

<!-- official:end -->

## コミュニティ プラグイン

ほかの人が作成し、それぞれ独自のリポジトリにあるプラグインは、[英語のリスト](README.md#community-plugins)に掲載されています。各エントリは、アプリ自身のコードを使って最新の Mongo Manager リリースに照らしてチェックされます。最新リリースにプラグイン アーカイブが 1 つだけ含まれ、アプリがそのマニフェストを受け入れ、アプリのスキャンで高リスクが見つからないことが条件です。

## プラグインのインストール

**プラグイン** ページで、管理者は **プラグインをアップロード** を選んでプラグインの GitHub リリースの `.tgz` ファイルを指定するか、**GitHub からインストール** を選んでリポジトリのアドレスを指定します（サーバーで `MM_PLUGINS_GITHUB=1` が設定されていない限り、こちらは無効です）。

サーバー上で、プラグインの id と同じ名前のフォルダーをデータ ディレクトリの `plugins` フォルダーに置き、**再スキャン** を選ぶこともできます。

どの方法でも、プラグインは無効の状態で追加され、スキャンされ、管理者の承認を待ちます。ファイルが変更されるたびに、改めて承認が必要です。

## プラグインの作成

プラグイン ページの **独自のプラグインを作成** で **開発者ガイドを読む** を選ぶと、マニフェスト、ブリッジ、権限、サンドボックス、スキャン、パッケージ化、公開など、プラグインでできることがすべてわかります。

- [スターター](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/starter) - プレーンな JavaScript で書かれ、ビルド手順も依存関係もない、そのまま動作するプラグインです。AI コーディング アシスタント向けの指示も含まれます。プラグイン ページの **スターターをダウンロード (.zip)** からも入手できます。
- [公式プラグインのソース](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins) - 上記のすべてのプラグインと、そのテスト。

## コントリビュート

コントリビュートを歓迎します。まず[コントリビューション ガイドライン](CONTRIBUTING.md)（英語）をお読みください。プラグインを追加するには、README.md に 1 行を追加するプル リクエストを作成してください。
