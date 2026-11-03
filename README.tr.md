# Awesome Mongo Manager [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

<img src="https://raw.githubusercontent.com/mongo-manager/mongo-manager/main/site/assets/icon.svg" align="right" width="96" alt="Mongo Manager">

> Kendi sunucunuzda çalışan, tarayıcıdan kullanılan MongoDB yöneticisi [Mongo Manager](https://github.com/mongo-manager/mongo-manager) için eklentiler ve kaynaklar.

Bir eklenti Mongo Manager’a bir görünüm, bir eylem ya da bir sayfa ekler: bir koleksiyondaki yerlerin haritası, bir grafik, bir yinelenen kayıt bulucu. Eklenti, uygulamanın korumalı bir çerçevede gösterdiği statik dosyalardan oluşan bir klasördür; sunucuda çalışan kodu yoktur ve kendi başına ağa erişemez (yalnızca bir yöneticinin ayarladığı bir adrese, örneğin bir haritanın karo sunucusuna). Ancak bir yönetici dosyalarını ve istediği izinleri olduğu gibi onayladıktan sonra çalışır.

**Bu listede yer almak bir inceleme ya da onay anlamına gelmez.** Uygulama, bir yönetici onaylamadan önce her eklentiyi tarar; ama tarama niyeti değil, bilinen kalıpları bulur. Onaylamadan önce eklentiyi ve Eklentiler sayfasındaki tarama sonucunu okuyun.

[English](README.md) · Türkçe · [简体中文](README.zh.md) · [日本語](README.ja.md) · [Español](README.es.md) · [Português](README.pt.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Русский](README.ru.md)

## İçindekiler

<!-- toc:start -->
- [Resmi eklentiler](#resmi-eklentiler)
  - [Sorgu ve arama](#sorgu-ve-arama)
  - [Grafikler ve haritalar](#grafikler-ve-haritalar)
  - [Belgeler ve değerler](#belgeler-ve-değerler)
  - [Şema ve veri kalitesi](#şema-ve-veri-kalitesi)
  - [Gizlilik ve test verisi](#gizlilik-ve-test-verisi)
  - [İşletim ve performans](#i̇şletim-ve-performans)
- [Topluluk eklentileri](#topluluk-eklentileri)
- [Eklenti kurmak](#eklenti-kurmak)
- [Eklenti yapmak](#eklenti-yapmak)
<!-- toc:end -->

## Resmi eklentiler

Mongo Manager ile birlikte gelir: sunucunuzda zaten bulunurlar ve bir yönetici her birini Eklentiler sayfasından açar.

<!-- official:start -->

### Sorgu ve arama

- [Tarih filtreleri](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/date-presets) - İnsanların filtrelediği tarih aralıklarını — bugün, dün, son 7 gün, bu ay, son n saat ya da gün, iki gün arası — bir tarih alanına ya da belgelerin oluşturulma zamanına göre _id'ye Belgeler sorgusunda koyar.
- [Değer arama](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/value-search) - Bir koleksiyonun belgelerinin her alanında bir metni, sayıyı ya da ObjectId'yi arar ve nerede bulunduğunu gösterir.
- [SQL → MongoDB](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/sql-to-mongodb) - SELECT sorgularını MongoDB sorgularına ve sürücü koduna çevirir, açık koleksiyonda salt okunur çalıştırır (JOIN, aynı veritabanında adlandırdığı koleksiyonu da okur), Belgeler ya da Aggregations'a koyar.
- [Arama alanı](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/search-playground) - Bir koleksiyonun arama indekslerini dener: bir alanda ya da hepsinde yazım hatasına izin veren, vurgulu tam metin araması ya da yapıştırılan bir vektörle veya bir belgeyle vektör araması; sonuçlar skorlarıyla, boru hattı Aggregations'a verilir.
- [Yeniden şekillendir](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/reshape) - Alanları, örnek belgelerde önizlenen adımlarla yeniden adlandırır, düzleştirir, iç içe koyar, dönüştürür ya da kaldırır; adımları bir boru hattı olarak Aggregations'a verir, orada eklenen bir $out yeni koleksiyonu yazar. Koleksiyonun kendisi hiç değişmez.

### Grafikler ve haritalar

- [Grafikler](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/charts) - Bir koleksiyonun değerlerini grafikle gösterir — çubuk, zamana göre çizgi, halka, histogram, saçılım — özet tablosuyla, geçerli sorgu içinde.
- [Harita](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/geojson-map) - Bir koleksiyonun belgelerindeki GeoJSON alanlarını ve \[boylam, enlem\] çiftlerini haritada çizer, onları haritada çizilen bir alana göre filtreler.

### Belgeler ve değerler

- [Belge karşılaştırma](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/document-diff) - Bir belgeyi koleksiyonundaki başka bir belgeyle alan alan karşılaştırır: eklenen, kaldırılan ya da değişen, iç içe değerler ve diziler dahil.
- [Referanslar](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/references) - Başka belgelerin ObjectId'lerini taşıyan alanları ve başvurdukları koleksiyonları bulur; her kimliğin yanında başvurulan belgenin adını, bulunamayanı da öyle gösterir; bir belgeye başvuran belgeleri listeler.
- [Zaman ipuçları](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/time-hints) - Bir ObjectId'nin üzerine geldiğinizde ne zaman oluşturulduğunu, Unix zamanı gibi görünen bir sayının üzerine geldiğinizde tarihini gösterir.
- [Yerel saat](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/local-time) - Her tarihi yerel saatinizle — ya da ayarladığınız bir saat dilimiyle — UTC'den farkıyla birlikte, bir araç ipucunda ya da değerin yanında gösterir; isterseniz ne kadar önce olduğunu da ekler.
- [İkili veri önizleme](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/binary-preview) - Bir ikili değerin ne taşıdığını — bir görselin türünü ve boyutunu, bir PDF'i, bir arşivi — üzerine geldiğinizde söyler; bir koleksiyonun belgelerinde ya da tek bir belgede saklanan görselleri kendi baytlarından çizerek gösterir.
- [Eski UUID'ler](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/legacy-uuid) - Eski sürücülerin sakladığı UUID'leri (ikili alt tür 3) Java, C# ve Python bayt sıralarıyla okur, bir alanın hangi sırayla yazıldığını bulur ve bir UUID'yi nasıl saklanmış olursa olsun bulur.
- [Belge boyutu](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/document-size) - Bir koleksiyonun belgelerinin ne kadar büyük olduğu — dağılımı, en büyükleri, 16 MB sınırına yakınlığı — ve baytlarının nereye gittiği; alan alan ve nesne alanlarının içine, adlar dahil, sunucuda ölçülür.

### Şema ve veri kalitesi

- [Şema sağlığı](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/schema-health) - Bir koleksiyonun örneğini, belge boyutlarını ve indekslerini MongoDB belgelerinin adlandırdığı şema hatalarına karşı denetler: büyük belgeler ve diziler, derin iç içelik, karışık tipler, kullanılmayan ve gereksiz indeksler.
- [Doğrulama denetimi](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/validation-inspector) - Bir koleksiyonun belgelerini doğrulama kurallarına göre tek tek — rastgele bir örnek üzerinde ya da hepsinde — denetler; her kuralı kaç belgenin bozduğunu söyler, o belgeleri tek tıkla Belgeler'de gösterir.
- [Yinelenen kayıt bulucu](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/duplicate-finder) - Benzersiz olması gereken alanlarda aynı değeri paylaşan belgeleri bulur, sayar, en çoğunu başta gösterir.
- [Veri sözlüğü](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/data-dictionary) - Bir veritabanını belgeler: her koleksiyonun alanları türleri ve bulunma oranlarıyla, doğrulama kurallarının onlar hakkında söyledikleri, koleksiyonlar arasındaki referanslar, dizinler ve kurallar — bir sekmede gösterilir, Markdown ya da HTML olarak kaydedilir.

### Gizlilik ve test verisi

- [Kişisel veri bulucu](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/personal-data) - Bir koleksiyonun kişisel veri taşıyan alanlarını — e-posta adresleri, telefon ve kart numaraları, IBAN'lar, kimlik numaraları, adlar, adresler, parolalar — rastgele bir örnekte bulur, yalnızca maskelenmiş örnekler gösterir ve seçilen alanları kişisel veri kuralı olarak önerir.
- [Anonimleştirici](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/anonymiser) - Test ya da paylaşım için bir koleksiyonun anonim kopyasını oluşturur: biçimini koruyan gerçekçi sahte değerler, tutarlı hash'ler, karıştırılmış değerler, kaydırılmış tarihler, sayı gürültüsü; NDJSON ya da JSON kaydedilir veya yeni bir koleksiyona aktarılır.
- [Test verisi](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/mock-data) - Bir koleksiyonun belgelerine benzeyen gerçekçi test belgeleri üretir — adlar, e-postalar, adresler, fiyatlar, tarihler ve daha fazlası, on dilde 100'den fazla şablondan — ve onları İçe aktarma sihirbazına verir; içe aktarmayı orada kontrol edip siz başlatırsınız.

### İşletim ve performans

- [İndeks betiği](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/index-script) - Bir koleksiyonun ya da tüm veritabanının indekslerini, onları yeniden oluşturan komutlar olarak — mongosh, Node.js ya da Python sürücüsü için veya JSON olarak — başka bir ortam ya da bir taşıma için kopyalanacak ya da kaydedilecek biçimde yazar.
- [Depolama raporu](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/storage-report) - Her koleksiyonun diskte kapladığı yeri, WiredTiger'ın dosyalarında ve indekslerinin dosyalarında tuttuğu boş alanı ve payını gösterir; bir koleksiyon için sıkıştırmanın ne geri vereceğini tahmin eder ve uygulama sorup adını yazdıktan sonra sıkıştırır.
- [Süre dolumu (TTL)](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/ttl-view) - Bir koleksiyonun TTL indekslerinin belgelerini ne zaman sildiğini — süresi dolmuş, bir saat, bir gün, bir hafta içinde, daha sonra — ve hangilerini hiç silmediğini gösterir; her grup tek tıkla Belgeler'de.
- [Parça anahtarı çözümleyici](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/shard-key-analyzer) - Aday parça anahtarlarını MongoDB'nin analyzeShardKey komutunun söylediklerine göre karşılaştırır — farklı değerler, en sık değerin yaygınlığı, her eklemeyle büyüyüp büyümediği — ve her birini MongoDB'nin yönergelerine göre değerlendirir.
- [Log analizcisi](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/log-analyzer) - Bir mongod ya da mongos log dosyasını tarayıcınızda okur — dosya oradan çıkmaz — ve yavaş işlemlerini sorgu biçimine göre gruplanmış hâlde, hatalarını ve uyarılarını, bağlantılarını ve bir zaman çizelgesini gösterir.

<!-- official:end -->

## Topluluk eklentileri

Başkalarının yaptığı, her biri kendi deposunda duran eklentiler [İngilizce listede](README.md#community-plugins) yer alır. Her kayıt, uygulamanın kendi koduyla son Mongo Manager sürümüne göre denetlenir: son sürümünde tek bir eklenti arşivi vardır, manifestini uygulama kabul eder ve uygulamanın taraması içinde yüksek risk bulmaz.

## Eklenti kurmak

**Eklentiler** sayfasında bir yönetici **Eklenti yükle**’yi seçip eklentinin GitHub sürümündeki `.tgz` dosyasını verir ya da **GitHub’dan kur**’u seçip deponun adresini verir (sunucu `MM_PLUGINS_GITHUB=1` ayarlamadıkça bu kapalıdır).

Sunucunun kendisinde, eklentinin kimliğiyle (id) adlandırılmış klasörü veri dizinindeki `plugins` klasörüne de konabilir; ardından **Yeniden tara**’yı seçin.

Hangi yolla gelirse gelsin eklenti kapalı olarak gelir, taranır ve bir yöneticinin onayını bekler. Dosyalarındaki her değişiklik yeni bir onay ister.

## Eklenti yapmak

Eklentiler sayfasında, **Kendi eklentinizi yapın** altında **Geliştirici rehberini okuyun**’u seçin: manifest, köprü, izinler, korumalı alan, tarama, paketleme ve yayımlama dahil bir eklentinin yapabileceği her şey orada.

- [Başlangıç şablonu](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/starter) - Düz JavaScript ile yazılmış, derleme adımı ve bağımlılığı olmayan, çalışan bir eklenti; yapay zekâ kodlama asistanları için talimatlar da içinde. Eklentiler sayfasında **Başlangıç şablonunu indirin (.zip)** olarak da bulunur.
- [Resmi eklentilerin kaynağı](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins) - Yukarıdaki her eklenti, testleriyle birlikte.

## Katkıda bulunmak

Katkılarınızı bekliyoruz! Önce [katkı kılavuzunu](CONTRIBUTING.md) (İngilizce) okuyun. Bir eklenti eklemek için README.md’ye tek satır ekleyen bir pull request açın.
