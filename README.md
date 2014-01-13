bem-data-source
===============

Инструмент для версионированной сборки документации и примеров библиотек для проектов bem-info legoa-www.

### Установка

* клонировать репозиотрий `git clone git://github.com/bem/bem-data-source.git`
* перейти в директорию с выкачанным проектом `cd bem-data-source`
* запустить команду `make`

Команда `make` устанавливает зависимости для проекта и генерирует конфигурационные файлы:
* `config/credentials.json`
* `config/repositories.json`

### Конфигурирование

Конфигурация инструмента описывается в файлах `config/config.json`, `config/repositories.json`, `config/credentials.json`.

#### `config/config.json`

* `contentDirectory` - название директории куда будут выкачиваться библиотеки при сборке.
* `outputDirectory` - название директории куда будут складываться собранные data.json - файлы.
* `outputTargetFile` - имя .json файла в который кешируется результат сборки для текущей цели.
* `outputDataFile` - имя .json файла в который записывается финальный результат сборки (этот файл попадает в репозиторий с собранными данными для сайта).
* `outputDataMinFile` - минимизированный .json файл с финальным результатом сборки.
* `repositoriesFileName` - имя .json файла c описанием репозиториев данные из которых попадут в результат сборки (`config/repositories.json` название этого файла нельзя менять!).
* `repoConfig` - конфигурация удаленного репозитория для загрузки и выгрузки удаленного файла `repositories.json` c описанием репозиториев-источников данных для сборки
* `dataConfig` - конфигурация удаленного репозитория для выкладки собранных данных и хранения
`repositoriesFileName` - файла с конфигурацией репозиторие участвующих в сборке
* `gitAPI` - конфигурация github API для доступа к приватным и публичным репозиториям github.
* `normalize` - экспериментальный флаг, включение которого добавляет этап приведения.
собранных данных к нормализованному виду и строит квази-бд в json структурах.
* `localMode` - флаг для удобства разработки. При включении список репозиториев для сборки будет определяться
содержимым локального файла `config/repositories.json`, а не скачиваться с удаленного репозитория.

#### `config/repositories.json`

В файле `config/repositories.json` описываются репозитории участвующие в сборке. В рабочем режиме этот файл
скачивается из удаленного репозитория, однако для удобства тестирования с помощью опции `localMode` в значении `true`
можно использовать для сборки локальный файл `config/repositories.json`.

ВНИМАНИЕ: При запуске команд  `make clean` или `make restart` содержимое  файла `config/repositories.json будет замещено содержимым файла `config/_repositories.json.

Структуру файла `repositories.json` можно разделить на 2 группы `private` и `public`. В разделе `private` описываются репозитории, находящиеся
на внутреннем корпоративном github-е `https://github.yandex-team.ru`. В разделе  `public` описываются репозитории, находящиеся
на внешнем публичном github-е `https://github.com`.

Внутри групп `private` и `public` репозитории также группируются по критерию владельца, которыми могут быть как организации `org`,
так и отдельные люди `user`.

Библиотека для сборки оисывается в конфигурационном файле объектом вида:

```
{
    "name": "firmCardStory",
    "targetDir": "articles/firm-card-story",
    "type": ["docs"],
    "docDirs": ["docs"],
    "branches": {
        "include": ["master"],
        "exclude": []
    },
    "tags": [
        "include": [],
        "exclude": []
    ]
}
```

Здесь:

* `name` - название репозитория (должно совпадать с названием репозитория на github)
* `targetDir` - название директории куда будет склонирован проект (относительно общей папки `contentDirectory`)
* `type` - массив типов ресурсов, которые будут собраны для данного репозитория. Возможные значения: `libs`, `docs`
* `docDirs` - массив с названиями директорий в которых находятся блоки с документацией. Обычно это `docs`, `doc`, `common.docs` и.т.д
Если блоки с документацией находятся в корне проекта, то массив должен быть пустым.
* `branches` - объект с полями `include` и `exclude`, значеними которых являются массивы с именами веток `branch` которые
будут соответственно включены и исключены из сборки проекта. После успешной сборки конфигурационный файл переписывается и
в массив `exclude` добавляется имя собранной ветки.
* `tags` - объект с полями `include` и `exclude`, значеними которых являются массивы с именами тегов `tag` которые
будут соответственно включены и исключены из сборки проекта. После успешной сборки конфигурационный файл переписывается и
в массив `exclude` добавляется имя собранного тега. Значением поля `include` для тегов могут быть также строки
`all` и `last`. `all` указывает на необходимость сборки всех существующих тегов, а `last` только последнего тега.
(здесь предполагается что теги имеют структуру 0.0.0, что дает возможность их явной сортировки)

#### `config/credentials.json`

Файл с токенами доступа к публичным и приватным репозиториям (github.com и github.yandex-team.ru соответственно)
Необходимо сгенерировать токены доступа в настройках профиля пользователя на github.com и github.yandex.team.ru
и вставить как значения соответствующих token-полей в данном файле.
```
{
    "credentials": {
        "public": {
            "type": "oauth",
            "token": ""
        },
        "private": {
            "type": "oauth",
            "token": ""
        }
    }
}
```

### Запуск

