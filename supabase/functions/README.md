Use this to run edge functions locally.

If the containers are already running use `supabase status` to check credentials.

```bash
supabase start --ignore-health-check -x realtime,storage-api,imgproxy,inbucket,postgrest,pgadmin-schema-diff,migra,postgres-meta,studio,logflare,vector  
```

To invoke a function:
```bash
curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
  --header 'Content-Type: application/json' \
  --data '{"name":"Rob"}'
```

Append the name of the function you wish to run '/v1/'

example

```bash
curl -i --location --request POST 'http://localhost:54321/functions/v1/hello-world' \                                                                                  ─╯
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
  --header 'Content-Type: application/json' \
  --data '{"name":"Rob"}'
```