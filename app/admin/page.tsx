'use client';

/**
 * /admin — Panel de administración.
 *
 * Pestañas:
 *   · Hero & Settings → cambia imagen del hero, tagline, CV
 *   · Projects        → CRUD de proyectos (carpetas dinámicas)
 *   · Certifications  → CRUD de certificaciones
 *   · Experience      → CRUD de experiencia / liderazgo
 *   · Messages        → mensajes recibidos del formulario
 *
 * Toda la lógica habla con Supabase desde el browser usando RLS.
 * Si no está configurado Supabase, el panel muestra instrucciones.
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Image as ImageIcon, FolderKanban, BadgeCheck, Briefcase, Mail,
  LogOut, UploadCloud, Plus, Trash2, Save, Loader2,
} from 'lucide-react';
import {
  getBrowserClient, STORAGE_BUCKETS, isSupabaseConfigured,
} from '@/lib/supabase';
import type {
  Project, Certification, ExperienceItem, SiteSettings, ProjectCategory,
} from '@/lib/types';
import { AmbientBackground } from '@/components/effects/AmbientBackground';
import { cn } from '@/lib/utils';

type Tab = 'hero' | 'projects' | 'certs' | 'experience' | 'messages';

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('hero');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Guard de auth
  useEffect(() => {
    (async () => {
      if (!isSupabaseConfigured) { setLoading(false); return; }
      const supa = getBrowserClient();
      if (!supa) { setLoading(false); return; }
      const { data } = await supa.auth.getUser();
      if (!data.user) {
        router.replace('/admin/login');
        return;
      }
      setUserEmail(data.user.email ?? null);
      setLoading(false);
    })();
  }, [router]);

  async function signOut() {
    const supa = getBrowserClient();
    await supa?.auth.signOut();
    router.replace('/admin/login');
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-mist/60" />
      </main>
    );
  }

  if (!isSupabaseConfigured) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="card-premium max-w-lg">
          <div className="eyebrow mb-4">Setup pending</div>
          <h1 className="text-2xl text-mist mb-4">Configurar Supabase</h1>
          <p className="text-sm text-mist/65 mb-4">
            Define <code className="font-mono text-mist">NEXT_PUBLIC_SUPABASE_URL</code> y{' '}
            <code className="font-mono text-mist">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> en{' '}
            <code className="font-mono text-mist">.env.local</code>, ejecuta el SQL de{' '}
            <code className="font-mono text-mist">supabase/schema.sql</code> y crea un usuario en Auth.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      <AmbientBackground />

      {/* Topbar */}
      <header className="sticky top-0 z-30 glass-strong border-b border-mist/[0.06]">
        <div className="container-editorial flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.3em] text-metal">JR / ADMIN</span>
            {userEmail && (
              <span className="text-[10px] text-silver/70 font-mono">· {userEmail}</span>
            )}
          </div>
          <button onClick={signOut} className="btn-ghost">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </header>

      <div className="container-editorial py-10 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-56 flex-shrink-0">
          <nav className="flex lg:flex-col gap-1 lg:gap-0.5">
            <TabBtn id="hero"       icon={ImageIcon}     active={tab} onClick={setTab} label="Hero & CV" />
            <TabBtn id="projects"   icon={FolderKanban}  active={tab} onClick={setTab} label="Projects"  />
            <TabBtn id="certs"      icon={BadgeCheck}    active={tab} onClick={setTab} label="Certifications" />
            <TabBtn id="experience" icon={Briefcase}     active={tab} onClick={setTab} label="Experience" />
            <TabBtn id="messages"   icon={Mail}          active={tab} onClick={setTab} label="Messages" />
          </nav>
        </aside>

        {/* Content */}
        <section className="flex-1 min-w-0">
          {tab === 'hero'       && <HeroSettingsPanel />}
          {tab === 'projects'   && <ProjectsPanel />}
          {tab === 'certs'      && <CertsPanel />}
          {tab === 'experience' && <ExperiencePanel />}
          {tab === 'messages'   && <MessagesPanel />}
        </section>
      </div>
    </main>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Helpers UI
// ────────────────────────────────────────────────────────────────────────────
function TabBtn({
  id, icon: Icon, active, onClick, label,
}: {
  id: Tab; icon: typeof ImageIcon; active: Tab; onClick: (t: Tab) => void; label: string;
}) {
  const isActive = active === id;
  return (
    <button
      onClick={() => onClick(id)}
      className={cn(
        'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all',
        isActive ? 'bg-mist/[0.06] text-mist border border-mist/10' : 'text-mist/55 hover:text-mist',
      )}
    >
      <Icon className="w-4 h-4" strokeWidth={1.5} />
      {label}
    </button>
  );
}

function PanelHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="font-display text-3xl text-mist">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-mist/60">{subtitle}</p>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Panel: Hero & Settings
// ════════════════════════════════════════════════════════════════════════════
function HeroSettingsPanel() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => { load(); }, []);
  async function load() {
    const supa = getBrowserClient();
    if (!supa) return;
    const { data } = await supa.from('site_settings').select('*').limit(1).maybeSingle();
    setSettings(data as SiteSettings | null);
  }

  async function uploadFile(bucket: keyof typeof STORAGE_BUCKETS, file: File, prefix: string) {
    const supa = getBrowserClient();
    if (!supa) return null;
    const path = `${prefix}-${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const { error } = await supa.storage.from(STORAGE_BUCKETS[bucket]).upload(path, file, {
      upsert: true,
    });
    if (error) { setMsg('✕ ' + error.message); return null; }
    const { data: pub } = supa.storage.from(STORAGE_BUCKETS[bucket]).getPublicUrl(path);
    return pub.publicUrl;
  }

  async function onHeroUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    const url = await uploadFile('hero', f, 'hero');
    if (url) await save({ hero_image_url: url });
    setBusy(false);
  }

  async function onCvUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    const url = await uploadFile('cv', f, 'cv');
    if (url) await save({ cv_pdf_url: url });
    setBusy(false);
  }

  async function save(patch: Partial<SiteSettings>) {
    const supa = getBrowserClient();
    if (!supa) return;
    if (!settings) {
      const { data } = await supa.from('site_settings').insert(patch).select().single();
      setSettings(data as SiteSettings);
    } else {
      const { data } = await supa
        .from('site_settings')
        .update(patch)
        .eq('id', settings.id)
        .select()
        .single();
      setSettings(data as SiteSettings);
    }
    setMsg('✓ Guardado');
    setTimeout(() => setMsg(null), 2000);
  }

  return (
    <div>
      <PanelHeader title="Hero & CV" subtitle="Imagen del hero, tagline y CV PDF — todo dinámico." />

      <div className="grid md:grid-cols-2 gap-5">
        {/* Hero image */}
        <div className="card-premium">
          <div className="text-xs tracking-[0.28em] uppercase text-silver/80 mb-3">Hero image</div>
          {settings?.hero_image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={settings.hero_image_url}
              alt="hero preview"
              className="w-32 h-32 rounded-full object-cover border border-mist/10 mb-4"
            />
          )}
          <label className="btn-premium cursor-pointer">
            <UploadCloud className="w-4 h-4" /> Subir nueva imagen
            <input type="file" accept="image/*" hidden onChange={onHeroUpload} />
          </label>
        </div>

        {/* CV */}
        <div className="card-premium">
          <div className="text-xs tracking-[0.28em] uppercase text-silver/80 mb-3">CV (PDF)</div>
          {settings?.cv_pdf_url ? (
            <a
              href={settings.cv_pdf_url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-mist underline-offset-4 underline mb-4 inline-block"
            >
              Ver actual ↗
            </a>
          ) : (
            <div className="text-sm text-silver/60 mb-4">No hay CV subido.</div>
          )}
          <label className="btn-premium cursor-pointer">
            <UploadCloud className="w-4 h-4" /> Subir CV PDF
            <input type="file" accept="application/pdf" hidden onChange={onCvUpload} />
          </label>
        </div>

        {/* Tagline */}
        <div className="card-premium md:col-span-2">
          <div className="text-xs tracking-[0.28em] uppercase text-silver/80 mb-3">Tagline</div>
          <textarea
            defaultValue={settings?.hero_tagline ?? ''}
            onBlur={e => save({ hero_tagline: e.target.value })}
            className="w-full bg-mist/[0.02] border border-mist/[0.08] rounded-xl p-4 text-sm text-mist outline-none focus:border-mist/30"
            rows={3}
          />
        </div>
      </div>

      {busy && <div className="mt-4 text-xs text-silver/70 font-mono">Subiendo…</div>}
      {msg && <div className="mt-4 text-xs text-emerald-300/80 font-mono">{msg}</div>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Panel: Projects (CRUD completo)
// ════════════════════════════════════════════════════════════════════════════
const EMPTY_PROJECT: Omit<Project, 'id'> = {
  title: '',
  slug: '',
  description: '',
  preview_image: '',
  technologies: [],
  github_url: null,
  live_url: null,
  category: 'web',
  featured: false,
  year: new Date().getFullYear(),
  order_index: 0,
};

function ProjectsPanel() {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);

  async function load() {
    const supa = getBrowserClient();
    if (!supa) return;
    const { data } = await supa.from('projects').select('*').order('order_index');
    setItems((data ?? []) as Project[]);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    const supa = getBrowserClient();
    if (!supa) return;
    const payload = {
      ...editing,
      technologies: typeof editing.technologies === 'string'
        ? (editing.technologies as string).split(',').map(s => s.trim()).filter(Boolean)
        : editing.technologies ?? [],
    };
    if (editing.id) {
      await supa.from('projects').update(payload).eq('id', editing.id);
    } else {
      await supa.from('projects').insert(payload);
    }
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm('¿Eliminar proyecto?')) return;
    const supa = getBrowserClient();
    await supa?.from('projects').delete().eq('id', id);
    load();
  }

  async function uploadPreview(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f || !editing) return;
    const supa = getBrowserClient();
    if (!supa) return;
    const path = `project-${Date.now()}-${f.name.replace(/\s+/g, '_')}`;
    const { error } = await supa.storage.from(STORAGE_BUCKETS.projects).upload(path, f, { upsert: true });
    if (error) return alert(error.message);
    const { data } = supa.storage.from(STORAGE_BUCKETS.projects).getPublicUrl(path);
    setEditing({ ...editing, preview_image: data.publicUrl });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <PanelHeader title="Projects" subtitle="CRUD de proyectos por carpeta." />
        <button onClick={() => setEditing({ ...EMPTY_PROJECT })} className="btn-premium">
          <Plus className="w-4 h-4" /> New project
        </button>
      </div>

      <div className="grid gap-3">
        {items.map(p => (
          <div key={p.id} className="card-premium !py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              {p.preview_image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.preview_image} alt="" className="w-14 h-14 rounded-lg object-cover" />
              )}
              <div className="min-w-0">
                <div className="text-mist text-sm truncate">{p.title}</div>
                <div className="text-[10px] text-silver/70 font-mono uppercase tracking-wider">
                  {p.category} · {p.year}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setEditing(p)} className="btn-ghost text-xs">Edit</button>
              <button onClick={() => remove(p.id)} className="btn-ghost text-xs text-red-300">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de edición */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-ink/80 backdrop-blur-md" onClick={() => setEditing(null)}>
          <div onClick={e => e.stopPropagation()} className="glass-strong rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 space-y-4">
            <h3 className="font-display text-2xl text-mist mb-4">
              {editing.id ? 'Edit project' : 'New project'}
            </h3>

            <AdminField label="Title">
              <input value={editing.title ?? ''} onChange={e => setEditing({ ...editing, title: e.target.value })} className="input-admin" />
            </AdminField>
            <AdminField label="Slug">
              <input value={editing.slug ?? ''} onChange={e => setEditing({ ...editing, slug: e.target.value })} className="input-admin" />
            </AdminField>
            <AdminField label="Description">
              <textarea value={editing.description ?? ''} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={3} className="input-admin" />
            </AdminField>
            <AdminField label="Technologies (comma-separated)">
              <input
                value={Array.isArray(editing.technologies) ? editing.technologies.join(', ') : (editing.technologies ?? '')}
                onChange={e => setEditing({ ...editing, technologies: e.target.value as any })}
                className="input-admin"
              />
            </AdminField>
            <div className="grid grid-cols-2 gap-3">
              <AdminField label="Category">
                <select
                  value={editing.category ?? 'web'}
                  onChange={e => setEditing({ ...editing, category: e.target.value as ProjectCategory })}
                  className="input-admin"
                >
                  <option value="web">web</option>
                  <option value="ai-automation">ai-automation</option>
                  <option value="systems">systems</option>
                  <option value="ui-ux">ui-ux</option>
                </select>
              </AdminField>
              <AdminField label="Year">
                <input type="number" value={editing.year ?? new Date().getFullYear()} onChange={e => setEditing({ ...editing, year: Number(e.target.value) })} className="input-admin" />
              </AdminField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <AdminField label="GitHub URL">
                <input value={editing.github_url ?? ''} onChange={e => setEditing({ ...editing, github_url: e.target.value })} className="input-admin" />
              </AdminField>
              <AdminField label="Live URL">
                <input value={editing.live_url ?? ''} onChange={e => setEditing({ ...editing, live_url: e.target.value })} className="input-admin" />
              </AdminField>
            </div>
            <AdminField label="Preview image">
              <div className="flex items-center gap-3">
                {editing.preview_image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={editing.preview_image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                )}
                <label className="btn-ghost cursor-pointer">
                  <UploadCloud className="w-4 h-4" /> Upload
                  <input type="file" accept="image/*" hidden onChange={uploadPreview} />
                </label>
              </div>
            </AdminField>
            <label className="flex items-center gap-2 text-sm text-mist/80">
              <input
                type="checkbox"
                checked={!!editing.featured}
                onChange={e => setEditing({ ...editing, featured: e.target.checked })}
              />
              Featured
            </label>

            <div className="flex justify-end gap-2 pt-4">
              <button onClick={() => setEditing(null)} className="btn-ghost">Cancel</button>
              <button onClick={save} className="btn-premium"><Save className="w-4 h-4" /> Save</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function AdminField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] tracking-[0.28em] uppercase text-silver/80 mb-1.5 block">
        {label}
      </span>
      {children}
    </label>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Panel: Certifications (CRUD simple)
// ════════════════════════════════════════════════════════════════════════════
function CertsPanel() {
  const [items, setItems] = useState<Certification[]>([]);
  async function load() {
    const supa = getBrowserClient();
    const { data } = await supa!.from('certifications').select('*').order('year', { ascending: false });
    setItems((data ?? []) as Certification[]);
  }
  useEffect(() => { load(); }, []);

  async function add() {
    const name = prompt('Nombre de la certificación');
    if (!name) return;
    const organization = prompt('Organización') || '';
    const year = Number(prompt('Año') || new Date().getFullYear());
    const supa = getBrowserClient();
    await supa!.from('certifications').insert({ name, organization, year });
    load();
  }
  async function remove(id: string) {
    if (!confirm('¿Eliminar?')) return;
    const supa = getBrowserClient();
    await supa!.from('certifications').delete().eq('id', id);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <PanelHeader title="Certifications" />
        <button onClick={add} className="btn-premium"><Plus className="w-4 h-4" /> Add</button>
      </div>
      <div className="grid gap-2">
        {items.map(c => (
          <div key={c.id} className="card-premium !py-3 flex items-center justify-between">
            <div>
              <div className="text-mist text-sm">{c.name}</div>
              <div className="text-[10px] text-silver/70 font-mono">{c.organization} · {c.year}</div>
            </div>
            <button onClick={() => remove(c.id)} className="btn-ghost text-red-300">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Panel: Experience
// ════════════════════════════════════════════════════════════════════════════
function ExperiencePanel() {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  async function load() {
    const supa = getBrowserClient();
    const { data } = await supa!.from('experience').select('*').order('order_index');
    setItems((data ?? []) as ExperienceItem[]);
  }
  useEffect(() => { load(); }, []);
  async function remove(id: string) {
    if (!confirm('¿Eliminar?')) return;
    await getBrowserClient()!.from('experience').delete().eq('id', id);
    load();
  }
  async function add() {
    const role = prompt('Role')          || ''; if (!role) return;
    const organization = prompt('Organization') || '';
    const period = prompt('Period (ej. 2025 — present)') || '';
    await getBrowserClient()!.from('experience').insert({
      role, organization, period, description: '', highlights: [], type: 'tech',
    });
    load();
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <PanelHeader title="Experience" />
        <button onClick={add} className="btn-premium"><Plus className="w-4 h-4" /> Add</button>
      </div>
      <div className="grid gap-2">
        {items.map(e => (
          <div key={e.id} className="card-premium !py-3 flex items-center justify-between">
            <div>
              <div className="text-mist text-sm">{e.role}</div>
              <div className="text-[10px] text-silver/70 font-mono">{e.organization} · {e.period}</div>
            </div>
            <button onClick={() => remove(e.id)} className="btn-ghost text-red-300">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Panel: Messages
// ════════════════════════════════════════════════════════════════════════════
interface ContactMsg { id: string; name: string; email: string; subject: string | null; message: string; created_at: string; }

function MessagesPanel() {
  const [items, setItems] = useState<ContactMsg[]>([]);
  useEffect(() => {
    (async () => {
      const supa = getBrowserClient();
      const { data } = await supa!
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      setItems((data ?? []) as ContactMsg[]);
    })();
  }, []);
  return (
    <div>
      <PanelHeader title="Messages" subtitle="Mensajes recibidos desde el formulario de contacto." />
      <div className="grid gap-3">
        {items.length === 0 && (
          <div className="text-sm text-silver/60 font-mono">// no messages yet</div>
        )}
        {items.map(m => (
          <div key={m.id} className="card-premium">
            <div className="flex items-center justify-between mb-2">
              <div className="text-mist text-sm">{m.name} · <span className="text-silver/70">{m.email}</span></div>
              <div className="text-[10px] text-silver/60 font-mono">{new Date(m.created_at).toLocaleString()}</div>
            </div>
            {m.subject && <div className="text-xs text-mist/70 mb-1">{m.subject}</div>}
            <p className="text-sm text-mist/70 whitespace-pre-wrap">{m.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
