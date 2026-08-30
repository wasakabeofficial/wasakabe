-- =====================================================================
-- Contenido extendido de cada página de servicio (/servicios/:slug):
-- "qué incluye", "cómo trabajo", "objetivo", disciplinas y stack /
-- herramientas. Traducido a los 6 idiomas del sitio (es, en, zh, ko,
-- ru, ja). Idempotente: seguro de correr varias veces.
-- =====================================================================

-- ---------------- Esquema ----------------

create table if not exists service_details (
  id bigint generated always as identity primary key,
  service_slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists service_detail_translations (
  id bigint generated always as identity primary key,
  detail_id bigint not null references service_details(id) on delete cascade,
  language_code text not null,
  includes text[] not null default '{}',
  goal text not null,
  disciplines text[] not null default '{}',
  created_at timestamptz not null default now(),
  unique (detail_id, language_code)
);

create table if not exists service_detail_process_steps (
  id bigint generated always as identity primary key,
  detail_id bigint not null references service_details(id) on delete cascade,
  language_code text not null,
  position int not null,
  title text not null,
  description text not null,
  unique (detail_id, language_code, position)
);

create table if not exists service_detail_stack_groups (
  id bigint generated always as identity primary key,
  detail_id bigint not null references service_details(id) on delete cascade,
  language_code text not null,
  position int not null,
  category text not null,
  items text[] not null,
  unique (detail_id, language_code, position)
);

alter table service_details enable row level security;
alter table service_detail_translations enable row level security;
alter table service_detail_process_steps enable row level security;
alter table service_detail_stack_groups enable row level security;

drop policy if exists "Public read access" on service_details;
create policy "Public read access" on service_details for select using (true);

drop policy if exists "Public read access" on service_detail_translations;
create policy "Public read access" on service_detail_translations for select using (true);

drop policy if exists "Public read access" on service_detail_process_steps;
create policy "Public read access" on service_detail_process_steps for select using (true);

drop policy if exists "Public read access" on service_detail_stack_groups;
create policy "Public read access" on service_detail_stack_groups for select using (true);

-- =====================================================================
-- software-engineering
-- =====================================================================

insert into service_details (service_slug)
select 'software-engineering'
where not exists (select 1 from service_details where service_slug = 'software-engineering');

insert into service_detail_translations (detail_id, language_code, includes, goal, disciplines)
select d.id, v.language_code, v.includes, v.goal, '{}'::text[]
from service_details d join (values
  ('es', array[
    'Arquitectura full-stack completa: frontend, backend, base de datos e infraestructura, eligiendo entre arquitectura hexagonal, monolito modular o microservicios según la escala real del proyecto',
    'Diseño e implementación de agentes de IA y automatizaciones: agentes conversacionales de voz y texto, orquestación de flujos y LLMs aplicados a casos de negocio',
    'Desarrollo mobile multiplataforma con React Native y Flutter, incluyendo publicación en App Store / Google Play e integraciones nativas para wearables',
    'Integraciones de pago y servicios de terceros: pasarelas como Stripe bajo cumplimiento PCI, APIs de voz (Alexa), y servicios de datos',
    'DevOps: pipelines de CI/CD, monitoreo autónomo de infraestructura y automatización de despliegues',
    'Migración, limpieza y modernización de bases de datos y sistemas legados'
  ], 'Que el software que construyo resuelva un problema real de negocio y siga funcionando —y escalando— mucho después de la entrega.'),
  ('en', array[
    'Complete full-stack architecture: frontend, backend, database and infrastructure, choosing between hexagonal architecture, modular monolith or microservices based on the project real scale',
    'Design and implementation of AI agents and automations: voice and text conversational agents, workflow orchestration and LLMs applied to business cases',
    'Cross-platform mobile development with React Native and Flutter, including App Store / Google Play publishing and native integrations for wearables',
    'Payment integrations and third-party services: gateways like Stripe under PCI compliance, voice APIs (Alexa), and data services',
    'DevOps: CI/CD pipelines, autonomous infrastructure monitoring and deployment automation',
    'Migration, cleanup and modernization of databases and legacy systems'
  ], 'That the software I build solves a real business problem and keeps working — and scaling — long after delivery.'),
  ('zh', array[
    '完整的全栈架构：前端、后端、数据库和基础设施，根据项目的实际规模选择六边形架构、模块化单体或微服务',
    '设计并实现AI代理与自动化：语音和文本对话代理、工作流编排，以及应用于业务场景的大语言模型（LLM）',
    '使用React Native和Flutter进行跨平台移动开发，包括App Store / Google Play发布及可穿戴设备的原生集成',
    '支付与第三方服务集成：符合PCI合规标准的Stripe等支付网关、语音API（Alexa）以及数据服务',
    'DevOps：CI/CD流水线、基础设施的自主监控与部署自动化',
    '数据库与遗留系统的迁移、清理与现代化改造'
  ], '让我构建的软件解决真实的业务问题，并在交付之后依然长期稳定运行并持续扩展。'),
  ('ko', array[
    '완전한 풀스택 아키텍처: 프론트엔드, 백엔드, 데이터베이스 및 인프라를 아우르며, 프로젝트의 실제 규모에 따라 헥사고날 아키텍처, 모듈형 모놀리스 또는 마이크로서비스 중 선택',
    'AI 에이전트 및 자동화 설계·구현: 음성 및 텍스트 대화형 에이전트, 워크플로 오케스트레이션, 비즈니스 사례에 적용되는 LLM',
    'React Native와 Flutter를 활용한 크로스플랫폼 모바일 개발, App Store / Google Play 배포 및 웨어러블용 네이티브 통합 포함',
    '결제 및 서드파티 서비스 통합: PCI 규정을 준수하는 Stripe 등의 결제 게이트웨이, 음성 API(Alexa), 데이터 서비스',
    'DevOps: CI/CD 파이프라인, 자율적인 인프라 모니터링 및 배포 자동화',
    '데이터베이스 및 레거시 시스템의 마이그레이션, 정리, 현대화'
  ], '제가 만든 소프트웨어가 실제 비즈니스 문제를 해결하고, 납품 이후에도 오랫동안 안정적으로 작동하며 확장되는 것입니다.'),
  ('ru', array[
    'Полная full-stack архитектура: фронтенд, бэкенд, база данных и инфраструктура, с выбором между гексагональной архитектурой, модульным монолитом или микросервисами в зависимости от реального масштаба проекта',
    'Проектирование и внедрение ИИ-агентов и автоматизаций: голосовые и текстовые диалоговые агенты, оркестрация workflow и LLM для бизнес-задач',
    'Кроссплатформенная мобильная разработка на React Native и Flutter, включая публикацию в App Store / Google Play и нативные интеграции для носимых устройств',
    'Интеграции платежей и сторонних сервисов: платёжные шлюзы вроде Stripe с соблюдением PCI, голосовые API (Alexa) и сервисы данных',
    'DevOps: пайплайны CI/CD, автономный мониторинг инфраструктуры и автоматизация развёртывания',
    'Миграция, очистка и модернизация баз данных и устаревших систем'
  ], 'Чтобы созданное мной ПО решало реальную бизнес-проблему и продолжало работать — и масштабироваться — ещё долго после сдачи проекта.'),
  ('ja', array[
    'フロントエンド、バックエンド、データベース、インフラを含む完全なフルスタックアーキテクチャ。プロジェクトの実際の規模に応じてヘキサゴナルアーキテクチャ、モジュラーモノリス、マイクロサービスから選択',
    'AIエージェントと自動化の設計・実装：音声およびテキストの会話型エージェント、ワークフローのオーケストレーション、ビジネスケースに適用するLLM',
    'React NativeとFlutterによるクロスプラットフォームのモバイル開発。App Store / Google Playへの公開、ウェアラブル向けネイティブ統合を含む',
    '決済およびサードパーティサービスの統合：PCI準拠のStripeなどの決済ゲートウェイ、音声API（Alexa）、データサービス',
    'DevOps：CI/CDパイプライン、インフラの自律的な監視、デプロイの自動化',
    'データベースおよびレガシーシステムの移行、整理、モダナイズ'
  ], '私が構築するソフトウェアが実際のビジネス課題を解決し、納品後も長く動き続け、スケールし続けること。')
) as v(language_code, includes, goal) on true
where d.service_slug = 'software-engineering'
on conflict (detail_id, language_code) do update set
  includes = excluded.includes, goal = excluded.goal, disciplines = excluded.disciplines;

insert into service_detail_process_steps (detail_id, language_code, position, title, description)
select d.id, v.language_code, v.position, v.title, v.description
from service_details d join (values
  ('es', 1, 'Descubrimiento técnico', 'Levanto el problema real, el contexto técnico existente y las restricciones del proyecto (equipo, presupuesto, plazos) antes de proponer una solución.'),
  ('es', 2, 'Arquitectura', 'Defino el stack, el modelo de datos y el estilo de arquitectura (hexagonal, monolito modular o microservicios) según la escala real que necesita el proyecto, no la que suena mejor en un pitch.'),
  ('es', 3, 'Desarrollo iterativo con CI/CD', 'Construyo en ciclos cortos con integración continua, para desplegar cambios pequeños y validados con frecuencia en lugar de una sola entrega gigante al final.'),
  ('es', 4, 'Entrega, monitoreo y soporte', 'Despliegue a producción, documentación técnica del sistema y una ventana de soporte con monitoreo activo para resolver lo que surja ya en uso real.'),
  ('en', 1, 'Technical discovery', 'I map out the real problem, the existing technical context and the project constraints (team, budget, timeline) before proposing a solution.'),
  ('en', 2, 'Architecture', 'I define the stack, the data model and the architectural style (hexagonal, modular monolith or microservices) based on the scale the project actually needs, not the one that sounds best in a pitch.'),
  ('en', 3, 'Iterative development with CI/CD', 'I build in short cycles with continuous integration, shipping small, validated changes often instead of one giant release at the end.'),
  ('en', 4, 'Delivery, monitoring and support', 'Production deployment, technical documentation of the system, and a support window with active monitoring to handle whatever comes up in real use.'),
  ('zh', 1, '技术发现', '在提出解决方案之前，我会梳理真实存在的问题、现有的技术背景以及项目的限制条件（团队、预算、时间）。'),
  ('zh', 2, '架构设计', '根据项目实际需要的规模（而不是听起来更炫的方案），确定技术栈、数据模型以及架构风格（六边形、模块化单体或微服务）。'),
  ('zh', 3, '采用CI/CD的迭代开发', '以短周期持续集成的方式开发，频繁交付经过验证的小改动，而不是最后一次性发布巨大版本。'),
  ('zh', 4, '交付、监控与支持', '部署上线、编写系统技术文档，并在支持期内进行主动监控，及时处理真实使用中出现的问题。'),
  ('ko', 1, '기술 파악', '솔루션을 제안하기 전에 실제 문제, 기존 기술적 맥락, 프로젝트의 제약(팀, 예산, 일정)을 먼저 파악합니다.'),
  ('ko', 2, '아키텍처 설계', '그럴듯하게 들리는 방식이 아니라 프로젝트에 실제로 필요한 규모에 맞춰 스택, 데이터 모델, 아키텍처 스타일(헥사고날, 모듈형 모놀리스 또는 마이크로서비스)을 정합니다.'),
  ('ko', 3, 'CI/CD 기반 반복 개발', '지속적 통합을 활용해 짧은 주기로 개발하며, 마지막에 거대한 배포 한 번이 아니라 검증된 작은 변경을 자주 배포합니다.'),
  ('ko', 4, '배포, 모니터링 및 지원', '프로덕션 배포, 시스템 기술 문서화, 그리고 실제 운영 중 발생하는 문제를 해결하기 위한 능동적 모니터링을 포함한 지원 기간을 제공합니다.'),
  ('ru', 1, 'Техническое исследование', 'Прежде чем предлагать решение, я разбираюсь в реальной проблеме, существующем техническом контексте и ограничениях проекта (команда, бюджет, сроки).'),
  ('ru', 2, 'Архитектура', 'Определяю стек, модель данных и архитектурный стиль (гексагональный, модульный монолит или микросервисы) исходя из реального масштаба проекта, а не того, что эффектнее звучит в питче.'),
  ('ru', 3, 'Итеративная разработка с CI/CD', 'Разрабатываю короткими циклами с непрерывной интеграцией, часто выпуская небольшие проверенные изменения вместо одного гигантского релиза в конце.'),
  ('ru', 4, 'Развёртывание, мониторинг и поддержка', 'Развёртывание в production, техническая документация системы и период поддержки с активным мониторингом для решения того, что возникает в реальном использовании.'),
  ('ja', 1, '技術的な現状把握', '解決策を提案する前に、実際の課題、既存の技術的背景、プロジェクトの制約（チーム、予算、期限）を整理します。'),
  ('ja', 2, 'アーキテクチャ設計', '見栄えの良さではなく、プロジェクトが実際に必要とする規模に基づいて、スタック、データモデル、アーキテクチャスタイル（ヘキサゴナル、モジュラーモノリス、マイクロサービス）を決定します。'),
  ('ja', 3, 'CI/CDによる反復開発', '継続的インテグレーションを活用し、短いサイクルで開発。最後に一度の巨大リリースではなく、検証済みの小さな変更を頻繁にデプロイします。'),
  ('ja', 4, '納品・監視・サポート', '本番環境へのデプロイ、システムの技術ドキュメント作成、実際の運用で発生する事項に対応するための能動的な監視を伴うサポート期間を提供します。')
) as v(language_code, position, title, description) on true
where d.service_slug = 'software-engineering'
on conflict (detail_id, language_code, position) do update set
  title = excluded.title, description = excluded.description;

insert into service_detail_stack_groups (detail_id, language_code, position, category, items)
select d.id, v.language_code, v.position, v.category, v.items
from service_details d join (values
  ('es', 1, 'Lenguajes', array['Python','Java','JavaScript / TypeScript','PHP','Go','Rust']),
  ('es', 2, 'Frameworks frontend', array['React','Vite','React Native','Flutter']),
  ('es', 3, 'Frameworks backend', array['Flask','Spring Boot','Laravel']),
  ('es', 4, 'Frameworks de videojuegos', array['Unity','Unreal Engine']),
  ('es', 5, 'Metodologías', array['Arquitectura hexagonal','Scrum / Agile','Kanban','TDD','Domain-Driven Design (DDD)']),
  ('es', 6, 'IA & Automatización', array['Agentes de IA','LLMs','n8n','Automatización de flujos']),
  ('es', 7, 'DevOps', array['CI/CD','Automatización de despliegues','Monitoreo autónomo']),
  ('es', 8, 'Infraestructura', array['Zabbix','GNS3']),
  ('es', 9, 'Nube', array['Vercel','Supabase','PostgreSQL']),
  ('es', 10, 'Control de versiones', array['Git','GitHub']),
  ('es', 11, 'Testing', array['Automatización de pruebas en CI/CD','Type-checking estricto (TypeScript)']),
  ('es', 12, 'Integraciones', array['Stripe (pagos)','Amazon Alexa Skills','APIs REST']),

  ('en', 1, 'Languages', array['Python','Java','JavaScript / TypeScript','PHP','Go','Rust']),
  ('en', 2, 'Frontend frameworks', array['React','Vite','React Native','Flutter']),
  ('en', 3, 'Backend frameworks', array['Flask','Spring Boot','Laravel']),
  ('en', 4, 'Game development frameworks', array['Unity','Unreal Engine']),
  ('en', 5, 'Methodologies', array['Hexagonal architecture','Scrum / Agile','Kanban','TDD','Domain-Driven Design (DDD)']),
  ('en', 6, 'AI & Automation', array['AI Agents','LLMs','n8n','Workflow automation']),
  ('en', 7, 'DevOps', array['CI/CD','Deployment automation','Autonomous monitoring']),
  ('en', 8, 'Infrastructure', array['Zabbix','GNS3']),
  ('en', 9, 'Cloud', array['Vercel','Supabase','PostgreSQL']),
  ('en', 10, 'Version control', array['Git','GitHub']),
  ('en', 11, 'Testing', array['Automated testing in CI/CD','Strict type-checking (TypeScript)']),
  ('en', 12, 'Integrations', array['Stripe (payments)','Amazon Alexa Skills','REST APIs']),

  ('zh', 1, '语言', array['Python','Java','JavaScript / TypeScript','PHP','Go','Rust']),
  ('zh', 2, '前端框架', array['React','Vite','React Native','Flutter']),
  ('zh', 3, '后端框架', array['Flask','Spring Boot','Laravel']),
  ('zh', 4, '游戏开发框架', array['Unity','Unreal Engine']),
  ('zh', 5, '方法论', array['六边形架构','Scrum / Agile','看板（Kanban）','TDD','领域驱动设计（DDD）']),
  ('zh', 6, 'AI与自动化', array['AI智能体','LLMs','n8n','工作流自动化']),
  ('zh', 7, 'DevOps', array['CI/CD','部署自动化','自主监控']),
  ('zh', 8, '基础设施', array['Zabbix','GNS3']),
  ('zh', 9, '云服务', array['Vercel','Supabase','PostgreSQL']),
  ('zh', 10, '版本控制', array['Git','GitHub']),
  ('zh', 11, '测试', array['CI/CD中的自动化测试','严格类型检查（TypeScript）']),
  ('zh', 12, '集成', array['Stripe（支付）','Amazon Alexa Skills','REST API']),

  ('ko', 1, '언어', array['Python','Java','JavaScript / TypeScript','PHP','Go','Rust']),
  ('ko', 2, '프론트엔드 프레임워크', array['React','Vite','React Native','Flutter']),
  ('ko', 3, '백엔드 프레임워크', array['Flask','Spring Boot','Laravel']),
  ('ko', 4, '게임 개발 프레임워크', array['Unity','Unreal Engine']),
  ('ko', 5, '방법론', array['헥사고날 아키텍처','Scrum / Agile','칸반(Kanban)','TDD','도메인 주도 설계(DDD)']),
  ('ko', 6, 'AI 및 자동화', array['AI 에이전트','LLMs','n8n','워크플로 자동화']),
  ('ko', 7, 'DevOps', array['CI/CD','배포 자동화','자율 모니터링']),
  ('ko', 8, '인프라', array['Zabbix','GNS3']),
  ('ko', 9, '클라우드', array['Vercel','Supabase','PostgreSQL']),
  ('ko', 10, '버전 관리', array['Git','GitHub']),
  ('ko', 11, '테스트', array['CI/CD 내 자동화 테스트','엄격한 타입 검사(TypeScript)']),
  ('ko', 12, '통합', array['Stripe(결제)','Amazon Alexa Skills','REST API']),

  ('ru', 1, 'Языки', array['Python','Java','JavaScript / TypeScript','PHP','Go','Rust']),
  ('ru', 2, 'Frontend-фреймворки', array['React','Vite','React Native','Flutter']),
  ('ru', 3, 'Backend-фреймворки', array['Flask','Spring Boot','Laravel']),
  ('ru', 4, 'Игровые движки', array['Unity','Unreal Engine']),
  ('ru', 5, 'Методологии', array['Гексагональная архитектура','Scrum / Agile','Kanban','TDD','Domain-Driven Design (DDD)']),
  ('ru', 6, 'ИИ и автоматизация', array['ИИ-агенты','LLM','n8n','Автоматизация workflow']),
  ('ru', 7, 'DevOps', array['CI/CD','Автоматизация развёртывания','Автономный мониторинг']),
  ('ru', 8, 'Инфраструктура', array['Zabbix','GNS3']),
  ('ru', 9, 'Облако', array['Vercel','Supabase','PostgreSQL']),
  ('ru', 10, 'Контроль версий', array['Git','GitHub']),
  ('ru', 11, 'Тестирование', array['Автоматизация тестирования в CI/CD','Строгая типизация (TypeScript)']),
  ('ru', 12, 'Интеграции', array['Stripe (платежи)','Amazon Alexa Skills','REST API']),

  ('ja', 1, '言語', array['Python','Java','JavaScript / TypeScript','PHP','Go','Rust']),
  ('ja', 2, 'フロントエンドフレームワーク', array['React','Vite','React Native','Flutter']),
  ('ja', 3, 'バックエンドフレームワーク', array['Flask','Spring Boot','Laravel']),
  ('ja', 4, 'ゲーム開発フレームワーク', array['Unity','Unreal Engine']),
  ('ja', 5, '方法論', array['ヘキサゴナルアーキテクチャ','Scrum / Agile','カンバン(Kanban)','TDD','ドメイン駆動設計(DDD)']),
  ('ja', 6, 'AI・自動化', array['AIエージェント','LLMs','n8n','ワークフロー自動化']),
  ('ja', 7, 'DevOps', array['CI/CD','デプロイ自動化','自律監視']),
  ('ja', 8, 'インフラ', array['Zabbix','GNS3']),
  ('ja', 9, 'クラウド', array['Vercel','Supabase','PostgreSQL']),
  ('ja', 10, 'バージョン管理', array['Git','GitHub']),
  ('ja', 11, 'テスト', array['CI/CDにおける自動テスト','厳格な型チェック（TypeScript）']),
  ('ja', 12, '連携・統合', array['Stripe（決済）','Amazon Alexa Skills','REST API'])
) as v(language_code, position, category, items) on true
where d.service_slug = 'software-engineering'
on conflict (detail_id, language_code, position) do update set
  category = excluded.category, items = excluded.items;

-- =====================================================================
-- creative-direction
-- =====================================================================

insert into service_details (service_slug)
select 'creative-direction'
where not exists (select 1 from service_details where service_slug = 'creative-direction');

insert into service_detail_translations (detail_id, language_code, includes, goal, disciplines)
select d.id, v.language_code, v.includes, v.goal, v.disciplines
from service_details d join (values
  ('es', array[
    'Definición de concepto y narrativa para piezas visuales o audiovisuales, desde cero o a partir de un brief existente',
    'Dirección de arte: paleta, composición, tono visual y referencias',
    'Guionización y storyboard previos a producción, para que el equipo de rodaje sepa exactamente qué se va a capturar',
    'Dirección en set: fotografía y video, coordinando talento y equipo técnico',
    'Supervisión de producción de principio a fin, con mirada técnica (por mi perfil de ingeniero) y sensibilidad artística'
  ], 'Que cada proyecto tenga una identidad visual clara y una historia que conecte con quien la ve.', array['Dirección','Film','Fotografía']),
  ('en', array[
    'Concept and narrative definition for visual or audiovisual pieces, from scratch or based on an existing brief',
    'Art direction: palette, composition, visual tone and references',
    'Scriptwriting and storyboarding before production, so the shooting crew knows exactly what needs to be captured',
    'On-set direction: photography and video, coordinating talent and technical crew',
    'End-to-end production supervision, with a technical eye (from my engineering background) and artistic sensitivity'
  ], 'That every project has a clear visual identity and a story that connects with whoever sees it.', array['Direction','Film','Photography']),
  ('zh', array[
    '为视觉或视听作品定义概念与叙事，无论是从零开始还是基于已有的brief',
    '艺术指导：色彩搭配、构图、视觉基调与参考',
    '拍摄前的剧本创作与分镜脚本，确保拍摄团队清楚知道需要捕捉的具体内容',
    '现场指导：摄影与视频拍摄，协调演员与技术团队',
    '从头到尾监督制作全过程，兼具工程师的技术视角与艺术敏感度'
  ], '让每个项目都拥有清晰的视觉识别，以及能与观众产生共鸣的故事。', array['导演','影视','摄影']),
  ('ko', array[
    '시각 또는 영상 작품을 위한 컨셉과 내러티브 정의 — 처음부터 시작하거나 기존 브리프를 기반으로',
    '아트 디렉션: 색감, 구도, 비주얼 톤 및 레퍼런스',
    '촬영 전 대본 작성 및 스토리보드 제작으로 촬영팀이 무엇을 담아야 할지 정확히 파악',
    '촬영 현장 지휘: 사진 및 영상 촬영, 출연진과 기술팀 조율',
    '엔지니어 출신의 기술적 안목과 예술적 감각을 바탕으로 제작 전 과정 총괄'
  ], '모든 프로젝트가 명확한 비주얼 아이덴티티와 보는 이의 마음을 움직이는 이야기를 갖추는 것입니다.', array['연출','영상','사진']),
  ('ru', array[
    'Разработка концепции и нарратива для визуальных или аудиовизуальных проектов — с нуля или на основе готового брифа',
    'Арт-дирекшн: палитра, композиция, визуальный тон и референсы',
    'Сценарий и раскадровка перед съёмкой, чтобы съёмочная группа точно знала, что нужно снять',
    'Руководство на площадке: фото- и видеосъёмка, координация талантов и технической команды',
    'Полное сопровождение продакшна от начала до конца, с техническим взглядом (благодаря инженерному опыту) и художественным чутьём'
  ], 'Чтобы у каждого проекта была чёткая визуальная идентичность и история, которая находит отклик у зрителя.', array['Режиссура','Кино','Фотография']),
  ('ja', array[
    'ビジュアルまたは映像作品のコンセプトとナラティブの定義。ゼロから、または既存のブリーフをもとに',
    'アートディレクション：カラーパレット、構図、ビジュアルトーン、参考資料',
    '撮影前の脚本執筆と絵コンテ作成。撮影クルーが何を撮るべきか正確に把握できるようにする',
    '現場でのディレクション：写真・映像撮影、出演者と技術クルーの調整',
    'エンジニアとしての技術的視点と芸術的感性を兼ね備え、制作を最初から最後まで統括'
  ], 'すべてのプロジェクトが明確なビジュアルアイデンティティと、見る人の心に響くストーリーを持つこと。', array['ディレクション','映像','写真'])
) as v(language_code, includes, goal, disciplines) on true
where d.service_slug = 'creative-direction'
on conflict (detail_id, language_code) do update set
  includes = excluded.includes, goal = excluded.goal, disciplines = excluded.disciplines;

insert into service_detail_process_steps (detail_id, language_code, position, title, description)
select d.id, v.language_code, v.position, v.title, v.description
from service_details d join (values
  ('es', 1, 'Brief y referencias', 'Definimos juntos la idea, el tono, el público al que le habla la pieza y las referencias visuales que marcan el rumbo.'),
  ('es', 2, 'Concepto creativo', 'Desarrollo la narrativa, el moodboard, la dirección de arte y el storyboard cuando el proyecto lo requiere.'),
  ('es', 3, 'Producción', 'Superviso la ejecución técnica y creativa durante el rodaje o la sesión, resolviendo en el momento sin perder de vista el concepto original.'),
  ('es', 4, 'Revisión y cierre', 'Ajustes finales junto contigo hasta llegar a la pieza terminada y lista para publicarse.'),
  ('en', 1, 'Brief and references', 'We define together the idea, the tone, the audience the piece speaks to, and the visual references that set the direction.'),
  ('en', 2, 'Creative concept', 'I develop the narrative, moodboard, art direction and storyboard when the project calls for it.'),
  ('en', 3, 'Production', 'I supervise technical and creative execution during the shoot or session, solving problems on the spot without losing sight of the original concept.'),
  ('en', 4, 'Review and wrap-up', 'Final adjustments together with you until we reach the finished piece, ready to publish.'),
  ('zh', 1, '简报与参考资料', '我们共同确定创意、基调、作品面向的受众，以及决定方向的视觉参考。'),
  ('zh', 2, '创意构思', '根据项目需要，进行叙事设计、情绪板制作、艺术指导和分镜脚本创作。'),
  ('zh', 3, '制作', '在拍摄或制作过程中监督技术与创意执行，现场解决问题的同时不偏离原始概念。'),
  ('zh', 4, '审核与收尾', '与你一起进行最终调整，直到完成可发布的成片。'),
  ('ko', 1, '브리프 및 레퍼런스', '아이디어, 톤, 작품이 말을 거는 대상, 그리고 방향을 결정하는 비주얼 레퍼런스를 함께 정합니다.'),
  ('ko', 2, '크리에이티브 컨셉', '프로젝트에 따라 내러티브, 무드보드, 아트 디렉션, 스토리보드를 개발합니다.'),
  ('ko', 3, '프로덕션', '촬영이나 세션 중 기술적, 창의적 실행을 감독하며, 원래 컨셉을 잃지 않으면서 현장에서 즉시 문제를 해결합니다.'),
  ('ko', 4, '검토 및 마무리', '완성된 결과물이 나올 때까지 함께 최종 수정 작업을 진행합니다.'),
  ('ru', 1, 'Бриф и референсы', 'Вместе определяем идею, тон, аудиторию, к которой обращается проект, и визуальные референсы, задающие направление.'),
  ('ru', 2, 'Творческая концепция', 'Разрабатываю нарратив, мудборд, арт-дирекшн и раскадровку, когда это требуется проекту.'),
  ('ru', 3, 'Продакшн', 'Контролирую техническое и творческое исполнение во время съёмки или сессии, решая вопросы на месте, не теряя из виду исходную концепцию.'),
  ('ru', 4, 'Ревью и завершение', 'Финальные правки вместе с тобой до получения готового материала, готового к публикации.'),
  ('ja', 1, 'ブリーフと参考資料', 'アイデア、トーン、作品が語りかける対象、そして方向性を決める視覚的参考資料を一緒に定めます。'),
  ('ja', 2, 'クリエイティブコンセプト', 'プロジェクトに応じて、ナラティブ、ムードボード、アートディレクション、絵コンテを制作します。'),
  ('ja', 3, 'プロダクション', '撮影やセッション中、技術面とクリエイティブ面の実行を監督し、当初のコンセプトを見失うことなくその場で問題を解決します。'),
  ('ja', 4, 'レビューと仕上げ', '完成し公開できる状態になるまで、一緒に最終調整を行います。')
) as v(language_code, position, title, description) on true
where d.service_slug = 'creative-direction'
on conflict (detail_id, language_code, position) do update set
  title = excluded.title, description = excluded.description;

insert into service_detail_stack_groups (detail_id, language_code, position, category, items)
select d.id, v.language_code, v.position, v.category, v.items
from service_details d join (values
  ('es', 1, 'Software', array['Adobe Creative Suite','DaVinci Resolve','Figma']),
  ('es', 2, 'Equipo de producción', array['Cámaras','Audio']),
  ('es', 3, 'Colaboración', array['Notion','Google Drive','Slack / Discord']),
  ('en', 1, 'Software', array['Adobe Creative Suite','DaVinci Resolve','Figma']),
  ('en', 2, 'Production equipment', array['Cameras','Audio']),
  ('en', 3, 'Collaboration', array['Notion','Google Drive','Slack / Discord']),
  ('zh', 1, '软件', array['Adobe Creative Suite','DaVinci Resolve','Figma']),
  ('zh', 2, '制作设备', array['摄像设备','音频']),
  ('zh', 3, '协作', array['Notion','Google Drive','Slack / Discord']),
  ('ko', 1, '소프트웨어', array['Adobe Creative Suite','DaVinci Resolve','Figma']),
  ('ko', 2, '제작 장비', array['카메라','오디오']),
  ('ko', 3, '협업', array['Notion','Google Drive','Slack / Discord']),
  ('ru', 1, 'Софт', array['Adobe Creative Suite','DaVinci Resolve','Figma']),
  ('ru', 2, 'Съёмочное оборудование', array['Камеры','Аудио']),
  ('ru', 3, 'Сотрудничество', array['Notion','Google Drive','Slack / Discord']),
  ('ja', 1, 'ソフトウェア', array['Adobe Creative Suite','DaVinci Resolve','Figma']),
  ('ja', 2, '制作機材', array['カメラ','オーディオ']),
  ('ja', 3, 'コラボレーション', array['Notion','Google Drive','Slack / Discord'])
) as v(language_code, position, category, items) on true
where d.service_slug = 'creative-direction'
on conflict (detail_id, language_code, position) do update set
  category = excluded.category, items = excluded.items;

-- =====================================================================
-- audiovisual
-- =====================================================================

insert into service_details (service_slug)
select 'audiovisual'
where not exists (select 1 from service_details where service_slug = 'audiovisual');

insert into service_detail_translations (detail_id, language_code, includes, goal, disciplines)
select d.id, v.language_code, v.includes, v.goal, v.disciplines
from service_details d join (values
  ('es', array[
    'Producción musical y beatmaking, de la idea original al track terminado',
    'Edición de video y postproducción',
    'Diseño de sonido y masterización con estándar de distribución profesional',
    'Entrega en los formatos que necesita cada plataforma: streaming, redes sociales o broadcast'
  ], 'Que el resultado final suene y se vea con estándar profesional, listo para su plataforma de destino.', array['Beatmaker','Film','Postproducción']),
  ('en', array[
    'Music production and beatmaking, from the original idea to the finished track',
    'Video editing and post-production',
    'Sound design and mastering to professional distribution standards',
    'Delivery in the formats each platform needs: streaming, social media or broadcast'
  ], 'That the final result sounds and looks professional, ready for its destination platform.', array['Beatmaker','Film','Post-production']),
  ('zh', array[
    '音乐制作与节拍制作，从最初的想法到成品曲目',
    '视频剪辑与后期制作',
    '音效设计与母带处理，达到专业发行标准',
    '按各平台需求交付：流媒体、社交媒体或广播'
  ], '让最终成果无论听感还是画面都达到专业水准，随时可用于目标平台。', array['节拍制作','影视','后期制作']),
  ('ko', array[
    '음악 제작 및 비트메이킹, 최초 아이디어부터 완성된 트랙까지',
    '비디오 편집 및 후반 작업',
    '전문 배급 기준에 맞춘 사운드 디자인 및 마스터링',
    '각 플랫폼에 필요한 형식으로 납품: 스트리밍, 소셜 미디어 또는 방송'
  ], '최종 결과물이 프로페셔널한 사운드와 비주얼을 갖춰, 목표 플랫폼에 바로 사용할 수 있는 상태가 되는 것입니다.', array['비트메이커','영상','후반작업']),
  ('ru', array[
    'Музыкальное продюсирование и битмейкинг — от исходной идеи до готового трека',
    'Видеомонтаж и постпродакшн',
    'Саунд-дизайн и мастеринг по профессиональным стандартам дистрибуции',
    'Сдача в форматах, необходимых каждой платформе: стриминг, соцсети или вещание'
  ], 'Чтобы финальный результат звучал и выглядел профессионально, готовый к целевой платформе.', array['Битмейкинг','Кино','Постпродакшн']),
  ('ja', array[
    '音楽制作とビートメイキング。最初のアイデアから完成トラックまで',
    'ビデオ編集とポストプロダクション',
    'プロの配信基準に沿ったサウンドデザインとマスタリング',
    '各プラットフォームが必要とする形式での納品：ストリーミング、SNS、放送'
  ], '最終的な成果物がプロの水準で仕上がり、公開先のプラットフォームにそのまま使える状態になること。', array['ビートメイキング','映像','ポストプロダクション'])
) as v(language_code, includes, goal, disciplines) on true
where d.service_slug = 'audiovisual'
on conflict (detail_id, language_code) do update set
  includes = excluded.includes, goal = excluded.goal, disciplines = excluded.disciplines;

insert into service_detail_process_steps (detail_id, language_code, position, title, description)
select d.id, v.language_code, v.position, v.title, v.description
from service_details d join (values
  ('es', 1, 'Referencia y objetivo', 'Definimos el género, la referencia sonora o visual y para qué plataforma o uso final es la pieza.'),
  ('es', 2, 'Producción', 'Grabación, composición o edición según el tipo de proyecto: música, video o ambos.'),
  ('es', 3, 'Postproducción', 'Mezcla, masterización o corrección de color y sonido hasta llegar al estándar final.'),
  ('es', 4, 'Entrega final', 'Exportación en los formatos que necesites, listos para publicar sin ajustes adicionales de tu parte.'),
  ('en', 1, 'Reference and goal', 'We define the genre, the sonic or visual reference, and the platform or final use for the piece.'),
  ('en', 2, 'Production', 'Recording, composition or editing depending on the type of project: music, video, or both.'),
  ('en', 3, 'Post-production', 'Mixing, mastering, or color and sound correction until reaching the final standard.'),
  ('en', 4, 'Final delivery', 'Export in whatever formats you need, ready to publish with no extra work on your end.'),
  ('zh', 1, '参考与目标', '确定作品的风格、声音或视觉参考，以及最终用于哪个平台或用途。'),
  ('zh', 2, '制作', '根据项目类型进行录制、创作或剪辑：音乐、视频或两者兼有。'),
  ('zh', 3, '后期制作', '混音、母带处理，或调色调音，直至达到最终标准。'),
  ('zh', 4, '最终交付', '按你需要的格式导出，无需你再做任何额外调整即可发布。'),
  ('ko', 1, '레퍼런스 및 목표 설정', '장르, 사운드 또는 비주얼 레퍼런스, 그리고 최종적으로 어떤 플랫폼 또는 용도로 쓰일지를 정합니다.'),
  ('ko', 2, '프로덕션', '프로젝트 유형에 따라 녹음, 작곡 또는 편집을 진행합니다: 음악, 영상 또는 둘 다.'),
  ('ko', 3, '포스트 프로덕션', '믹싱, 마스터링 또는 색보정과 음향 보정을 통해 최종 기준에 도달합니다.'),
  ('ko', 4, '최종 납품', '필요한 형식으로 내보내며, 추가 작업 없이 바로 게시할 수 있도록 준비합니다.'),
  ('ru', 1, 'Референс и цель', 'Определяем жанр, звуковой или визуальный референс и платформу или конечное назначение проекта.'),
  ('ru', 2, 'Продакшн', 'Запись, сочинение или монтаж — в зависимости от типа проекта: музыка, видео или и то, и другое.'),
  ('ru', 3, 'Постпродакшн', 'Сведение, мастеринг или цвето- и звукокоррекция до достижения финального стандарта.'),
  ('ru', 4, 'Финальная сдача', 'Экспорт в нужных форматах, готовых к публикации без дополнительной работы с твоей стороны.'),
  ('ja', 1, 'リファレンスと目標', 'ジャンル、サウンドまたはビジュアルのリファレンス、そして最終的にどのプラットフォームや用途で使うかを定めます。'),
  ('ja', 2, 'プロダクション', 'プロジェクトの種類（音楽、映像、または両方）に応じて、録音・作曲・編集を行います。'),
  ('ja', 3, 'ポストプロダクション', 'ミックス、マスタリング、またはカラーとサウンドの補正を行い、最終基準に仕上げます。'),
  ('ja', 4, '最終納品', '必要な形式で書き出し、追加作業なしですぐに公開できる状態にします。')
) as v(language_code, position, title, description) on true
where d.service_slug = 'audiovisual'
on conflict (detail_id, language_code, position) do update set
  title = excluded.title, description = excluded.description;

insert into service_detail_stack_groups (detail_id, language_code, position, category, items)
select d.id, v.language_code, v.position, v.category, v.items
from service_details d join (values
  ('es', 1, 'Producción musical (DAW)', array['FL Studio','Logic Pro']),
  ('es', 2, 'Edición de video', array['DaVinci Resolve','Adobe Premiere']),
  ('es', 3, 'Equipo de audio', array['Interfaz de audio','Monitores de estudio','Micrófonos de estudio']),
  ('en', 1, 'Music production (DAW)', array['FL Studio','Logic Pro']),
  ('en', 2, 'Video editing', array['DaVinci Resolve','Adobe Premiere']),
  ('en', 3, 'Audio equipment', array['Audio interface','Studio monitors','Studio microphones']),
  ('zh', 1, '音乐制作（DAW）', array['FL Studio','Logic Pro']),
  ('zh', 2, '视频剪辑', array['DaVinci Resolve','Adobe Premiere']),
  ('zh', 3, '音频设备', array['音频接口','监听音箱','录音室麦克风']),
  ('ko', 1, '음악 제작(DAW)', array['FL Studio','Logic Pro']),
  ('ko', 2, '비디오 편집', array['DaVinci Resolve','Adobe Premiere']),
  ('ko', 3, '오디오 장비', array['오디오 인터페이스','스튜디오 모니터','스튜디오 마이크']),
  ('ru', 1, 'Музыкальное продюсирование (DAW)', array['FL Studio','Logic Pro']),
  ('ru', 2, 'Видеомонтаж', array['DaVinci Resolve','Adobe Premiere']),
  ('ru', 3, 'Аудиооборудование', array['Аудиоинтерфейс','Студийные мониторы','Студийные микрофоны']),
  ('ja', 1, '音楽制作（DAW）', array['FL Studio','Logic Pro']),
  ('ja', 2, 'ビデオ編集', array['DaVinci Resolve','Adobe Premiere']),
  ('ja', 3, 'オーディオ機材', array['オーディオインターフェース','スタジオモニター','スタジオマイク'])
) as v(language_code, position, category, items) on true
where d.service_slug = 'audiovisual'
on conflict (detail_id, language_code, position) do update set
  category = excluded.category, items = excluded.items;

-- =====================================================================
-- mentorship
-- =====================================================================

insert into service_details (service_slug)
select 'mentorship'
where not exists (select 1 from service_details where service_slug = 'mentorship');

insert into service_detail_translations (detail_id, language_code, includes, goal, disciplines)
select d.id, v.language_code, v.includes, v.goal, '{}'::text[]
from service_details d join (values
  ('es', array[
    'Asesoría de carrera para perfiles técnicos, desde primer empleo hasta transición a roles senior',
    'Revisión de arquitectura de software sobre proyectos reales del equipo o de la persona asesorada',
    'Estrategia de adopción de IA en equipos: dónde tiene sentido meter agentes/LLMs y dónde no',
    'Sesiones 1:1 o para equipos completos, según lo que se necesite'
  ], 'Que tomes decisiones técnicas y de carrera con más claridad y confianza.'),
  ('en', array[
    'Career advice for technical profiles, from first job to transitioning into senior roles',
    'Software architecture review on real projects from the team or person being mentored',
    'AI adoption strategy for teams: where agents/LLMs actually make sense, and where they do not',
    '1:1 sessions or full-team sessions, depending on what is needed'
  ], 'That you make technical and career decisions with more clarity and confidence.'),
  ('zh', array[
    '面向技术岗位的职业咨询，涵盖从第一份工作到晋升高级职位的整个过程',
    '针对团队或受指导者真实项目的软件架构评审',
    '团队AI落地策略：哪些场景真正适合引入智能体/LLM，哪些不适合',
    '根据需要提供一对一或整个团队的辅导'
  ], '让你在技术和职业决策上更加清晰和自信。'),
  ('ko', array[
    '첫 직장부터 시니어 전환까지, 기술직을 위한 커리어 상담',
    '팀 또는 멘티의 실제 프로젝트를 대상으로 한 소프트웨어 아키텍처 리뷰',
    '팀을 위한 AI 도입 전략: 에이전트/LLM이 실제로 의미 있는 곳과 그렇지 않은 곳을 구분',
    '필요에 따라 1:1 세션 또는 팀 전체 세션 진행'
  ], '기술적, 커리어적 의사결정을 더 명확하고 자신 있게 내릴 수 있게 되는 것입니다.'),
  ('ru', array[
    'Карьерное консультирование для технических специалистов — от первой работы до перехода на senior-роли',
    'Ревью архитектуры ПО на реальных проектах команды или человека, которого я консультирую',
    'Стратегия внедрения ИИ в командах: где агенты/LLM реально имеют смысл, а где нет',
    'Сессии 1:1 или для всей команды — в зависимости от потребности'
  ], 'Чтобы ты принимал технические и карьерные решения увереннее и с большей ясностью.'),
  ('ja', array[
    '初めての就職からシニアポジションへの移行まで、技術職向けのキャリア相談',
    'チームまたは相談者の実際のプロジェクトに対するソフトウェアアーキテクチャレビュー',
    'チームにおけるAI導入戦略：エージェント/LLMが本当に意味を持つ場面とそうでない場面の見極め',
    '必要に応じた1対1セッションまたはチーム全体でのセッション'
  ], '技術面・キャリア面の意思決定を、より明確に、より自信を持って行えるようになること。')
) as v(language_code, includes, goal) on true
where d.service_slug = 'mentorship'
on conflict (detail_id, language_code) do update set
  includes = excluded.includes, goal = excluded.goal, disciplines = excluded.disciplines;

insert into service_detail_process_steps (detail_id, language_code, position, title, description)
select d.id, v.language_code, v.position, v.title, v.description
from service_details d join (values
  ('es', 1, 'Diagnóstico', 'Platicamos sobre dónde estás, a dónde quieres llegar y qué te está frenando en el camino.'),
  ('es', 2, 'Plan de acción', 'Definimos objetivos concretos y medibles, y un plan de sesiones o revisiones para llegar a ellos.'),
  ('es', 3, 'Acompañamiento', 'Sesiones periódicas de seguimiento, revisión de avances y retroalimentación directa —sin rodeos.'),
  ('es', 4, 'Autonomía', 'El objetivo siempre es que puedas seguir avanzando por tu cuenta, no depender de mí indefinidamente.'),
  ('en', 1, 'Diagnosis', 'We talk through where you are, where you want to go, and what is holding you back along the way.'),
  ('en', 2, 'Action plan', 'We define concrete, measurable goals and a plan of sessions or reviews to reach them.'),
  ('en', 3, 'Ongoing support', 'Regular follow-up sessions, progress review and direct feedback — no sugarcoating.'),
  ('en', 4, 'Autonomy', 'The goal is always for you to keep moving forward on your own, not to depend on me indefinitely.'),
  ('zh', 1, '诊断', '我们会聊聊你目前所处的位置、想要达到的目标，以及一路上阻碍你的因素。'),
  ('zh', 2, '行动计划', '确定具体、可衡量的目标，并制定相应的辅导或复盘计划来实现它们。'),
  ('zh', 3, '持续陪伴', '定期的跟进会议、进度复盘与直接反馈——不绕弯子。'),
  ('zh', 4, '自主性', '最终目标始终是让你能够独立继续前进，而不是长期依赖我。'),
  ('ko', 1, '진단', '지금 어디에 있는지, 어디로 가고 싶은지, 그 과정에서 무엇이 발목을 잡고 있는지 함께 이야기합니다.'),
  ('ko', 2, '실행 계획', '구체적이고 측정 가능한 목표와, 이를 달성하기 위한 세션 또는 리뷰 계획을 세웁니다.'),
  ('ko', 3, '지속적 동행', '정기적인 팔로업 세션, 진행 상황 리뷰, 그리고 돌려 말하지 않는 직접적인 피드백을 제공합니다.'),
  ('ko', 4, '자립', '목표는 항상 당신이 저에게 무기한 의존하지 않고 스스로 계속 나아갈 수 있게 하는 것입니다.'),
  ('ru', 1, 'Диагностика', 'Обсуждаем, где ты сейчас находишься, куда хочешь прийти и что мешает тебе на этом пути.'),
  ('ru', 2, 'План действий', 'Определяем конкретные измеримые цели и план сессий или ревью для их достижения.'),
  ('ru', 3, 'Сопровождение', 'Регулярные сессии сопровождения, обзор прогресса и прямая обратная связь — без прикрас.'),
  ('ru', 4, 'Автономность', 'Цель всегда в том, чтобы ты мог двигаться дальше самостоятельно, а не зависеть от меня бесконечно.'),
  ('ja', 1, '診断', '現在地、目指す場所、その道のりで何があなたを妨げているのかについて話し合います。'),
  ('ja', 2, '行動計画', '具体的で測定可能な目標と、それを達成するためのセッションやレビューの計画を立てます。'),
  ('ja', 3, '継続的なサポート', '定期的なフォローアップセッション、進捗レビュー、そして率直なフィードバックを提供します。'),
  ('ja', 4, '自立', '目標は常に、私に無期限に依存するのではなく、あなた自身で前進し続けられるようになることです。')
) as v(language_code, position, title, description) on true
where d.service_slug = 'mentorship'
on conflict (detail_id, language_code, position) do update set
  title = excluded.title, description = excluded.description;

insert into service_detail_stack_groups (detail_id, language_code, position, category, items)
select d.id, v.language_code, v.position, v.category, v.items
from service_details d join (values
  ('es', 1, 'Modalidad', array['Sesiones 1:1','Sesiones grupales / equipos','Asíncrono (mensajes, revisión de código)']),
  ('es', 2, 'Plataformas', array['Zoom','Google Meet','Discord']),
  ('en', 1, 'Format', array['1:1 sessions','Group / team sessions','Async (messages, code review)']),
  ('en', 2, 'Platforms', array['Zoom','Google Meet','Discord']),
  ('zh', 1, '形式', array['一对一会议','小组/团队会议','异步（消息、代码评审）']),
  ('zh', 2, '平台', array['Zoom','Google Meet','Discord']),
  ('ko', 1, '형태', array['1:1 세션','그룹/팀 세션','비동기(메시지, 코드 리뷰)']),
  ('ko', 2, '플랫폼', array['Zoom','Google Meet','Discord']),
  ('ru', 1, 'Формат', array['Сессии 1:1','Групповые/командные сессии','Асинхронно (сообщения, ревью кода)']),
  ('ru', 2, 'Платформы', array['Zoom','Google Meet','Discord']),
  ('ja', 1, '形式', array['1対1セッション','グループ/チームセッション','非同期（メッセージ、コードレビュー）']),
  ('ja', 2, 'プラットフォーム', array['Zoom','Google Meet','Discord'])
) as v(language_code, position, category, items) on true
where d.service_slug = 'mentorship'
on conflict (detail_id, language_code, position) do update set
  category = excluded.category, items = excluded.items;
