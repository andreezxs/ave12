# Painel Administrativo (CMS)

Este README descreve como configurar e usar o painel administrativo integrado ao Supabase.

1. Instalação de dependências

```bash
npm install
```

2. Dependências extras instaladas

- TipTap (`@tiptap/react`, `@tiptap/starter-kit`, etc.) para editor WYSIWYG
- `browser-image-compression` para compressão de imagens no upload

3. Configurar variáveis de ambiente

Crie um arquivo `.env` com:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Apenas para executar o script de criação (fora do frontend):
SUPABASE_SERVICE_ROLE=your_service_role_key
SUPABASE_URL=your_supabase_url
```

4. Criar tabelas e buckets

Recomendo executar o script manualmente no painel do Supabase (SQL Editor) usando `scripts/admin_setup.sql`.

Também há um helper Node.js `scripts/setup_supabase.js` que pode criar buckets. Execute localmente com:

```bash
# export SUPABASE_URL and SUPABASE_SERVICE_ROLE
node ./scripts/setup_supabase.js
```

5. Rodar a aplicação

```bash
npm run dev
```

6. Acesso ao painel

Visite `/admin/login` para fazer login. O campo "Usuário" aceita username ou e-mail (se `profiles.username` existir, o sistema faz lookup para e-mail).

7. Criar usuários

Crie usuários via Supabase Auth no painel. Para associar `username` e `role`, insira registros na tabela `profiles` com `email`, `username` e `role`.

8. Backup

Use o exportador do Supabase ou consulte a documentação para backups regulares.

9. Observações de segurança

- Não exponha a `SERVICE_ROLE` no frontend. Use-a apenas em scripts de administração segura.
- Configure Row Level Security (RLS) conforme suas políticas. O painel usa `VITE_SUPABASE_ANON_KEY` no frontend.

10. Aplicar políticas RLS (recomendado)

Há um arquivo `scripts/rls_policies.sql` com um conjunto de políticas RLS recomendadas. Ele:

- adiciona `user_id` em `profiles` e tenta associá-lo aos usuários do Auth (por e-mail);
- cria funções auxiliares `public.is_admin()` e `public.is_editor()`;
- ativa RLS e cria policies para `profiles`, `noticias`, `galeria`, `fotos`, `eventos`, `agenda` e `configuracoes`.

Aplicar no Supabase SQL Editor (ou via psql):

```bash
# Cole o conteúdo de scripts/rls_policies.sql no editor SQL do Supabase e execute.
```

Após aplicar, confirme que os buckets têm as permissões de leitura pública para os recursos que o site precisa (ex.: `noticias`, `galeria`, `logos`).

11. Configurar usuário administrador inicial

Após aplicar as migrations e RLS, crie um registro em `profiles` com `role = 'admin'` e associe `user_id` ao `id` do Auth user (pode ser feito no SQL editor):

```sql
-- Exemplo: substituir pelos valores reais
insert into public.profiles (id, user_id, username, email, full_name, role) values (gen_random_uuid(), 'auth-user-uuid', 'admin', 'admin@example.com', 'Administrador', 'admin');
```

12. Ajustes e revisão

As políticas entregues são um ponto de partida. Revise-as cuidadosamente no painel do Supabase e ajuste conforme as necessidades de acesso da sua organização.