Запуск осуществляется командой `npm start` или node make.js

В последнем варианте, при запуске инструмента можно указывать разные уровни логирования добавляя флаг `-v` и возможными значениями
`silly`, `debug`, `info`, `warn`, `error`. По умолчанию выставляется уровень логгирования 'info'.

Можно запускать сборщик с предварительной очисткой результатов предыдущей сборки и сбросом файла repositories.json.
Такой запуск осуществляется командой `make restart`

### Терминология

* `sources` (ресурсы) - репозитории, данные из которым попадут в сборку.
* `targets` (цели) - цели для сборки. Целью для сборки является выбранный тег или ветка репозитория.
* `tasks` (задачи) - набор модулей выполняющих определенные задачи из которых состоит сборка для одной цели,
  например такие как клонирование репозитория или установка зависимостей.

### Принцип работы

Работа инструмента может быть четко разделена на несколько последовательных шагов.

#### Шаг #0 init

Это погдотовительный шаг для сборки. На этом этапе создаются директории `contentDirectory` и `outputDirectory` если их несуществует.
При этом внутри `contentDirectory` происходит проверка наличия гит-репозитория (по наличию папки `.git`) и, если гит-реозиторий
отсутствует, то он инициализируется и привязывается к удаленному репозиторию в котором будут храниться финальные результаты сборки для сайта

#### Шаг #1 get_sources

На этом шаге файл `repositoriesFileName` скачивается с удаленного репозиотрия
(или берется из локального файла если удаленного файла еще не существует или привключении опции `localMode` в конфиге),
парсится, его древовидный структура превращается в плоский список элементами которого являются
объекты, описывающие информацию по отдельным репозиториям (ресурсы), с добавлением полей владельца и логическим флагом для обозначения
типа приватности этого репозитория (корпоративный или общий github). Такая структура данных содержит всю необходимую
информацию для работы с github API в удобном виде.

#### Шаг #2 resolve_repositories

На этом шаге для каждого ресурса построенного на этапе #1 по названию репозитория
и владельцу происходит построение ссылки на git-репозиторий для которого должна выполниться сборка.

#### Шаг #3 resolve_tags

На этом шаге для каждого ресурса построенного на этапе #1 по названию репозитория
и владельцу происходит запрос на получение детальной информации о существующих тегах репозитория. Полученный список
фильтруется по критерию совпадения с массивами тегов указанных в полях `include` и `exclude` соответствующего ресурса.

#### Шаг #4 resolve_branches

Аналогично шагу #3 но для веток репозитория.

#### Шаг #5 create_targets

Для каждого тега и каждой ветки, оставшихся после фильтрации на этапах #3 и #4 создаются цели для сборки.
Цель представляет собой объект хранящий в себе всю необходимую информацию для сборки, такую как название ветки или тега,
путь в который репозиторию будет склонирован и.т.д. Кроме этого цель включает в себя массив задач которые должны последовательно
выполнены для ее сборки.

В настоящее время цели деляться на 2 типа (по типам собираемых ресурсов): `libs` - библиотеки блоков, `docs` - репозитории с документацией.
Это разделение необходимо для выбора механизма сборки. Для `libs` используется инструмент `bem-sets` с предварительной установкой зависимостей,
а для `docs` - простая файловая интроспекция по блокам с документацией.

#### Шаг #6 execute_targets

На этом шаге происходит последовательное выполнение задач для каждой из целей сборки.
При этом выполнение сборки для каждой из целей выполняется асинхронно и независимо от других целей.

#### Шаг #8 finalize

На этом шаге происходит перезапись файла `repositoriesFileName`.
Теги или ветки ресурсы которых были успешно собраны добавляются в `exclude` массивы
соответствующих репозиториев и файл перезаписывается (как на локальной файловой системе, так и на удаленном github репозитории `dataRepository`).
Это дает возможность исключить повторную сборку уже собраных ресурсов.

#### Шаг #9 collect_results

На этом шаге происходит окончательная сборка и компоновка собранных данных. Для всех тегов и веток репозиториев
происходит чтение закешированных промежуточных результатов сборки из файлов `outputTargetFile`. Затем, полученные данные
объединяются в один супер-массив, который записывается в 2 файла: `outputDataFile` и `outputDataMinFile`.
Первый предоставляет данные в виде удобном для чтения, а второй
данные в минимизированном виде, что помогает сократить размер файла и ускорить его загрузку при работе фронтед-части.
Эти файлы записываются в папку `outputDirectory/version`, где `version` - кол-во миллисекунд с 1 января 1970 года.
Кроме того `outputDataFile` и `outputDataMinFile` выкладываются в репозиторий `dataRepository`

#### Опциональная нормализация данных

Нормализация данных обозначает процесс данных по типам сущностей и генерацию связей между ними с гарантией целостности.
Объект содержащий данные в нормализованном виде с сигнатурой типа:

```
var db = {
    languages: [],
    tags: [],
    types: [],
    authors: [],
    categories: [],
    posts: []
};
```

### Дальнейшая работа:

Организовать выкладку результатов сборки библиотек блоков в `dataRepository`.

Ответственный за разработку @bemer

Вопросы и пожелания присылать по адресу: bemer@yandex-team.ru
