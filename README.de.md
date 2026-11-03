# Awesome Mongo Manager [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

<img src="https://raw.githubusercontent.com/mongo-manager/mongo-manager/main/site/assets/icon.svg" align="right" width="96" alt="Mongo Manager">

> Plugins und Ressourcen für [Mongo Manager](https://github.com/mongo-manager/mongo-manager), den selbst gehosteten MongoDB-Manager, der im Browser läuft.

Ein Plugin fügt Mongo Manager eine Ansicht, eine Aktion oder eine Seite hinzu: eine Karte der Orte einer Collection, ein Diagramm, eine Duplikatsuche. Es ist ein Ordner mit statischen Dateien, den die App in einem Sandbox-Frame anzeigt, ohne Servercode und ohne eigenen Netzwerkzugriff (nur auf eine Adresse, die ein Administrator festlegt, etwa den Kachelserver einer Karte), und es läuft erst, nachdem ein Administrator genau seine Dateien und die angeforderten Berechtigungen genehmigt hat.

**Ein Eintrag in dieser Liste ist keine Prüfung und keine Empfehlung.** Die App scannt jedes Plugin, bevor ein Administrator es genehmigt, doch ein Scan findet bekannte Muster, keine Absichten. Lesen Sie ein Plugin und seinen Scan auf der Seite Plugins, bevor Sie es genehmigen.

[English](README.md) · [Türkçe](README.tr.md) · [简体中文](README.zh.md) · [日本語](README.ja.md) · [Español](README.es.md) · [Português](README.pt.md) · [한국어](README.ko.md) · Deutsch · [Français](README.fr.md) · [Русский](README.ru.md)

## Inhalt

<!-- toc:start -->
- [Offizielle Plugins](#offizielle-plugins)
  - [Abfragen und Suche](#abfragen-und-suche)
  - [Diagramme und Karten](#diagramme-und-karten)
  - [Dokumente und Werte](#dokumente-und-werte)
  - [Schema und Datenqualität](#schema-und-datenqualität)
  - [Datenschutz und Testdaten](#datenschutz-und-testdaten)
  - [Betrieb und Leistung](#betrieb-und-leistung)
- [Community-Plugins](#community-plugins)
- [Ein Plugin installieren](#ein-plugin-installieren)
- [Ein Plugin erstellen](#ein-plugin-erstellen)
<!-- toc:end -->

## Offizielle Plugins

Sie werden mit Mongo Manager ausgeliefert: Sie sind bereits auf Ihrem Server, und ein Administrator schaltet jedes einzeln auf der Seite Plugins ein.

<!-- official:start -->

### Abfragen und Suche

- [Datumsfilter](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/date-presets) - Setzt in der Dokumentabfrage die gängigen Datumsbereiche – heute, gestern, die letzten 7 Tage, dieser Monat, die letzten n Stunden oder Tage, zwischen zwei Tagen – auf ein Datumsfeld oder auf _id nach dem Zeitpunkt, zu dem die Dokumente erstellt wurden.
- [Wertsuche](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/value-search) - Sucht einen Text, eine Zahl oder eine ObjectId in jedem Feld der Dokumente einer Collection und zeigt, wo sie gefunden wurde.
- [SQL in MongoDB](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/sql-to-mongodb) - Wandelt SELECT-Anweisungen in MongoDB-Abfragen und Treibercode um, führt sie schreibgeschützt in der geöffneten Collection aus (ein JOIN liest auch die genannte Collection derselben Datenbank) und übergibt sie an Dokumente oder Aggregationen.
- [Such-Playground](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/search-playground) - Testet die Suchindizes einer Collection: Volltextsuche in einem Feld oder in allen, mit erlaubten Tippfehlern und Hervorhebungen, oder Vektorsuche mit einem eingefügten Vektor oder einem Dokument der Collection. Die Ergebnisse zeigen ihren Score, die Pipeline geht an Aggregationen.
- [Umformen](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/reshape) - Benennt Felder einer Collection um, verflacht, verschachtelt, konvertiert oder entfernt sie – als Schritte mit Vorschau an Beispieldokumenten, die als Pipeline an Aggregationen gehen; ein dort hinzugefügtes $out schreibt eine neue Collection. Die Collection selbst wird nie geändert.

### Diagramme und Karten

- [Diagramme](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/charts) - Stellt die Werte einer Collection als Diagramm dar – Balken, Linie im Zeitverlauf, Ring, Histogramm, Streudiagramm – mit einer Übersichtstabelle, innerhalb der aktuellen Abfrage.
- [Karte](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/geojson-map) - Zeichnet die GeoJSON-Felder und \[lng, lat\]-Paare der Dokumente einer Collection auf einer Karte und filtert sie nach einem darauf gezeichneten Bereich.

### Dokumente und Werte

- [Dokumentvergleich](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/document-diff) - Vergleicht ein Dokument Feld für Feld mit einem anderen aus derselben Collection: was hinzugefügt, entfernt oder geändert wurde, einschließlich verschachtelter Werte und Arrays.
- [Referenzen](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/references) - Findet die Felder, die ObjectIds anderer Dokumente enthalten, und die Collections, auf die sie verweisen; zeigt neben jeder ID den Namen des referenzierten Dokuments und kennzeichnet ein fehlendes als solches; listet die Dokumente auf, die auf ein Dokument verweisen.
- [Zeithinweise](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/time-hints) - Zeigt beim Zeigen auf eine ObjectId, wann sie erstellt wurde, und bei einer Zahl, die sich als Unix-Zeit lesen lässt, ihr Datum.
- [Ortszeit](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/local-time) - Zeigt jedes Datum in Ihrer Ortszeit – oder in einer von Ihnen festgelegten Zeitzone – mit dem Versatz zu UTC an, in einem Tooltip oder neben dem Wert; auf Wunsch auch, wie lange es her ist.
- [Binärvorschau](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/binary-preview) - Sagt beim Darauf-Zeigen, was ein Binärwert enthält – Art und Größe eines Bildes, ein PDF, ein Archiv – und zeigt die in den Dokumenten einer Collection oder in einem einzelnen Dokument gespeicherten Bilder, gezeichnet aus ihren eigenen Bytes.
- [Legacy-UUIDs](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/legacy-uuid) - Liest die Legacy-UUIDs, die ältere Treiber gespeichert haben (Binary-Subtyp 3), in den Byte-Reihenfolgen von Java, C# und Python, ermittelt, in welcher Reihenfolge ein Feld geschrieben wurde, und findet eine UUID, wie auch immer sie gespeichert wurde.
- [Dokumentgröße](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/document-size) - Wie groß die Dokumente einer Collection sind – ihre Verteilung, die größten, wie nah sie dem 16-MB-Limit kommen – und wohin ihre Bytes gehen, Feld für Feld und bis in Objektfelder hinein, Namen eingeschlossen, auf dem Server gemessen.

### Schema und Datenqualität

- [Schema-Zustand](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/schema-health) - Prüft eine Stichprobe einer Collection, die Größe ihrer Dokumente und ihre Indizes auf die in der MongoDB-Dokumentation genannten Schema-Antipatterns: große Dokumente und Arrays, tiefe Verschachtelung, gemischte Typen, ungenutzte und redundante Indizes.
- [Validierungsprüfung](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/validation-inspector) - Prüft die Dokumente einer Collection einzeln anhand ihrer Validierungsregeln – an einer zufälligen Stichprobe oder an allen – und sagt, wie viele gegen jede Regel verstoßen; diese Dokumente sind mit einem Klick in Dokumente zu sehen.
- [Duplikatsuche](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/duplicate-finder) - Findet Dokumente, die in Feldern, die eindeutig sein sollten, dieselben Werte haben, zählt sie und zeigt die häufigsten zuerst.
- [Datenwörterbuch](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/data-dictionary) - Dokumentiert eine Datenbank: die Felder jeder Collection mit Typen und Vorkommen, was ihre Validierungsregeln dazu sagen, die Verweise zwischen Collections, die Indizes und die Regeln. Wird in einem Tab angezeigt und als Markdown oder HTML gespeichert.

### Datenschutz und Testdaten

- [Finder für personenbezogene Daten](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/personal-data) - Findet in einer zufälligen Stichprobe die Felder einer Collection, die personenbezogene Daten enthalten (E-Mail-Adressen, Telefon- und Kartennummern, IBANs, Ausweisnummern, Namen, Adressen, Passwörter), zeigt nur maskierte Beispiele und schlägt die gewählten Felder als Regeln vor.
- [Anonymisierer](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/anonymiser) - Erstellt eine anonymisierte Kopie einer Collection für Tests oder zum Teilen: realistische fiktive Werte, die ihr Format behalten, konsistente Hashes, gemischte Werte, verschobene Datumswerte, Zahlenrauschen – gespeichert als NDJSON oder JSON oder in eine neue Collection importiert.
- [Testdaten](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/mock-data) - Erzeugt realistische Testdokumente in der Form der Dokumente einer Collection – Namen, E-Mails, Adressen, Preise, Daten und mehr aus über 100 Vorlagen in zehn Sprachen – und übergibt sie dem Import-Assistenten, in dem Sie sie prüfen und den Import starten.

### Betrieb und Leistung

- [Index-Skript](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/index-script) - Schreibt die Indizes einer Collection oder einer ganzen Datenbank als Befehle, die sie neu erstellen – für mongosh, den Node.js- oder Python-Treiber oder als JSON – zum Kopieren oder Speichern, für eine andere Umgebung oder eine Migration.
- [Speicherbericht](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/storage-report) - Zeigt, was jede Collection auf dem Datenträger belegt, den freien Platz, den WiredTiger in ihren Dateien und denen ihrer Indizes hält, und dessen Anteil. Für eine Collection schätzt es, was Verdichten zurückgäbe, und verdichtet sie, wenn die App nachfragt und Sie ihren Namen eingeben.
- [Ablauf (TTL)](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/ttl-view) - Zeigt, wann die TTL-Indizes einer Collection ihre Dokumente entfernen – bereits fällig, innerhalb der Stunde, des Tages, der Woche, später – und welche sie nie entfernen; jede Gruppe ist einen Klick entfernt in Dokumente.
- [Shard-Schlüssel-Analysator](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/shard-key-analyzer) - Vergleicht Kandidaten für den Shard-Schlüssel einer Collection anhand der Ergebnisse von analyzeShardKey in MongoDB – verschiedene Werte, Häufigkeit des häufigsten Werts, Wachstum des Schlüssels bei jedem Einfügen – und bewertet jeden nach den Richtlinien von MongoDB.
- [Log-Analyzer](https://github.com/mongo-manager/mongo-manager/tree/v1.1.0/packages/plugins/log-analyzer) - Liest eine mongod- oder mongos-Logdatei im Browser – sie verlässt ihn nie – und zeigt die langsamen Operationen nach Abfrageform gruppiert, Fehler und Warnungen, Verbindungen und einen Zeitverlauf.

<!-- official:end -->

## Community-Plugins

Plugins anderer Leute, jedes in seinem eigenen Repository, stehen in der [englischen Liste](README.md#community-plugins). Jeder Eintrag wird mit dem eigenen Code der App gegen die neueste Version von Mongo Manager geprüft: Seine neueste Version enthält genau ein Plugin-Archiv, die App akzeptiert sein Manifest, und der Scan der App findet darin kein hohes Risiko.

## Ein Plugin installieren

Auf der Seite **Plugins** wählt ein Administrator **Plugin hochladen** und gibt die `.tgz`-Datei aus dem GitHub-Release des Plugins an, oder er wählt **Von GitHub installieren** und gibt die Adresse des Repositorys an (das ist ausgeschaltet, solange der Server nicht `MM_PLUGINS_GITHUB=1` setzt).

Auf dem Server selbst kann der Ordner des Plugins, benannt nach seiner ID, auch in den Ordner `plugins` des Datenverzeichnisses gelegt werden; wählen Sie dann **Erneut scannen**.

Auf jedem Weg kommt das Plugin ausgeschaltet an, wird gescannt und wartet auf die Genehmigung eines Administrators. Jede Änderung an seinen Dateien braucht eine neue Genehmigung.

## Ein Plugin erstellen

Wählen Sie auf der Seite Plugins unter **Eigenes Plugin erstellen** die Option **Entwicklerhandbuch lesen**: Dort steht alles, was ein Plugin kann – das Manifest, die Bridge, die Berechtigungen, die Sandbox, der Scan, das Packen und das Veröffentlichen.

- [Starter](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/starter) - Ein funktionierendes Plugin in reinem JavaScript, ohne Build-Schritt und ohne Abhängigkeiten, mit Anweisungen für KI-Programmierassistenten. Auch auf der Seite Plugins, als **Starter herunterladen (.zip)**.
- [Quellcode der offiziellen Plugins](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins) - Jedes Plugin oben, mit seinen Tests.

## Mitwirken

Beiträge sind willkommen! Lesen Sie zuerst die [Richtlinien für Beiträge](CONTRIBUTING.md) (auf Englisch). Um ein Plugin hinzuzufügen, öffnen Sie einen Pull Request, der README.md eine Zeile hinzufügt.
