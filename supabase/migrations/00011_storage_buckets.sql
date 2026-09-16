-- Migration to create the medias storage bucket

insert into storage.buckets (id, name, public) 
values ('medias', 'medias', true) 
on conflict (id) do nothing;

create policy "Medias are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'medias' );
