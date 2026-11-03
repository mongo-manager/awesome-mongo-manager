# Awesome Mongo Manager [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

<img src="https://raw.githubusercontent.com/mongo-manager/mongo-manager/main/site/assets/icon.svg" align="right" width="96" alt="Mongo Manager">

> 브라우저에서 실행되는 자체 호스팅 MongoDB 관리 도구 [Mongo Manager](https://github.com/mongo-manager/mongo-manager)를 위한 플러그인과 리소스입니다.

플러그인은 Mongo Manager에 보기, 작업 또는 페이지를 추가합니다. 예를 들어 컬렉션의 장소를 보여 주는 지도, 차트, 중복 항목 찾기 등이 있습니다. 플러그인은 정적 파일로 이루어진 폴더로, 앱은 이를 샌드박스 프레임 안에 표시합니다. 서버 코드가 없고 스스로 네트워크에 접근할 수도 없으며(관리자가 설정한 주소, 예를 들어 지도의 타일 서버만 예외입니다), 관리자가 해당 파일과 요청한 권한을 그대로 승인한 뒤에만 실행됩니다.

**이 목록에 있다고 해서 검토되었거나 보증된 것은 아닙니다.** 앱은 관리자가 승인하기 전에 모든 플러그인을 스캔하지만, 스캔은 의도가 아니라 알려진 패턴을 찾습니다. 승인하기 전에 플러그인과 플러그인 페이지의 스캔 결과를 읽어 보세요.

[English](README.md) · [Türkçe](README.tr.md) · [简体中文](README.zh.md) · [日本語](README.ja.md) · [Español](README.es.md) · [Português](README.pt.md) · 한국어 · [Deutsch](README.de.md) · [Français](README.fr.md) · [Русский](README.ru.md)

## 목차

<!-- toc:start -->
- [공식 플러그인](#공식-플러그인)
  - [쿼리와 검색](#쿼리와-검색)
  - [차트와 지도](#차트와-지도)
  - [문서와 값](#문서와-값)
  - [스키마와 데이터 품질](#스키마와-데이터-품질)
  - [개인정보와 테스트 데이터](#개인정보와-테스트-데이터)
  - [운영과 성능](#운영과-성능)
- [커뮤니티 플러그인](#커뮤니티-플러그인)
- [플러그인 설치](#플러그인-설치)
- [플러그인 만들기](#플러그인-만들기)
<!-- toc:end -->

## 공식 플러그인

Mongo Manager와 함께 제공됩니다. 이미 서버에 있으며, 관리자가 플러그인 페이지에서 하나씩 켭니다.

<!-- official:start -->

### 쿼리와 검색

- [날짜 필터](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/date-presets) - 도큐먼트 쿼리에서 사람들이 자주 쓰는 날짜 범위(오늘, 어제, 최근 7일, 이번 달, 최근 n시간 또는 n일, 두 날짜 사이)를 날짜 필드에, 또는 _id에 도큐먼트가 생성된 시점 기준으로 설정합니다.
- [값 검색](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/value-search) - 컬렉션 도큐먼트의 모든 필드에서 텍스트, 숫자 또는 ObjectId를 찾아 발견된 위치를 보여 줍니다.
- [SQL을 MongoDB로](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/sql-to-mongodb) - SELECT 문을 MongoDB 쿼리와 드라이버 코드로 변환하고, 열린 컬렉션에서 읽기 전용으로 실행하며(JOIN은 같은 데이터베이스에서 지정한 컬렉션도 읽습니다), 도큐먼트 또는 집계로 보냅니다.
- [검색 플레이그라운드](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/search-playground) - 컬렉션의 검색 인덱스를 시험합니다. 한 필드 또는 모든 필드에서 오타를 허용하고 강조 표시를 지원하는 전체 텍스트 검색, 또는 붙여넣은 벡터나 컬렉션의 도큐먼트로 하는 벡터 검색을 실행하며, 결과에는 점수가 표시되고 파이프라인은 집계로 보낼 수 있습니다.
- [재구성](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/reshape) - 컬렉션의 필드 이름을 바꾸거나 평탄화, 중첩, 변환, 삭제하는 작업을 샘플 도큐먼트에서 미리 볼 수 있는 단계로 구성하고, 파이프라인으로 집계에 넘깁니다. 새 컬렉션에 쓰려면 집계에서 $out을 추가하세요. 컬렉션 자체는 변경되지 않습니다.

### 차트와 지도

- [차트](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/charts) - 컬렉션의 값을 차트로 그립니다. 막대, 시간별 꺾은선, 도넛, 히스토그램, 산점도를 지원하며 요약 표가 함께 제공됩니다. 현재 쿼리 범위 내에서 동작합니다.
- [지도](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/geojson-map) - 컬렉션 도큐먼트의 GeoJSON 필드와 \[lng, lat\] 쌍을 지도에 그리고, 지도에 그린 영역으로 필터링합니다.

### 문서와 값

- [도큐먼트 비교](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/document-diff) - 도큐먼트를 같은 컬렉션의 다른 도큐먼트와 필드 단위로 비교합니다. 추가, 삭제, 변경된 내용을 중첩 값과 배열까지 포함해 보여 줍니다.
- [참조](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/references) - 다른 도큐먼트의 ObjectId를 가진 필드와 그 필드가 참조하는 컬렉션을 찾습니다. 각 id 옆에 참조된 도큐먼트의 이름을 표시하고, 없는 도큐먼트는 없는 것으로 표시하며, 특정 도큐먼트를 참조하는 도큐먼트를 나열합니다.
- [시간 힌트](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/time-hints) - ObjectId에 포인터를 올리면 생성된 시점을, Unix 시간으로 읽히는 숫자에 올리면 그 날짜를 보여 줍니다.
- [현지 시간](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/local-time) - 각 날짜를 현지 시간(또는 설정한 시간대)으로 UTC와의 오프셋과 함께 툴팁이나 값 옆에 표시하며, 원하면 얼마나 전인지도 보여 줍니다.
- [바이너리 미리보기](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/binary-preview) - 바이너리 값에 포인터를 올리면 그 안에 든 것(이미지의 종류와 크기, PDF, 압축 파일 등)을 알려 주고, 컬렉션의 도큐먼트나 단일 도큐먼트에 저장된 이미지를 자체 바이트에서 직접 그려 보여 줍니다.
- [레거시 UUID](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/legacy-uuid) - 구형 드라이버가 저장한 레거시 UUID(바이너리 서브타입 3)를 Java, C#, Python 바이트 순서로 읽고, 필드가 어떤 순서로 기록되었는지 알려 주며, 저장된 방식과 관계없이 UUID를 찾습니다.
- [도큐먼트 크기](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/document-size) - 컬렉션의 도큐먼트가 얼마나 큰지(분포, 가장 큰 도큐먼트, 16 MB 제한에 얼마나 가까운지)와 바이트가 어디에 쓰이는지를 필드별로, 객체 필드 안쪽까지, 이름을 포함해 서버에서 측정합니다.

### 스키마와 데이터 품질

- [스키마 상태](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/schema-health) - 컬렉션의 샘플, 도큐먼트 크기, 인덱스를 점검하여 MongoDB 문서에 정의된 스키마 안티패턴을 찾습니다: 큰 도큐먼트와 배열, 깊은 중첩, 혼합 유형, 사용되지 않거나 중복된 인덱스.
- [유효성 검사 점검](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/validation-inspector) - 컬렉션의 도큐먼트를 유효성 검사 규칙별로 하나씩(무작위 샘플 또는 전체 대상) 점검하여 규칙마다 위반하는 도큐먼트 수를 알려 주고, 해당 도큐먼트는 클릭 한 번으로 도큐먼트에서 볼 수 있습니다.
- [중복 도큐먼트 찾기](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/duplicate-finder) - 고유해야 하는 필드에서 같은 값을 공유하는 도큐먼트를 찾아 개수를 세고, 많은 순서로 보여 줍니다.
- [데이터 사전](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/data-dictionary) - 데이터베이스를 문서화합니다. 각 컬렉션의 필드와 유형·존재율, 유효성 검사 규칙이 필드에 대해 정의한 내용, 컬렉션 간 참조, 인덱스와 규칙을 탭에 표시하고 Markdown 또는 HTML로 저장합니다.

### 개인정보와 테스트 데이터

- [개인 데이터 탐지기](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/personal-data) - 컬렉션에서 개인 데이터가 들어 있는 필드(이메일 주소, 전화번호, 카드 번호, IBAN, 신분증 번호, 이름, 주소, 비밀번호)를 무작위 샘플에서 찾아 마스킹된 예시만 보여 주고, 선택한 필드를 개인 데이터 규칙으로 제안합니다.
- [익명화](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/anonymiser) - 테스트나 공유를 위해 컬렉션의 익명화된 복사본을 만듭니다. 형식을 유지하는 실제 같은 가짜 값, 일관된 해시, 셔플한 값, 이동한 날짜, 숫자 노이즈를 지원하며 NDJSON 또는 JSON으로 저장하거나 새 컬렉션으로 가져올 수 있습니다.
- [테스트 데이터](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/mock-data) - 컬렉션의 도큐먼트와 같은 형태의 현실적인 테스트 도큐먼트를 만들어 가져오기 마법사에 전달합니다. 이름, 이메일, 주소, 가격, 날짜 등 100개 이상의 템플릿을 10개 언어로 제공하며, 마법사에서 확인한 뒤 가져오기를 시작합니다.

### 운영과 성능

- [인덱스 스크립트](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/index-script) - 컬렉션 또는 데이터베이스 전체의 인덱스를 다시 만드는 명령으로 작성합니다. mongosh, Node.js 또는 Python 드라이버용이나 JSON으로 작성할 수 있으며, 다른 환경이나 마이그레이션을 위해 복사하거나 저장할 수 있습니다.
- [스토리지 보고서](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/storage-report) - 데이터베이스의 각 컬렉션이 디스크에서 차지하는 공간, WiredTiger가 컬렉션 파일과 인덱스 파일 안에 보유한 여유 공간과 그 비율을 보여줍니다. 컬렉션 하나에 대해서는 압축으로 반환할 수 있는 공간을 예상하고, 앱이 확인을 요청하고 컬렉션 이름을 입력하면 압축을 실행합니다.
- [만료 (TTL)](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/ttl-view) - 컬렉션의 TTL 인덱스가 도큐먼트를 삭제하는 시점(이미 만료됨, 1시간·1일·1주 이내, 그 이후)과 삭제하지 않는 도큐먼트를 보여 줍니다. 각 그룹은 클릭 한 번으로 도큐먼트에서 볼 수 있습니다.
- [샤드 키 분석기](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/shard-key-analyzer) - MongoDB analyzeShardKey의 결과를 기준으로 컬렉션의 후보 샤드 키를 비교합니다. 서로 다른 값의 수, 가장 흔한 값의 비중, 삽입할 때마다 키가 증가하는지 여부를 살펴보고, MongoDB 가이드라인에 따라 각각을 평가합니다.
- [로그 분석기](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/log-analyzer) - mongod 또는 mongos 로그 파일을 브라우저에서 읽고(파일은 브라우저 밖으로 나가지 않습니다) 쿼리 형태별로 묶은 느린 작업, 오류와 경고, 연결, 타임라인을 보여 줍니다.

<!-- official:end -->

## 커뮤니티 플러그인

다른 사람이 만들어 각자의 저장소에 둔 플러그인은 [영어 목록](README.md#community-plugins)에 있습니다. 각 항목은 앱 자체의 코드로 최신 Mongo Manager 릴리스를 기준으로 검사됩니다. 최신 릴리스에 플러그인 아카이브가 하나만 있고, 앱이 매니페스트를 받아들이며, 앱의 스캔에서 높은 위험이 발견되지 않아야 합니다.

## 플러그인 설치

**플러그인** 페이지에서 관리자는 **플러그인 업로드**를 선택해 플러그인 GitHub 릴리스의 `.tgz` 파일을 제공하거나, **GitHub에서 설치**를 선택해 저장소 주소를 제공합니다(서버에서 `MM_PLUGINS_GITHUB=1`을 설정하지 않으면 이 방법은 꺼져 있습니다).

서버에서 직접 플러그인 id와 같은 이름의 플러그인 폴더를 데이터 디렉터리의 `plugins` 폴더에 넣은 다음 **다시 스캔**을 선택할 수도 있습니다.

어떤 방법이든 플러그인은 꺼진 상태로 추가되고, 스캔된 뒤, 관리자의 승인을 기다립니다. 파일이 바뀌면 다시 승인해야 합니다.

## 플러그인 만들기

플러그인 페이지의 **나만의 플러그인 만들기**에서 **개발자 가이드 읽기**를 선택하면 매니페스트, 브리지, 권한, 샌드박스, 스캔, 패키징, 게시까지 플러그인이 할 수 있는 모든 것을 볼 수 있습니다.

- [스타터](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/starter) - 빌드 단계와 의존성 없이 일반 JavaScript로 작성된, 작동하는 플러그인이며 AI 코딩 어시스턴트용 지침도 들어 있습니다. 플러그인 페이지의 **스타터 다운로드(.zip)**로도 받을 수 있습니다.
- [공식 플러그인 소스](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins) - 위의 모든 플러그인과 그 테스트.

## 기여하기

기여를 환영합니다! 먼저 [기여 지침](CONTRIBUTING.md)(영어)을 읽어 주세요. 플러그인을 추가하려면 README.md에 한 줄을 추가하는 풀 리퀘스트를 여세요.
