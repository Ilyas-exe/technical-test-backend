import 'dotenv/config';
function required(name: string, def?: string) {
  const v = process.env[name] ?? def;
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}
export const env = {
  PORT: Number(process.env.PORT ?? 3001),
  JWT_SECRET: required('JWT_SECRET', 'change_me_super_secret'),
  DATABASE_URL: required('DATABASE_URL'),
  REDIS_URL: process.env.REDIS_URL ?? 'redis://redis:6379'
};
