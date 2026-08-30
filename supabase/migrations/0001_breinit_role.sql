-- =====================================================================
-- Cierra el puesto en Neuropoint.ai (mayo 2025 — junio 2026) y agrega
-- el puesto actual en Breinit (Ing. en Desarrollo de IA, desde junio
-- 2026, Monterrey, N.L.). Idempotente: seguro de correr varias veces.
-- =====================================================================

-- ---------------- Cierra Neuropoint.ai ----------------
update experience_entries
set end_date = '2026-06-30'
where slug = 'fullstack-ai-engineer-2025';

update experience_entry_translations set period_label = seed_value.period_label
from (values
  ('es', 'MAY 2025 — JUN 2026'),
  ('en', 'MAY 2025 — JUN 2026'),
  ('zh', '2025年5月 — 2026年6月'),
  ('ko', '2025년 5월 — 2026년 6월'),
  ('ru', 'МАЙ 2025 — ИЮН 2026'),
  ('ja', '2025年5月 — 2026年6月')
) as seed_value(language_code, period_label)
where experience_entry_translations.language_code = seed_value.language_code
  and experience_entry_translations.entry_id = (
    select id from experience_entries where slug = 'fullstack-ai-engineer-2025'
  );

-- ---------------- Recorre posiciones para dejar espacio al frente ----------------
-- (solo la primera vez: si Breinit ya existe, no se vuelve a correr)
update experience_entries set position = position + 1
where slug in (
  'fullstack-ai-engineer-2025',
  'mobile-developer-2025',
  'fullstack-software-engineer-2023',
  'software-engineer-2024'
)
and not exists (
  select 1 from experience_entries where slug = 'ai-development-engineer-breinit-2026'
);

-- ---------------- Agrega Breinit ----------------
insert into experience_entries (slug, position, start_date, end_date, company, location)
select 'ai-development-engineer-breinit-2026', 1, '2026-06-01', null, 'Breinit', 'Monterrey, N.L.'
where not exists (
  select 1 from experience_entries where slug = 'ai-development-engineer-breinit-2026'
);

insert into experience_entry_translations (entry_id, language_code, period_label, role, highlights, tags)
select entry.id, seed_value.language_code, seed_value.period_label, seed_value.role, seed_value.highlights, seed_value.tags
from experience_entries entry join (values
  (
    'es', 'JUN 2026 — PRESENTE', 'Ingeniero en Desarrollo de IA',
    array['Implementación de IA — Implementación de soluciones de inteligencia artificial en los proyectos asignados.'],
    array['IA']
  ),
  (
    'en', 'JUN 2026 — PRESENT', 'AI Development Engineer',
    array['AI Implementation — Implementation of artificial intelligence solutions across assigned projects.'],
    array['AI']
  ),
  (
    'zh', '2026年6月 — 至今', 'AI开发工程师',
    array['AI实施 — 在分配的项目中实施人工智能解决方案。'],
    array['AI']
  ),
  (
    'ko', '2026년 6월 — 현재', 'AI 개발 엔지니어',
    array['AI 구현 — 배정된 프로젝트에 인공지능 솔루션을 구현합니다.'],
    array['AI']
  ),
  (
    'ru', 'ИЮН 2026 — Н.В.', 'Инженер по разработке ИИ',
    array['Внедрение ИИ — Внедрение решений на основе искусственного интеллекта в порученных проектах.'],
    array['ИИ']
  ),
  (
    'ja', '2026年6月 — 現在', 'AI開発エンジニア',
    array['AI実装 — 担当プロジェクトにおける人工知能ソリューションの実装。'],
    array['AI']
  )
) as seed_value(language_code, period_label, role, highlights, tags) on true
where entry.slug = 'ai-development-engineer-breinit-2026'
on conflict (entry_id, language_code) do update set
  period_label = excluded.period_label, role = excluded.role,
  highlights = excluded.highlights, tags = excluded.tags;
